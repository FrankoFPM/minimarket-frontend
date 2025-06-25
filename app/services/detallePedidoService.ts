import axios from 'axios'
import type { DetallePedido } from '~/Types/DetallePedido'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

// Get pedido details by ID pedido - GET http://localhost:8080/api/detalle-pedidos/pedido/1
export const getDetallePedidoById = async (idPedido: number): Promise<DetallePedido> => {
  try {
    const response = await axios.get<DetallePedido>(`${API_URL}/detalle-pedidos/pedido/${idPedido}`)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorDetails = error.response?.data || error.message
      console.error('Error al obtener los detalles del pedido:', errorDetails)
      throw new Error(`Error al obtener los detalles del pedido: ${errorDetails}`)
    } else {
      const errorMessage = (error as Error).message
      console.error('Error al obtener los detalles del pedido:', errorMessage)
      throw new Error(`Error al obtener los detalles del pedido: ${errorMessage}`)
    }
  }
}

// Get all detalle pedidos by ID user - GET http://localhost:8080/api/detalle-pedidos/usuario/LNsUIsfYWnM5GGqkILyQlfzYlGR2
export const getDetallePedidosByUsuario = async (idUsuario: string): Promise<DetallePedido[]> => {
  try {
    const response = await axios.get<DetallePedido[]>(`${API_URL}/detalle-pedidos/usuario/${idUsuario}`)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorDetails = error.response?.data || error.message
      console.error('Error al obtener los detalles de los pedidos:', errorDetails)
      throw new Error(`Error al obtener los detalles de los pedidos: ${errorDetails}`)
    } else {
      const errorMessage = (error as Error).message
      console.error('Error al obtener los detalles de los pedidos:', errorMessage)
      throw new Error(`Error al obtener los detalles de los pedidos: ${errorMessage}`)
    }
  }
}