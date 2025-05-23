import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
// Definición de la interfaz para el usuario
interface User {
  id: string
  nombre: string
  apellido: string
  email: string
  distritoId: number
  password: string
  telefono: string
  direccion: string
}

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${API_URL}/usuario`)
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