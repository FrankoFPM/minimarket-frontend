import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '~/firebase/firebaseConfig'
import { getUserRole, isValidAdminRole, isClientRole } from '~/utils/roleVerification'

interface AuthState {
  isLoading: boolean
  isAuthenticated: boolean
  userName: string
  showAuthIndicator: boolean
  loadingMessage: string
}

export const useAdminAuth = () => {
  const navigate = useNavigate()
  const [authState, setAuthState] = useState<AuthState>({
    isLoading: true,
    isAuthenticated: false,
    userName: '',
    showAuthIndicator: false,
    loadingMessage: 'Verificando permisos de acceso...'
  })

  useEffect(() => {
    // Verificar si ya se mostró el loader en esta sesión
    const hasShownLoader = sessionStorage.getItem('adminLoaderShown')

    if (hasShownLoader) {
      setAuthState(prev => ({ ...prev, isLoading: false }))
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // Limpiar el sessionStorage cuando no hay usuario
        sessionStorage.removeItem('adminLoaderShown')
        navigate('/login')
        return
      }

      try {
        const userName = user.displayName || user.email || 'Usuario'

        // Actualizar mensaje de carga
        setAuthState(prev => ({
          ...prev,
          loadingMessage: 'Verificando rol de usuario...'
        }))

        // Verificar rol usando la función utilitaria
        const { role, source } = await getUserRole(user)

        console.log('Rol del usuario:', role, 'Fuente:', source)

        if (!role) {
          // Si no se encontró rol en ninguna fuente
          console.warn('No se pudo determinar el rol del usuario')
          navigate('/unauthorized')
          return
        }

        if (isClientRole(role)) {
          navigate('/unauthorized')
          return
        }

        if (!isValidAdminRole(role)) {
          console.warn(`Rol no válido para admin: ${role}`)
          navigate('/unauthorized')
          return
        }

        // Actualizar mensaje según la fuente del rol
        const message = source === 'database'
          ? 'Consultando base de datos...'
          : 'Verificando permisos de acceso...'

        // Usuario autenticado con rol válido
        setAuthState({
          isLoading: hasShownLoader ? false : true,
          isAuthenticated: true,
          userName,
          showAuthIndicator: hasShownLoader ? true : false,
          loadingMessage: message
        })

        // Esperar un poco para que se vea el loader si es la primera vez
        if (!hasShownLoader) {
          // Marcar que el loader ya se mostró antes de iniciar el timeout
          sessionStorage.setItem('adminLoaderShown', 'true')
          setTimeout(() => {
            setAuthState(prev => ({ ...prev, isLoading: false }))
          }, 1500) // 1.5 segundos de loader
        }
      } catch (error) {
        console.error('Error al verificar token:', error)
        navigate('/login')
      }
    })

    return () => unsubscribe()
  }, [navigate])

  return authState
}
