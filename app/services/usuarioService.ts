import axios from 'axios'
import type { User } from '~/Types/Usuario'
import { registerUserAsAdmin } from './firebaseAuth'
import apiClient from './apiClient'
import { handleFirebaseError, handleApiError } from '~/utils/errorHandling'
import { updateUserCredentials, canUpdateOwnCredentials, sendPasswordResetEmail } from './userCredentialService'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await apiClient.get<User[]>('/usuario')
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al obtener usuarios:', error.response?.data || error.message)
    } else {
      console.error('Error al obtener usuarios:', (error as Error).message)
    }
    throw new Error('Error al obtener usuarios.')
  }
}

// http://localhost:8080/api/usuario/rol/not/cliente
export const fetchNonClientUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${API_URL}/usuario/rol/not/cliente`)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al obtener usuarios no clientes:', error.response?.data || error.message)
    } else {
      console.error('Error al obtener usuarios no clientes:', (error as Error).message)
    }
    throw new Error('Error al obtener usuarios no clientes.')
  }
}
// http://localhost:8080/api/usuario/rol/cliente
export const fetchClientUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${API_URL}/usuario/rol/cliente`)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al obtener usuarios clientes:', error.response?.data || error.message)
    } else {
      console.error('Error al obtener usuarios clientes:', (error as Error).message)
    }
    throw new Error('Error al obtener usuarios clientes.')
  }
}

/**
 *
 * @param user
 * @returns
 */

export const createUser = async (user: Omit<User,'googleId' | 'facebookId' | 'createdAt' | 'updatedAt' | 'distritoNombre' | 'rol'>): Promise<User> => {
  try {
    // 1. Registrar en Firebase usando la función que no afecta la sesión actual
    const userCredential = await registerUserAsAdmin(user.email, user.password, `${user.nombre} ${user.apellido}`)
    const firebaseUser = userCredential.user
    const firebaseUid = firebaseUser.uid
    user.id = firebaseUid // Asignar el ID de Firebase al usuario

    // 2. Crear usuario en la base de datos
    const response = await axios.post<User>(`${API_URL}/usuario`, user)
    return response.data
  } catch (error: unknown) {
    // Manejar errores de Firebase
    if (error && typeof error === 'object' && 'code' in error) {
      const firebaseErrorMessage = handleFirebaseError(error)
      console.error('Error de Firebase al crear usuario:', firebaseErrorMessage)
      throw new Error(firebaseErrorMessage)
    }

    // Manejar errores de la API
    if (axios.isAxiosError(error)) {
      const apiErrorMessage = handleApiError(error)
      console.error('Error de API al crear usuario:', apiErrorMessage)
      throw new Error(apiErrorMessage)
    }

    // Error genérico
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido al crear usuario'
    console.error('Error al crear usuario:', errorMessage)
    throw new Error(errorMessage)
  }
}

export const updateUser = async (id: string, user: Omit<User, 'id' | 'googleId' | 'facebookId' | 'createdAt' | 'updatedAt'>): Promise<User> => {
  try {
    // Usar apiClient que maneja automáticamente el token refresh con interceptors
    const response = await apiClient.put<User>(`/usuario/${id}`, user)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al actualizar usuario:', error.response?.data || error.message)
    } else {
      console.error('Error al actualizar usuario:', (error as Error).message)
    }
    throw new Error('Error al actualizar usuario.')
  }
}

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/usuario/${id}`)
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al eliminar usuario:', error.response?.data || error.message)
    } else {
      console.error('Error al eliminar usuario:', (error as Error).message)
    }
    throw new Error('Error al eliminar usuario.')
  }
}

export interface UserUpdateData extends Omit<User, 'id' | 'googleId' | 'facebookId' | 'createdAt' | 'updatedAt'> {
  currentPassword?: string
  newPassword?: string
}

/**
 * Actualiza un usuario incluyendo sus credenciales de Firebase si es necesario
 * @param id - ID del usuario a actualizar
 * @param userData - Datos del usuario incluyendo credenciales opcionales
 * @returns Usuario actualizado
 */
export const updateUserWithCredentials = async (id: string, userData: UserUpdateData): Promise<User> => {
  try {
    // Extraer datos de credenciales
    const { currentPassword, newPassword, ...userDataForDB } = userData

    // 1. Actualizar en la base de datos primero
    const response = await apiClient.put<User>(`/usuario/${id}`, userDataForDB)
    const updatedUser = response.data

    // 2. Actualizar credenciales de Firebase si es necesario
    if (canUpdateOwnCredentials(id)) {
      // El usuario está autenticado y puede actualizar sus propias credenciales
      if (currentPassword && (newPassword || userData.email)) {
        try {
          await updateUserCredentials(
            {
              newPassword: newPassword,
              newEmail: userData.email,
              newDisplayName: `${userData.nombre} ${userData.apellido}`
            },
            currentPassword
          )
        } catch (credentialError) {
          // Si falla la actualización de credenciales, no fallar completamente
          console.warn('Error al actualizar credenciales de Firebase:', credentialError)
          // Opcionalmente, podrías lanzar una advertencia específica
        }
      }
    } else {
      // El usuario no puede actualizar sus propias credenciales
      if (newPassword) {
        // Enviar email de restablecimiento de contraseña
        await sendPasswordResetEmail(userData.email)
        console.log('Email de restablecimiento enviado para actualizar contraseña')
      }
    }

    return updatedUser
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al actualizar usuario:', error.response?.data || error.message)
    } else {
      console.error('Error al actualizar usuario:', (error as Error).message)
    }
    throw new Error('Error al actualizar usuario.')
  }
}

/**
 * Registra un restablecimiento de contraseña en la base de datos
 * Se usa cuando el usuario restablece su contraseña via email
 */
export const registerPasswordReset = async (userId: string, email: string): Promise<void> => {
  try {
    await axios.patch(`${API_URL}/usuario/${userId}/password-reset`, {
      passwordResetAt: new Date().toISOString(),
      email: email,
      source: 'password_reset_link'
    })

    console.log('Restablecimiento de contraseña registrado para:', email)
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al registrar restablecimiento:', error.response?.data || error.message)
    } else {
      console.error('Error al registrar restablecimiento:', (error as Error).message)
    }
    throw new Error('Error al registrar restablecimiento de contraseña.')
  }
}