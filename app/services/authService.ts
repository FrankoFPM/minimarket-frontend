import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

// Servicio para autenticar al usuario
export const authenticateUser = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_URL}/usuario/auth`, {
      email,
      password,
    })

    // Retorna true o false según la respuesta del backend
    return response.data === true
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        // Error de red o servidor inaccesible
        throw new Error('El servidor no está disponible. Por favor, verifica que esté encendido.')
      }
      if (error.response.status === 401) {
        // Error 401: Credenciales incorrectas
        console.error('Credenciales incorrectas')
        return false
      }
      console.error('Error al autenticar:', error.response?.data || error.message)
    } else {
      console.error('Error al autenticar:', (error as Error).message)
    }
    throw new Error('Error al autenticar. Verifica tus credenciales.')
  }
}