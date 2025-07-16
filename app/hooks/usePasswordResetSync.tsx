import { useEffect, useState } from 'react'
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth'
import { auth } from '~/firebase/firebaseConfig'
import { registerPasswordReset } from '~/services/usuarioService'

/**
 * Hook que detecta restablecimientos de contraseña y los sincroniza con la BD
 */
export const usePasswordResetSync = () => {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && !isInitialized) {
        setIsInitialized(true)
        await checkAndSyncPasswordReset(user)
      }
    })

    return () => unsubscribe()
  }, [isInitialized])

  return { isInitialized }
}

/**
 * Verifica si el usuario acaba de restablecer su contraseña
 */
const checkAndSyncPasswordReset = async (user: FirebaseUser): Promise<void> => {
  try {
    const metadata = user.metadata
    const lastSignInTime = metadata.lastSignInTime
    const creationTime = metadata.creationTime

    // Si el usuario no es nuevo
    if (lastSignInTime && creationTime && lastSignInTime !== creationTime) {
      const now = new Date()
      const lastSignIn = new Date(lastSignInTime)
      const timeDiff = now.getTime() - lastSignIn.getTime()

      // Si el último inicio de sesión fue hace menos de 5 minutos
      if (timeDiff < 300000) { // 5 minutos
        const hasResetFlag = sessionStorage.getItem(`password_reset_${user.uid}`)

        if (!hasResetFlag) {
          console.log('Detectado posible restablecimiento de contraseña para:', user.email)

          // Registrar el restablecimiento en la BD
          await registerPasswordReset(user.uid, user.email!)

          // Marcar como procesado para evitar duplicados
          sessionStorage.setItem(`password_reset_${user.uid}`, 'processed')
        }
      }
    }
  } catch (error) {
    console.error('Error al verificar restablecimiento de contraseña:', error)
  }
}

/**
 * Hook para usar en el componente de login
 * Detecta si el usuario viene de un restablecimiento de contraseña
 */
export const usePasswordResetDetection = () => {
  const [wasPasswordReset, setWasPasswordReset] = useState(false)

  useEffect(() => {
    const checkForReset = async () => {
      const user = auth.currentUser
      if (user) {
        const hasResetFlag = sessionStorage.getItem(`password_reset_${user.uid}`)
        if (hasResetFlag === 'processed') {
          setWasPasswordReset(true)

          // Opcional: Mostrar mensaje de confirmación
          // addToast({
          //   title: 'Contraseña actualizada',
          //   description: 'Tu contraseña se ha actualizado correctamente.',
          //   color: 'success'
          // })
        }
      }
    }

    checkForReset()
  }, [])

  return { wasPasswordReset }
}
