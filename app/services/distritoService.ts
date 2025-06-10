import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

// Definición de la interfaz para el distrito
export interface Distrito {
  id: number
  nombre: string
  descripcion: string
  estado: string
  idDepartamento: number
  createdAt: string
  updatedAt: string
}

export const getDistritos = async (): Promise<Distrito[]> => {
  try {
    const response = await axios.get<Distrito[]>(`${API_URL}/distrito`)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al obtener distritos:', error.response?.data || error.message)
    } else {
      console.error('Error al obtener distritos:', (error as Error).message)
    }
    throw new Error('Error al obtener distritos.')
  }
}