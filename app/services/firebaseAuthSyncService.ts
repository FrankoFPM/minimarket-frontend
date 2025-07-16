import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth'
import { auth } from '~/firebase/firebaseConfig'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

/**
 * Servicio para sincronizar cambios de Firebase Auth con la base de datos
 */
export class FirebaseAuthSyncService {
  private static instance: FirebaseAuthSyncService
  private unsubscribe: (() => void) | null = null

  private constructor() {}

  public static getInstance(): FirebaseAuthSyncService {
    if (!FirebaseAuthSyncService.instance) {
      FirebaseAuthSyncService.instance = new FirebaseAuthSyncService()
    }
    return FirebaseAuthSyncService.instance
  }

  /**
   * Inicia el listener para cambios de autenticación
   */
  public startAuthListener(): void {
    this.unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await this.handleUserAuthChange(user)
      }
    })
  }

  /**
   * Detiene el listener
   */
  public stopAuthListener(): void {
    if (this.unsubscribe) {
      this.unsubscribe()
      this.unsubscribe = null
    }
  }

  /**
   * Maneja cambios en el estado de autenticación del usuario
   */
  private async handleUserAuthChange(user: FirebaseUser): Promise<void> {
    try {
      // Verificar si el usuario cambió su contraseña recientemente
      const metadata = user.metadata
      const lastSignInTime = metadata.lastSignInTime
      const creationTime = metadata.creationTime

      // Si el último inicio de sesión es muy reciente (menos de 1 minuto)
      // y no es la primera vez que se registra, podría ser un restablecimiento
      if (lastSignInTime && creationTime && lastSignInTime !== creationTime) {
        const timeDiff = new Date().getTime() - new Date(lastSignInTime).getTime()

        // Si es menos de 1 minuto, podría ser un restablecimiento
        if (timeDiff < 60000) {
          console.log('Posible restablecimiento de contraseña detectado para:', user.email)

          // Actualizar timestamp en la base de datos
          await this.syncPasswordResetToDatabase(user.uid, user.email!)
        }
      }
    } catch (error) {
      console.error('Error al sincronizar cambios de auth:', error)
    }
  }

  /**
   * Sincroniza el restablecimiento de contraseña con la base de datos
   */
  private async syncPasswordResetToDatabase(uid: string, email: string): Promise<void> {
    try {
      // Llamar a un endpoint específico para registrar el restablecimiento
      await axios.patch(`${API_URL}/usuario/${uid}/password-reset`, {
        passwordResetAt: new Date().toISOString(),
        email: email
      })

      console.log('Restablecimiento de contraseña sincronizado con la BD')
    } catch (error) {
      console.error('Error al sincronizar restablecimiento con BD:', error)
    }
  }
}

// Instancia singleton
export const authSyncService = FirebaseAuthSyncService.getInstance()
