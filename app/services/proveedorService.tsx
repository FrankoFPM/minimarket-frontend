import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
/*
private Long id;
    private String nombre;
    private String contacto;
    private String telefono;
    private String direccion;
    private String email;
    private String estado;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
 */

interface Proveedor {
  id: number,
  nombre: string,
  contacto: string,
  telefono: string,
  direccion: string,
  email: string,
  estado: string,
  createdAt: string,
  updatedAt: string
}
export const getProveedores = async (): Promise<Proveedor[]> => {
  try {
    const response = await axios.get<Proveedor[]>(`${API_URL}/proveedor`)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al obtener proveedores:', error.response?.data || error.message)
    } else {
      console.error('Error al obtener proveedores:', (error as Error).message)
    }
    throw new Error('Error al obtener proveedores.')
  }
}