import axios from 'axios'
import type { User } from '~/Types/Usuario'
import { registerWithEmail } from './firebaseAuth'
import apiClient from './apiClient'

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
 * @param user [
  {
    "id": "456DA52CE9894A04AB189BE7E894274C", omitir en insert
    "nombre": "Franco",
    "apellido": "PM",
    "email": "example@example.com",
    "telefono": "987654321",
    "distritoId": 1,
    "distritoNombre": "San Martin de porres", omitir en insert
    "direccion": "Calle Falsa 123",
    "googleId": null, omitir en insert
    "facebookId": null, omitir en insert
    "rol": "admin",
    "estado": "activo"
  }
]
 * @returns
 */

export const createUser = async (user: Omit<User,'googleId' | 'facebookId' | 'createdAt' | 'updatedAt' | 'distritoNombre' | 'rol'>): Promise<User> => {
  try {
    // 1. Registrar en Firebase
    const userCredential = await registerWithEmail(user.email, user.password, `${user.nombre} ${user.apellido}`)
    const firebaseUser = userCredential.user
    const firebaseUid = firebaseUser.uid
    user.id = firebaseUid // Asignar el ID de Firebase al usuario
    const response = await axios.post<User>(`${API_URL}/usuario`, user)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al crear usuario cliente:', error.response?.data || error.message)
    } else {
      console.error('Error al crear usuario cliente:', (error as Error).message)
    }
    throw new Error('Error al crear usuario cliente.')
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