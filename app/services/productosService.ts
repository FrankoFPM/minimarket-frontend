import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
/**
 *     private String idProducto;
    private String nombre;
    private String descripcion;
    private Double precio;
    private Long stock;
    private String foto;
    private String estado;
    private String categoriaNombre;   // Solo el nombre de la categoría
    private String proveedorNombre;   // Solo el nombre del proveedor

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long idCategoria;      // <--- ID para inserción
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long idProveedor;
 */

export interface Producto {
  idProducto: string,
  nombre: string,
  descripcion: string,
  precio: number,
  stock: number,
  foto: string,
  estado: string,
  categoriaNombre: string, // Solo el nombre de la categoría
  proveedorNombre: string, // Solo el nombre del proveedor
  idCategoria?: number, // ID para inserción
  idProveedor?: number, // ID para inserción
  createdAt?: string,
  updatedAt?: string
}
export const getProductos = async (): Promise<Producto[]> => {
  try {
    const response = await axios.get<Producto[]>(`${API_URL}/producto`)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al obtener productos:', error.response?.data || error.message)
    } else {
      console.error('Error al obtener productos:', (error as Error).message)
    }
    throw new Error('Error al obtener productos.')
  }
}

export const getProductoById = async (id: string): Promise<Producto> => {
  try {
    const response = await axios.get<Producto>(`${API_URL}/producto/${id}`)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al obtener producto:', error.response?.data || error.message)
    } else {
      console.error('Error al obtener producto:', (error as Error).message)
    }
    throw new Error('Error al obtener producto.')
  }
}

export const createProducto = async (producto: Omit<Producto, 'idProducto' | 'createdAt' | 'updatedAt' | 'categoriaNombre' | 'proveedorNombre'>): Promise<Producto> => {
  try {
    const response = await axios.post<Producto>(`${API_URL}/producto`, producto)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al crear producto:', error.response?.data || error.message)
    } else {
      console.error('Error al crear producto:', (error as Error).message)
    }
    throw new Error('Error al crear producto.')
  }
}

export const updateProducto = async (id: string, producto: Omit<Producto, 'idProducto' | 'createdAt' | 'updatedAt'| 'categoriaNombre' | 'proveedorNombre'>): Promise<Producto> => {
  try {
    console.log('Actualizando producto con ID:', id, 'y datos:', producto)
    const response = await axios.put<Producto>(`${API_URL}/producto/${id}`, producto)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al actualizar producto:', error.response?.data || error.message)
    } else {
      console.error('Error al actualizar producto:', (error as Error).message)
    }
    throw new Error('Error al actualizar producto.')
  }
}

export const deleteProducto = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/producto/${id}`)
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al eliminar producto:', error.response?.data || error.message)
    } else {
      console.error('Error al eliminar producto:', (error as Error).message)
    }
    throw new Error('Error al eliminar producto.')
  }
}

//get Productos with low stock - GET http://localhost:8080/api/producto/alerta-stock
export const getProductosLowStock = async (): Promise<Producto[]> => {
  try {
    const response = await axios.get<Producto[]>(`${API_URL}/producto/alerta-stock`)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al obtener productos de bajo stock:', error.response?.data || error.message)
    } else {
      console.error('Error al obtener productos sin stock:', (error as Error).message)
    }
    throw new Error('Error al obtener productos de bajo stock.')
  }
}