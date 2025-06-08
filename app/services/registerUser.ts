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

export const registerUserClient = async (user: User): Promise<number> => {
  try {
    const response = await axios.post<User>(`${API_URL}/usuario`, user)
    console.log('Usuario registrado:', response.data)
    return response.status
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al registrar usuario:', error.response?.data || error.message)
    } else {
      console.error('Error al registrar usuario:', (error as Error).message)
    }
    throw new Error('Error al registrar usuario.')
  }
}
