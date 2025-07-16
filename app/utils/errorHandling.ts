/**
 * Maneja errores de Firebase y devuelve mensajes legibles para el usuario
 * @param error - Error de Firebase
 * @returns Mensaje de error legible
 */
export const handleFirebaseError = (error: unknown): string => {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const firebaseError = error as { code: string; message: string }

    switch (firebaseError.code) {
    case 'auth/email-already-in-use':
      return 'El correo electrónico ya está en uso'
    case 'auth/invalid-email':
      return 'El correo electrónico no es válido'
    case 'auth/operation-not-allowed':
      return 'Operación no permitida'
    case 'auth/weak-password':
      return 'La contraseña es muy débil'
    case 'auth/user-not-found':
      return 'Usuario no encontrado'
    case 'auth/wrong-password':
      return 'Contraseña incorrecta'
    case 'auth/too-many-requests':
      return 'Demasiados intentos fallidos. Intenta más tarde'
    case 'auth/network-request-failed':
      return 'Error de conexión. Verifica tu internet'
    case 'auth/user-disabled':
      return 'Esta cuenta ha sido deshabilitada'
    case 'auth/invalid-credential':
      return 'Credenciales inválidas'
    default:
      return firebaseError.message || 'Error desconocido de Firebase'
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Error desconocido'
}

/**
 * Maneja errores de la API del backend
 * @param error - Error de axios
 * @returns Mensaje de error legible
 */
export const handleApiError = (error: unknown): string => {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { data?: { message?: string }; status?: number } }

    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message
    }

    if (axiosError.response?.status) {
      switch (axiosError.response.status) {
      case 400:
        return 'Datos inválidos enviados al servidor'
      case 401:
        return 'No autorizado. Inicia sesión nuevamente'
      case 403:
        return 'No tienes permisos para realizar esta acción'
      case 404:
        return 'Recurso no encontrado'
      case 409:
        return 'Conflicto: el recurso ya existe'
      case 422:
        return 'Error de validación en los datos'
      case 500:
        return 'Error interno del servidor'
      default:
        return `Error del servidor: ${axiosError.response.status}`
      }
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Error de conexión con el servidor'
}
