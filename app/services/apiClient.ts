import axios from 'axios'
import { forceTokenRefresh } from './authService'
import { addToast } from '@heroui/react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

// Crear instancia de axios
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para respuestas
apiClient.interceptors.response.use(
  (response) => {
    // Verificar si la respuesta indica que se requiere refresh del token
    if (response.data && response.data.requiresTokenRefresh) {
      console.log('Token refresh required detected in response')

      // Mostrar notificación moderna y elegante
      addToast({
        title: 'Sesión actualizada',
        description: 'Tu sesión se ha actualizado automáticamente para reflejar los cambios más recientes.',
        color: 'success',
        shouldShowTimeoutProgress: true,
      })

      // Actualizar token automáticamente
      forceTokenRefresh().then(() => {
        console.log('Token refreshed after API response')
      }).catch(error => {
        console.error('Error refreshing token after API response:', error)
        // Mostrar toast de error si falla
        addToast({
          title: 'Error de sesión',
          description: 'Hubo un problema al actualizar tu sesión. Por favor, recarga la página.',
          color: 'danger',
          shouldShowTimeoutProgress: true,
        })
      })
    }
    return response
  },
  (error) => {
    // Manejar errores 401 (Unauthorized)
    if (error.response?.status === 401) {
      console.log('Unauthorized access detected')
      // Opcional: redirigir al login
      // window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Interceptor para requests (opcional - para agregar token automáticamente)
apiClient.interceptors.request.use(
  async (config) => {
    // Opcional: agregar token automáticamente a todas las requests
    try {
      const user = (await import('~/firebase/firebaseConfig')).auth.currentUser
      if (user) {
        const token = await user.getIdToken()
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch (error) {
      console.error('Error getting token for request:', error)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default apiClient
