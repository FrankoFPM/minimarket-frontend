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

// Get all pedidos - GET http://localhost:8080/api/pedido
export const getAllPedidos = async (): Promise<Pedido[]> => {
  try {
    const response = await axios.get<Pedido[]>(`${API_URL}/pedido`)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorDetails = error.response?.data || error.message
      console.error('Error al obtener todos los pedidos:', errorDetails)
      throw new Error(`Error al obtener todos los pedidos: ${errorDetails}`)
    } else {
      const errorMessage = (error as Error).message
      console.error('Error al obtener todos los pedidos:', errorMessage)
      throw new Error(`Error al obtener todos los pedidos: ${errorMessage}`)
    }
  }
}

// Cancela un pedido - PATCH http://localhost:8080/api/pedido/{id}/cancelar?updatedBy=usuarioId
export const cancelarPedido = async (id: number, updatedBy: string): Promise<void> => {
  try {
    await axios.patch(
      `${API_URL}/pedido/${id}/cancelar`,
      null, // No hay body
      { params: { updatedBy } }
    )
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorDetails = error.response?.data || error.message
      console.error('Error al cancelar el pedido:', errorDetails)
      throw new Error(`Error al cancelar el pedido: ${errorDetails}`)
    } else {
      const errorMessage = (error as Error).message
      console.error('Error al cancelar el pedido:', errorMessage)
      throw new Error(`Error al cancelar el pedido: ${errorMessage}`)
    }
  }
}

// Actualiza el estado de un pedido - PATCH http://localhost:8080/api/pedido/{id}/estado?nuevoEstado=ESTADO_DESEADO
export const updatePedidoEstado = async (id: number, nuevoEstado: string): Promise<Pedido> => {
  try {
    const response = await axios.patch<Pedido>(
      `${API_URL}/pedido/${id}/estado`,
      null, // No hay body
      { params: { nuevoEstado } }
    )
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorDetails = error.response?.data || error.message
      const status = error.response?.status

      // Agregar más información sobre el error
      console.error('Error al actualizar el estado del pedido:', {
        status,
        data: error.response?.data,
        pedidoId: id,
        nuevoEstado,
        url: `${API_URL}/pedido/${id}/estado?nuevoEstado=${nuevoEstado}`
      })

      // Mensajes de error más específicos
      if (status === 400) {
        throw new Error(`Error de validación: No se puede cambiar el estado a '${nuevoEstado}'. Verifique las reglas de transición de estados.`)
      } else if (status === 404) {
        throw new Error(`Pedido con ID ${id} no encontrado.`)
      } else {
        throw new Error(`Error al actualizar el estado del pedido: ${errorDetails}`)
      }
    } else {
      const errorMessage = (error as Error).message
      console.error('Error al actualizar el estado del pedido:', errorMessage)
      throw new Error(`Error al actualizar el estado del pedido: ${errorMessage}`)
    }
  }
}

//Mostrar boleta GET http://localhost:8080/api/pedido/boleta/1/LNsUIsfYWnM5GGqkILyQlfzYlGR2
export const getBoleta = async (idPedido: number, idUsuario: string): Promise<string> => {
  try {
    const response = await axios.get(`${API_URL}/pedido/boleta/${idPedido}/${idUsuario}`, {
      responseType: 'arraybuffer'
    })
    const blob = new Blob([response.data], { type: 'application/pdf' })
    return URL.createObjectURL(blob)
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorDetails = error.response?.data || error.message
      console.error('Error al obtener la boleta:', errorDetails)
      throw new Error(`Error al obtener la boleta: ${errorDetails}`)
    } else {
      const errorMessage = (error as Error).message
      console.error('Error al obtener la boleta:', errorMessage)
      throw new Error(`Error al obtener la boleta: ${errorMessage}`)
    }
  }
}