import axios from 'axios'
import type { User } from '~/Types/Usuario'
import { registerUserAsAdmin } from './firebaseAuth'
import apiClient from './apiClient'
import { handleFirebaseError, handleApiError } from '~/utils/errorHandling'

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