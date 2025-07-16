import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth'
import { auth } from '~/firebase/firebaseConfig'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

/**
 * Detecta y sincroniza restablecimientos de contraseña de Firebase con la BD
 */
export class PasswordResetSyncService {
  private static instance: PasswordResetSyncService
  private unsubscribe: (() => void) | null = null
  private lastKnownUsers: Map<string, { lastSignIn: string, email: string }> = new Map()

  private constructor() {}

  public static getInstance(): PasswordResetSyncService {
    if (!PasswordResetSyncService.instance) {
      PasswordResetSyncService.instance = new PasswordResetSyncService()
    }
    return PasswordResetSyncService.instance
  }

  /**
   * Inicia el servicio de sincronización
   */
  public start(): void {
    this.loadUserStates()
    this.startAuthListener()
  }

  /**
   * Detiene el servicio
   */
  public stop(): void {
    if (this.unsubscribe) {
      this.unsubscribe()
      this.unsubscribe = null
    }
  }

  /**
   * Carga los estados conocidos de usuarios desde localStorage
   */
  private loadUserStates(): void {
    try {
      const saved = localStorage.getItem('firebase_user_states')
      if (saved) {
        const parsed = JSON.parse(saved)
        this.lastKnownUsers = new Map(parsed)
      }
    } catch (error) {
      console.warn('Error loading user states:', error)
    }
  }

  /**
   * Guarda los estados de usuarios en localStorage
   */
  private saveUserStates(): void {
    try {
      const data = Array.from(this.lastKnownUsers.entries())
      localStorage.setItem('firebase_user_states', JSON.stringify(data))
    } catch (error) {
      console.warn('Error saving user states:', error)
    }
  }

  /**
   * Inicia el listener de cambios de autenticación
   */
  private startAuthListener(): void {
    this.unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await this.checkForPasswordReset(user)
      }
    })
  }

  /**
   * Verifica si hubo un restablecimiento de contraseña
   */
  private async checkForPasswordReset(user: FirebaseUser): Promise<void> {
    try {
      const uid = user.uid
      const currentLastSignIn = user.metadata.lastSignInTime
      const email = user.email!

      // Obtener el último estado conocido
      const lastKnownState = this.lastKnownUsers.get(uid)

      if (lastKnownState && currentLastSignIn) {
        const lastKnownSignIn = new Date(lastKnownState.lastSignIn)
        const currentSignIn = new Date(currentLastSignIn)

        // Si el último inicio de sesión es posterior al conocido
        // y la diferencia es mayor a 1 minuto (para evitar falsos positivos)
        if (currentSignIn > lastKnownSignIn) {
          const timeDiff = currentSignIn.getTime() - lastKnownSignIn.getTime()

          // Si han pasado más de 1 minuto desde el último inicio conocido
          if (timeDiff > 60000) {
            console.log('Posible restablecimiento de contraseña detectado:', email)
            await this.syncPasswordResetToDatabase(uid, email)
          }
        }
      }

      // Actualizar el estado conocido
      this.lastKnownUsers.set(uid, {
        lastSignIn: currentLastSignIn || new Date().toISOString(),
        email: email
      })

      this.saveUserStates()
    } catch (error) {
      console.error('Error checking password reset:', error)
    }
  }

  /**
   * Sincroniza el restablecimiento con la base de datos
   */
  private async syncPasswordResetToDatabase(uid: string, email: string): Promise<void> {
    try {
      await axios.patch(`${API_URL}/usuario/${uid}/password-reset`, {
        passwordResetAt: new Date().toISOString(),
        email: email,
        source: 'password_reset_link'
      })

      console.log('✅ Restablecimiento sincronizado con BD:', email)
    } catch (error) {
      console.error('❌ Error al sincronizar restablecimiento:', error)
    }
  }

  /**
   * Fuerza una sincronización manual (útil para testing)
   */
  public async forceSyncForCurrentUser(): Promise<void> {
    const user = auth.currentUser
    if (user) {
      await this.syncPasswordResetToDatabase(user.uid, user.email!)
    }
  }
}

// Instancia singleton
export const passwordResetSyncService = PasswordResetSyncService.getInstance()

// Auto-inicializar el servicio cuando se importa
passwordResetSyncService.start()
