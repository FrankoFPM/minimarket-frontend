import { updatePassword, updateEmail, updateProfile, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import { auth } from '~/firebase/firebaseConfig'
import { handleFirebaseError } from '~/utils/errorHandling'

export interface CredentialUpdateData {
  currentPassword?: string
  newPassword?: string
  newEmail?: string
  newDisplayName?: string
}

/**
 * Actualiza las credenciales del usuario actualmente autenticado
 * Solo el usuario puede actualizar sus propias credenciales por seguridad
 */
export const updateUserCredentials = async (
  updateData: CredentialUpdateData,
  currentPassword: string
): Promise<void> => {
  const user = auth.currentUser

  if (!user) {
    throw new Error('No hay usuario autenticado')
  }

  try {
    // 1. Re-autenticar al usuario por seguridad
    const credential = EmailAuthProvider.credential(user.email!, currentPassword)
    await reauthenticateWithCredential(user, credential)

    // 2. Actualizar email si se proporciona
    if (updateData.newEmail && updateData.newEmail !== user.email) {
      await updateEmail(user, updateData.newEmail)
    }

    // 3. Actualizar contraseña si se proporciona
    if (updateData.newPassword) {
      await updatePassword(user, updateData.newPassword)
    }

    // 4. Actualizar nombre de display si se proporciona
    if (updateData.newDisplayName) {
      await updateProfile(user, { displayName: updateData.newDisplayName })
    }

    console.log('Credenciales actualizadas exitosamente')
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'code' in error) {
      const firebaseErrorMessage = handleFirebaseError(error)
      throw new Error(firebaseErrorMessage)
    }
    throw new Error('Error al actualizar credenciales')
  }
}

/**
 * Verifica si un usuario puede actualizar sus propias credenciales
 * (está autenticado y es el mismo usuario)
 */
export const canUpdateOwnCredentials = (userId: string): boolean => {
  const currentUser = auth.currentUser
  return currentUser !== null && currentUser.uid === userId
}

/**
 * Envía email para restablecer contraseña
 * Útil para cuando un admin necesita que un usuario cambie su contraseña
 */
export const sendPasswordResetEmail = async (email: string): Promise<void> => {
  const { sendPasswordResetEmail } = await import('firebase/auth')

  try {
    await sendPasswordResetEmail(auth, email)
    console.log('Email de restablecimiento enviado a:', email)
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'code' in error) {
      const firebaseErrorMessage = handleFirebaseError(error)
      throw new Error(firebaseErrorMessage)
    }
    throw new Error('Error al enviar email de restablecimiento')
  }
}
