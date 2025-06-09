
import { addToast, Button, InputOtp, useDisclosure } from '@heroui/react'
import { TbEdit, TbEye, TbTrash } from 'react-icons/tb'
import { InputField, SelectInput } from '~/Components/FormComponent'
import { ModalBase } from '../Components/ModalBase'
import type { User } from '~/Types/Usuario'
import { useForm } from 'react-hook-form'
import { useDistritos } from '~/hooks/useCatalogos'
import { useEffect, useState } from 'react'
import { deleteUser, updateUser } from '~/services/usuarioService'

interface AdminModalActions {
  user: User;
  onSuccess: () => void;
}

export function AdminModalActions({user, onSuccess}: AdminModalActions){
  const editModal = useDisclosure()
  const viewModal = useDisclosure()
  const deleteModal = useDisclosure()

  // Genera un código OTP aleatorio de 4 dígitos al abrir el modal
  const [otpCode, setOtpCode] = useState('')
  const [otpInput, setOtpInput] = useState('')
  const [canDelete, setCanDelete] = useState(false)
  useEffect(() => {
    if (deleteModal.isOpen) {
      const random = Math.floor(1000 + Math.random() * 9000).toString()
      setOtpCode(random)
      setOtpInput('') // Limpiar input al abrir modal
      setCanDelete(false)
    }
  }, [deleteModal.isOpen])

  useEffect(() => {
    setCanDelete(otpInput === otpCode)
  }, [otpInput, otpCode])

  const handleDelete = async () => {
    try {
      if(!user) return console.error('No se ha seleccionado un usuario para eliminar')
      console.log('Eliminando usuario:', user.id)
      await deleteUser(user.id)
      addToast({
        title: 'Éxito',
        description: `Usuario ${user.nombre} ${user.apellido} eliminado exitosamente.`,
        color: 'success',
        shouldShowTimeoutProgress: true,
      })
      onSuccess()
      deleteModal.onClose()
    } catch (error) {
      console.error('Error al eliminar el usuario:', error)
    }
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

  const { distritos, loadingDistritos } = useDistritos()
  useEffect(() => {
    if(editModal.isOpen) {
      reset({
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        telefono: user.telefono,
        direccion: user.direccion,
        distritoId: user.distritoId,
        password: '' // Dejar en blanco para no cambiar la contraseña
      })
    }
  }, [editModal.isOpen, user, reset])

  interface FormData {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    direccion: string;
    distritoId: number;
    password?: string; // Si se desea cambiar la contraseña
  }

  const onSubmit = async (data: FormData) => {
    try {
      if(!user) return console.error('No se ha seleccionado un usuario para editar')
      console.log('Datos actualizados:', data)

      const payload = {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        telefono: data.telefono,
        direccion: data.direccion,
        distritoId: data.distritoId,
        distritoNombre: user.distritoNombre,
        rol: user.rol,
        estado: user.estado,
      } as Omit<User, 'id' | 'googleId' | 'facebookId' | 'createdAt' | 'updatedAt'> & { password?: string }

      if (typeof data.password === 'string' && data.password.length > 0) {
        (payload as typeof payload & { password: string }).password = data.password
      }

      await updateUser(user.id, payload)

      addToast({
        title: 'Éxito',
        description: `Usuario ${user.nombre} ${user.apellido} actualizado exitosamente.`,
        color: 'success',
        shouldShowTimeoutProgress: true,
      })

      onSuccess()
      editModal.onClose()
    } catch (error) {
      console.error('Error al actualizar el usuario:', error)
    }
  }

  return (
    <>
      <TbEye className="text-blue-400 drop-shadow-xs cursor-pointer" onClick={viewModal.onOpen} />
      <TbEdit className="text-amber-400 drop-shadow-xs cursor-pointer" onClick={editModal.onOpen} />
      <TbTrash className="text-red-600 drop-shadow-xs cursor-pointer" onClick={deleteModal.onOpen} />
      {/* Edit Modal */}
      <ModalBase
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
        title="Editar usuario"
        footer={
          <>
            <Button
              color="danger"
              onPress={editModal.onClose}
            >
              Cerrar
            </Button>
            <Button
              color="success"
              type='submit'
              form='editUserForm'
            >
              Guardar
            </Button>
          </>
          /**
           * Crear inputs para editar los campos del usuario.
           * insert into usuarios (nombre, apellido, email, clave, telefono, id_distrito, direccion, rol)
values ('Franco', 'PM', 'example@example.com', '123456789', '987654321', 1, 'Calle Falsa 123', 'admin');
rol por defecto es cliente, si es admin, entonces rol='admin', el rol es inmutable
           */
        }
      >
        <form id='editUserForm' onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Nombre"
            type="text"
            placeholder="Ingrese los nombres del usuario"
            defaultValue={user.nombre}
            {...register('nombre', { required: 'El nombre es obligatorio' })}
            error={errors.nombre?.message}
            className='rounded-md'
          />
          <InputField
            label="Apellido"
            type="text"
            placeholder="Ingrese los apellidos del usuario"
            defaultValue={user.apellido}
            {...register('apellido', { required: 'El apellido es obligatorio' })}
            error={errors.apellido?.message}
            className='rounded-md'
          />
          <InputField
            label="Teléfono"
            type="text"
            placeholder="Ingrese el teléfono del usuario"
            defaultValue={user.telefono}
            {...register('telefono', {
              required: 'Debe ingresar su teléfono',
              pattern: { value: /^[0-9]+$/, message: 'Solo se permiten números' }
            })}
            error={errors.telefono?.message}
            className='rounded-md'
          />
          <InputField
            label="Email"
            type="email"
            placeholder="Ingrese el email del usuario"
            defaultValue={user.email}
            {...register('email', {
              required: 'Debe ingresar su correo',
              pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: 'Correo no válido' }
            })}
            error={errors.email?.message}
            className='rounded-md'
          />
          <InputField
            label="Dirección"
            type="text"
            placeholder="Ingrese la dirección del usuario"
            defaultValue={user.direccion}
            {...register('direccion', { required: 'La dirección es obligatoria' })}
            error={errors.direccion?.message}
            className='rounded-md'
          />
          <SelectInput
            label="Distrito"
            {...register('distritoId', {
              required: 'Debe seleccionar un distrito',
              validate: value => value !== undefined && value !== null && value !== 0 || 'Debe seleccionar un distrito',
              valueAsNumber: true
            })}
            error={errors.distritoId?.message}
            className='rounded-md'
          >
            <option value="">Seleccione un distrito</option>
            {loadingDistritos ? (
              <option disabled>Cargando distritos...</option>
            ) : (
              distritos.map((distrito) => (
                <option key={distrito.id} value={distrito.id}>{distrito.nombre}</option>
              ))
            )}
          </SelectInput>
          <InputField
            label="Contraseña (opcional)"
            type="password"
            placeholder="Ingrese la nueva contraseña del usuario (dejar en blanco si no desea cambiarla)"
            {...register('password')}
            className='rounded-md'
          />
        </form>
      </ModalBase>
      {/* View Modal */}
      <ModalBase
        isOpen={viewModal.isOpen}
        onClose={viewModal.onClose}
        title="Ver usuario"
        footer={
          <Button color="danger" onPress={viewModal.onClose}>
            Cerrar
          </Button>
        }
      >
        <div className="flex flex-col gap-4">
          <p><strong>ID</strong>: {user.id}</p>
          <p><strong>Nombre</strong>: {user.nombre}</p>
          <p><strong>Apellido</strong>: {user.apellido}</p>
          <p><strong>Email</strong>: {user.email}</p>
          <p><strong>Teléfono</strong>: {user.telefono}</p>
          <p><strong>Distrito</strong>: {user.distritoNombre}</p>
          <p><strong>Dirección</strong>: {user.direccion}</p>
          <p><strong>Rol</strong>: {user.rol}</p>
          <p><strong>Estado</strong>: {user.estado}</p>
        </div>
      </ModalBase>

      {/* Delete Modal */}
      <ModalBase
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        title="Eliminar usuario"
        footer={
          <>
            <Button color="danger" onPress={deleteModal.onClose}>
              Cancelar
            </Button>
            <Button color="success" onPress={handleDelete} isDisabled={!canDelete}>
              Eliminar
            </Button>
          </>
        }
      >
        <p className='text-center'>¿Estás seguro de que deseas eliminar al usuario <strong>{user.nombre} {user.apellido}</strong>?</p>
        <InputOtp
          length={4}
          value={otpInput}
          onValueChange={setOtpInput}
          isInvalid={otpInput.length === 4 && otpInput !== otpCode}
          errorMessage={
            otpInput.length === 4 && otpInput !== otpCode
              ? (
                <span>
          Código incorrecto.<br />
          El código es: <span className="font-mono text-lg text-primary-500 tracking-widest">{otpCode}</span>
                </span>
              )
              : undefined
          }
          description={
            <span>
              Para confirmar, escribe el siguiente código:<br />
              <span className="font-mono text-lg text-primary-500 tracking-widest">{otpCode}</span>
            </span>
          }
          color="success"
          variant="bordered"
          className="mx-auto"
          classNames={{
            base: 'flex flex-col items-center justify-center w-full',
            wrapper: 'flex justify-center gap-2',
            segmentWrapper: 'flex justify-center gap-2',
            segment: [
              'relative',
              'h-12',
              'w-12',
              'border-y',
              'border-r',
              'first:rounded-l-md',
              'first:border-l',
              'last:rounded-r-md',
              'border-default-200',
              'data-[active=true]:border',
              'data-[active=true]:z-20',
              'data-[active=true]:ring-2',
              'data-[active=true]:ring-offset-2',
              'data-[active=true]:ring-offset-background',
              'data-[active=true]:ring-primary-1',
              'text-xl',
              'text-center'
            ],
            description: 'text-center text-base text-gray-700 font-medium mt-2',
            errorMessage: 'text-center',
          }}
        />
      </ModalBase>

    </>
  )
}