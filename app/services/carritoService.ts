import axios from 'axios'
import type { Carrito } from '~/Types/Carrito'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export const getCarrito = async (userId: string): Promise<Carrito[]> => {
  try {
    const response = await axios.get(`${API_URL}/carrito/usuario/${userId}`)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al obtener el carrito:', error.response?.data || error.message)
    } else {
      console.error('Error al obtener el carrito:', (error as Error).message)
    }
    throw new Error('Error al obtener el carrito.')
  }
}

export const addProductoToCarrito = async (idUsuario: string, idProducto: string, cantidad: number): Promise<Carrito> => {
  try {
    if (!idUsuario || !idProducto || cantidad <= 0) {
      throw new Error('Datos inválidos para agregar al carrito.')
    }
    const response = await axios.post(`${API_URL}/carrito/agregar`, { idUsuario, idProducto, cantidad })
    console.log('Producto agregado al carrito:', response.data)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al agregar producto al carrito:', error.response?.data || error.message)
    } else {
      console.error('Error al agregar producto al carrito:', (error as Error).message)
    }
    throw new Error('Error al agregar producto al carrito.')
  }
}

export const removeAllProductosFromCarrito = async (idUsuario: string): Promise<void> => {
  try {
    if (!idUsuario) {
      throw new Error('ID de usuario inválido para eliminar productos del carrito.')
    }
    const response = await axios.delete(`${API_URL}/carrito/usuario/${idUsuario}/vaciar`)
    console.log('Todos los productos eliminados del carrito:', response.data)
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al eliminar productos del carrito:', error.response?.data || error.message)
    } else {
      console.error('Error al eliminar productos del carrito:', (error as Error).message)
    }
    throw new Error('Error al eliminar productos del carrito.')
  }
}