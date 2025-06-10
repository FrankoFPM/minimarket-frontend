import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

// Definición de la interfaz para el departamento
interface Departamento {
  id: number
  nombre: string
  descripcion: string
  estado: string
  createdBy: string | null
  updatedBy: string | null
  createdAt: string
  updatedAt: string
}
export const getDepartamentos = async (): Promise<Departamento[]> => {
  try {
    const response = await axios.get<Departamento[]>(`${API_URL}/departamento`)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al obtener departamentos:', error.response?.data || error.message)
    } else {
      console.error('Error al obtener departamentos:', (error as Error).message)
    }
    throw new Error('Error al obtener departamentos.')
  }
}