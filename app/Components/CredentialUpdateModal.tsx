import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputField } from '~/Components/FormComponent'
import { addToast } from '@heroui/react'
import { updateUserCredentials } from '~/services/userCredentialService'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react'

interface CredentialUpdateFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

interface CredentialUpdateModalProps {
  isOpen: boolean
  onClose: () => void
  userEmail: string
  userName: string
}

export const CredentialUpdateModal = ({ isOpen, onClose, userEmail, userName }: CredentialUpdateModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm<CredentialUpdateFormData>()

  const onSubmit = async (data: CredentialUpdateFormData) => {
    setIsLoading(true)
    try {
      await updateUserCredentials(
        {
          newPassword: data.newPassword,
          newDisplayName: userName
        },
        data.currentPassword
      )

      addToast({
        title: 'Credenciales actualizadas',
        description: 'Las credenciales se actualizaron exitosamente.',
        color: 'success',
        shouldShowTimeoutProgress: true,
      })

      reset()
      onClose()
    } catch (error) {
      console.error('Error al actualizar credenciales:', error)
      addToast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Error al actualizar credenciales.',
        color: 'danger',
        shouldShowTimeoutProgress: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Actualizar Credenciales</h2>
          <p className="text-sm text-gray-600">Usuario: {userEmail}</p>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Importante:</strong> Solo puedes actualizar las credenciales de tu propia cuenta.
                    Para otros usuarios, se enviará un email de restablecimiento.
                  </p>
                </div>
              </div>
            </div>

            <InputField
              label="Contraseña Actual"
              type="password"
              placeholder="Ingresa tu contraseña actual"
              {...register('currentPassword', {
                required: 'La contraseña actual es requerida'
              })}
              error={errors.currentPassword?.message}
            />

            <InputField
              label="Nueva Contraseña"
              type="password"
              placeholder="Ingresa la nueva contraseña"
              {...register('newPassword', {
                required: 'La nueva contraseña es requerida',
                minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' }
              })}
              error={errors.newPassword?.message}
            />

            <InputField
              label="Confirmar Nueva Contraseña"
              type="password"
              placeholder="Confirma la nueva contraseña"
              {...register('confirmPassword', {
                required: 'Debe confirmar la nueva contraseña',
                validate: (value) => value === getValues('newPassword') || 'Las contraseñas no coinciden'
              })}
              error={errors.confirmPassword?.message}
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancelar
          </Button>
          <Button
            color="primary"
            onClick={handleSubmit(onSubmit)}
            isLoading={isLoading}
            disabled={isLoading}
          >
            Actualizar Credenciales
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
