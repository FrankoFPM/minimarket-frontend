import axios from 'axios'
import { registerWithEmail } from './firebaseAuth'
import { handleApiError, handleFirebaseError } from '~/utils/errorHandling'
import type { User } from '~/Types/Usuario'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export const createUserClient = async (user: Omit<User,'googleId' | 'facebookId' | 'createdAt' | 'updatedAt' | 'distritoNombre' | 'rol' | 'estado'>): Promise<User> => {
  try {
    // 1. Registrar en Firebase
    const userCredential = await registerWithEmail(user.email, user.password, `${user.nombre} ${user.apellido}`)
    const firebaseUser = userCredential.user
    const firebaseUid = firebaseUser.uid

    // 2. Crear objeto usuario completo con estado por defecto
    const userToCreate = {
      ...user,
      id: firebaseUid,
      estado: 'activo' as const
    }

    // 3. Crear usuario en la base de datos
    const response = await axios.post<User>(`${API_URL}/usuario`, userToCreate)
    return response.data
  } catch (error: unknown) {
    // Manejar errores de Firebase
    if (error && typeof error === 'object' && 'code' in error) {
      const firebaseErrorMessage = handleFirebaseError(error)
      console.error('Error de Firebase al crear usuario:', firebaseErrorMessage)
      throw new Error(firebaseErrorMessage)
    }

    // Manejar errores de la API
    if (axios.isAxiosError(error)) {
      const apiErrorMessage = handleApiError(error)
      console.error('Error de API al crear usuario:', apiErrorMessage)
      throw new Error(apiErrorMessage)
    }

    // Error genérico
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido al crear usuario'
    console.error('Error al crear usuario:', errorMessage)
    throw new Error(errorMessage)
  }
}
