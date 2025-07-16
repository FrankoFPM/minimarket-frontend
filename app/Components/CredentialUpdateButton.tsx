import { useState } from 'react'
import { Button } from '@heroui/react'
import { CredentialUpdateModal } from './CredentialUpdateModal'
import { canUpdateOwnCredentials } from '~/services/userCredentialService'
import { sendPasswordResetEmail } from '~/services/userCredentialService'
import { addToast } from '@heroui/react'

interface CredentialUpdateButtonProps {
  userId: string
  userEmail: string
  userName: string
}

export const CredentialUpdateButton = ({ userId, userEmail, userName }: CredentialUpdateButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateCredentials = async () => {
    if (canUpdateOwnCredentials(userId)) {
      // El usuario puede actualizar sus propias credenciales
      setIsModalOpen(true)
    } else {
      // Enviar email de restablecimiento para otros usuarios
      setIsLoading(true)
      try {
        await sendPasswordResetEmail(userEmail)
        addToast({
          title: 'Email enviado',
          description: `Se envió un email de restablecimiento a ${userEmail}`,
          color: 'success',
          shouldShowTimeoutProgress: true,
        })
      } catch (error) {
        console.error('Error al enviar email de restablecimiento:', error)
        addToast({
          title: 'Error',
          description: 'Error al enviar email de restablecimiento.',
          color: 'danger',
          shouldShowTimeoutProgress: true,
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <>
      <Button
        color="warning"
        variant="ghost"
        size="md"
        onPress={handleUpdateCredentials}
        isLoading={isLoading}
        disabled={isLoading}
        className='w-full my-4'
      >
        {canUpdateOwnCredentials(userId) ? 'Actualizar Credenciales' : 'Restablecer Contraseña'}
      </Button>

      <CredentialUpdateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userEmail={userEmail}
        userName={userName}
      />
    </>
  )
}

// Hook para usar en componentes que necesiten verificar permisos
export const useCredentialPermissions = (userId: string) => {
  const canUpdateOwn = canUpdateOwnCredentials(userId)

  return {
    canUpdateOwn,
    requiresPasswordReset: !canUpdateOwn
  }
}
