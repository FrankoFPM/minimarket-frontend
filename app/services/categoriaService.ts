import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
/**
 *  private Long id;
    private String nombre;
    private String descripcion;
    private String estado;
    private Instant createdAt;
    private Instant updatedAt;
 */

interface Categoria {
  id: number,
  nombre: string,
  descripcion: string,
  estado: string,
  createdAt: string,
  updatedAt: string
}

export const getCategorias = async (): Promise<Categoria[]> => {
  try {
    const response = await axios.get<Categoria[]>(`${API_URL}/categoria`)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al obtener categorías:', error.response?.data || error.message)
    } else {
      console.error('Error al obtener categorías:', (error as Error).message)
    }
    throw new Error('Error al obtener categorías.')
  }
}

export const getCategoriaById = async (id: number): Promise<Categoria> => {
  try {
    const response = await axios.get<Categoria>(`${API_URL}/categoria/${id}`)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al obtener categoría:', error.response?.data || error.message)
    } else {
      console.error('Error al obtener categoría:', (error as Error).message)
    }
    throw new Error('Error al obtener categoría.')
  }
}

export const createCategoria = async (categoria: Omit<Categoria, 'id' | 'createdAt' | 'updatedAt'>): Promise<Categoria> => {
  try {
    const response = await axios.post<Categoria>(`${API_URL}/categoria`, categoria)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al crear categoría:', error.response?.data || error.message)
    } else {
      console.error('Error al crear categoría:', (error as Error).message)
    }
    throw new Error('Error al crear categoría.')
  }
}

export const updateCategoria = async (id: number, categoria: Omit<Categoria, 'id' | 'createdAt' | 'updatedAt'>): Promise<Categoria> => {
  try {
    const response = await axios.put<Categoria>(`${API_URL}/categoria/${id}`, categoria)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al actualizar categoría:', error.response?.data || error.message)
    } else {
      console.error('Error al actualizar categoría:', (error as Error).message)
    }
    throw new Error('Error al actualizar categoría.')
  }
}

export const softDeleteCategoria = async (id: number): Promise<Categoria> => {
  try {
    const response = await axios.delete<Categoria>(`${API_URL}/categoria/${id}`)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al eliminar categoría:', error.response?.data || error.message)
    } else {
      console.error('Error al eliminar categoría:', (error as Error).message)
    }
    throw new Error('Error al eliminar categoría.')
  }
}