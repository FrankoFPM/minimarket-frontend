// Ejemplo de cómo integrar la actualización de credenciales en tu modal existente

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputField, SelectInput } from '~/Components/FormComponent'
import { updateUserWithCredentials, type UserUpdateData } from '~/services/usuarioService'
import { canUpdateOwnCredentials } from '~/services/userCredentialService'
import { addToast } from '@heroui/react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox } from '@heroui/react'
import type { User } from '~/Types/Usuario'

interface UserModalUpdateProps {
  isOpen: boolean
  onClose: () => void
  user: User
  onUserUpdated: (user: User) => void
}

// Formulario extendido que incluye campos de credenciales
interface UserUpdateFormData extends UserUpdateData {
  updateCredentials: boolean
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export const UserModalUpdate = ({ isOpen, onClose, user, onUserUpdated }: UserModalUpdateProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, getValues, watch } = useForm<UserUpdateFormData>({
    defaultValues: {
      ...user,
      updateCredentials: false,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const watchUpdateCredentials = watch('updateCredentials')
  const canUpdateOwn = canUpdateOwnCredentials(user.id)

  const onSubmit = async (data: UserUpdateFormData) => {
    setIsLoading(true)
    try {
      // Preparar datos para actualización
      const updateData: UserUpdateData = {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        telefono: data.telefono,
        direccion: data.direccion,
        distritoId: data.distritoId,
        distritoNombre: '', // Se actualizará en el backend
        estado: data.estado,
        rol: data.rol,
        password: data.password || '' // Mantener contraseña existente si no se cambia
      }

      // Agregar credenciales si se van a actualizar
      if (data.updateCredentials) {
        updateData.currentPassword = data.currentPassword
        updateData.newPassword = data.newPassword
      }

      const updatedUser = await updateUserWithCredentials(user.id, updateData)

      addToast({
        title: 'Usuario actualizado',
        description: `${updatedUser.nombre} ${updatedUser.apellido} se actualizó exitosamente.`,
        color: 'success',
        shouldShowTimeoutProgress: true,
      })

      onUserUpdated(updatedUser)
      onClose()
    } catch (error) {
      console.error('Error al actualizar usuario:', error)
      addToast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Error al actualizar usuario.',
        color: 'danger',
        shouldShowTimeoutProgress: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>
          <h2 className="text-xl font-semibold">Actualizar Usuario</h2>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Nombre"
                {...register('nombre', { required: 'El nombre es requerido' })}
                error={errors.nombre?.message}
              />
              <InputField
                label="Apellido"
                {...register('apellido', { required: 'El apellido es requerido' })}
                error={errors.apellido?.message}
              />
              <InputField
                label="Email"
                type="email"
                {...register('email', { required: 'El email es requerido' })}
                error={errors.email?.message}
              />
              <InputField
                label="Teléfono"
                {...register('telefono', { required: 'El teléfono es requerido' })}
                error={errors.telefono?.message}
              />
              <InputField
                label="Dirección"
                {...register('direccion', { required: 'La dirección es requerida' })}
                error={errors.direccion?.message}
              />
              <SelectInput
                label="Distrito"
                {...register('distritoId', { required: 'El distrito es requerido' })}
                error={errors.distritoId?.message}
              >
                <option value="">Seleccione un distrito</option>
                {/* Aquí irían las opciones dinámicas de distrito */}
              </SelectInput>
              <SelectInput
                label="Estado"
                {...register('estado', { required: 'El estado es requerido' })}
                error={errors.estado?.message}
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </SelectInput>
              <SelectInput
                label="Rol"
                {...register('rol', { required: 'El rol es requerido' })}
                error={errors.rol?.message}
              >
                <option value="cliente">Cliente</option>
                <option value="admin">Admin</option>
                <option value="almacenista">Almacenista</option>
                <option value="recepcion">Recepción</option>
              </SelectInput>
            </div>

            {/* Sección de credenciales */}
            <div className="border-t pt-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  {...register('updateCredentials')}
                  isSelected={watchUpdateCredentials}
                >
                  Actualizar credenciales de acceso
                </Checkbox>
                {!canUpdateOwn && (
                  <span className="text-sm text-yellow-600">
                    (Se enviará email de restablecimiento)
                  </span>
                )}
              </div>

              {watchUpdateCredentials && canUpdateOwn && (
                <div className="mt-4 space-y-4 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900">Credenciales de Firebase</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputField
                      label="Contraseña Actual"
                      type="password"
                      {...register('currentPassword', {
                        required: watchUpdateCredentials ? 'La contraseña actual es requerida' : false
                      })}
                      error={errors.currentPassword?.message}
                    />
                    <InputField
                      label="Nueva Contraseña"
                      type="password"
                      {...register('newPassword', {
                        required: watchUpdateCredentials ? 'La nueva contraseña es requerida' : false,
                        minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                      })}
                      error={errors.newPassword?.message}
                    />
                    <InputField
                      label="Confirmar Nueva Contraseña"
                      type="password"
                      {...register('confirmPassword', {
                        required: watchUpdateCredentials ? 'Confirme la nueva contraseña' : false,
                        validate: (value) => {
                          if (!watchUpdateCredentials) return true
                          return value === getValues('newPassword') || 'Las contraseñas no coinciden'
                        }
                      })}
                      error={errors.confirmPassword?.message}
                    />
                  </div>
                </div>
              )}
            </div>
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
            Actualizar Usuario
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
