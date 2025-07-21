import type { User } from 'firebase/auth'
import { fetchUsers } from '~/services/usuarioService'

export interface UserRole {
  role: string | null
  source: 'firebase' | 'database' | 'none'
}

/**
 * Verifica el rol del usuario desde Firebase Custom Claims o base de datos
 * @param user - Usuario autenticado de Firebase
 * @param retryCount - Número de reintentos para custom claims
 * @returns Objeto con rol y fuente de información
 */
export const getUserRole = async (user: User, retryCount = 1): Promise<UserRole> => {
  try {
    // Intentar obtener rol desde Firebase Custom Claims
    const idToken = await user.getIdTokenResult()
    const firebaseRole = idToken.claims.role as string | undefined

    if (firebaseRole) {
      return {
        role: firebaseRole,
        source: 'firebase'
      }
    }

    // Si no hay custom claims y aún tenemos reintentos, intentar refrescar token
    if (retryCount > 0) {
      console.log('Reintentando obtener custom claims...')
      await user.getIdToken(true) // Forzar refresh del token
      return getUserRole(user, retryCount - 1)
    }

    // Si no hay custom claims, intentar consultar la base de datos
    console.warn('No se encontraron custom claims, consultando base de datos...')

    try {
      const users = await fetchUsers()
      const dbUser = users.find(u => u.id === user.uid || u.email === user.email)

      if (dbUser && dbUser.rol) {
        return {
          role: dbUser.rol,
          source: 'database'
        }
      }
    } catch (dbError) {
      console.error('Error al consultar base de datos:', dbError)
    }

    // No se encontró rol en ninguna fuente
    return {
      role: null,
      source: 'none'
    }
  } catch (error) {
    console.error('Error al verificar rol del usuario:', error)
    return {
      role: null,
      source: 'none'
    }
  }
}

/**
 * Verifica si un rol es válido para el panel de administración
 * @param role - Rol a verificar
 * @returns true si es válido para admin
 */
export const isValidAdminRole = (role: string | null): boolean => {
  if (!role) return false
  const validAdminRoles = ['admin', 'almacenista', 'recepcion']
  return validAdminRoles.includes(role)
}

/**
 * Verifica si un rol es de cliente
 * @param role - Rol a verificar
 * @returns true si es cliente
 */
export const isClientRole = (role: string | null): boolean => {
  return role === 'cliente'
}
