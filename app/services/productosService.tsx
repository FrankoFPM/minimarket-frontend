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

interface Producto {
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
  idProveedor?: number // ID para inserción
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