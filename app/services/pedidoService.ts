import axios from 'axios'
import type { Pedido } from '~/Types/Pedido'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export const setPedidoFromCarrito = async (idUsuario: string, createdBy?: string): Promise<Pedido> => {
  try {
    const params: Record<string, string> = { idUsuario }
    if (createdBy) params.createdBy = createdBy

    const response = await axios.post<Pedido>(
      `${API_URL}/pedido/desde-carrito`,
      null, // No hay body
      { params }
    )
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al crear el pedido:', error.response?.data || error.message)
    } else {
      console.error('Error al crear el pedido:', (error as Error).message)
    }
    throw new Error('Error al crear el pedido.')
  }
}