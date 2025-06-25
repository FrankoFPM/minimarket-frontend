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
      const errorDetails = error.response?.data || error.message
      console.error('Error al crear el pedido:', errorDetails)
      throw new Error(`Error al crear el pedido: ${errorDetails}`)
    } else {
      const errorMessage = (error as Error).message
      console.error('Error al crear el pedido:', errorMessage)
      throw new Error(`Error al crear el pedido: ${errorMessage}`)
    }
  }
}

//Get pedidos by user - GET http://localhost:8080/api/pedido/usuario/LNsUIsfYWnM5GGqkILyQlfzYlGR2
export const getPedidosByUsuario = async (idUsuario: string): Promise<Pedido[]> => {
  try {
    const response = await axios.get<Pedido[]>(`${API_URL}/pedido/usuario/${idUsuario}`)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorDetails = error.response?.data || error.message
      console.error('Error al obtener los pedidos:', errorDetails)
      throw new Error(`Error al obtener los pedidos: ${errorDetails}`)
    } else {
      const errorMessage = (error as Error).message
      console.error('Error al obtener los pedidos:', errorMessage)
      throw new Error(`Error al obtener los pedidos: ${errorMessage}`)
    }
  }
}