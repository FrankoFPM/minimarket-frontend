import { addToast, Button, useDisclosure } from '@heroui/react'
import { InputField, SelectInput } from '~/Components/FormComponent'
import { ModalBase } from '../Components/ModalBase'
import { useDistritos } from '~/hooks/useCatalogos'
import { useForm } from 'react-hook-form'
import { createUser } from '~/services/usuarioService'

export function AdminModalAdd({onSuccess}: { onSuccess: () => void }) {
  const addModal = useDisclosure()
  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm<FormData>()

  const { distritos, loadingDistritos } = useDistritos()

    interface FormData {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    direccion: string;
    distritoId: number;
    password: string;
    confirmPassword: string;
    rol: string;
  }

    const onSubmit = async (data: FormData) => {
      try {
        console.log('Datos del nuevo usuario:', data)
        await createUser({
          ...data,
          estado: 'activo',
          id: '', // El ID se asignará automáticamente por Firebase
        })

        addModal.onClose()
        onSuccess()
        reset()
        addToast({
          title: 'Éxito',
          description: 'Usuario creado exitosamente.',
          color: 'success',
          shouldShowTimeoutProgress: true,
        })
      } catch (error) {
        console.error('Error al crear el usuario:', error)
      }}

    return(
      <>
        <Button
          color="success"
          className="w-fit ml-auto"
          onPress={addModal.onOpen}
        >
        Agregar nuevo usuario
        </Button>

        <ModalBase
          isOpen={addModal.isOpen}
          onClose={
            () => {
              addModal.onClose()
              reset()
            }
          }
          title="Agregar usuario"
          footer={
            <>
              <Button color="danger" onPress={addModal.onClose}>
            Cerrar
              </Button>
              <Button color="success" form='userForm' type='submit' >
            Guardar
              </Button>
            </>
          }
        >
          <form id='userForm' onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label="Nombre"
              type="text"
              placeholder="Ingrese los nombres del usuario"
              {...register('nombre', { required: 'El nombre es obligatorio' })}
              error={errors.nombre?.message}
              className='rounded-md'
            />
            <InputField
              label="Apellido"
              type="text"
              placeholder="Ingrese los apellidos del usuario"
              {...register('apellido', { required: 'El apellido es obligatorio' })}
              error={errors.apellido?.message}
              className='rounded-md'
            />
            <InputField
              label="Teléfono"
              type="text"
              placeholder="Ingrese el teléfono del usuario"
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
            <SelectInput
              label="Rol"
              {...register('rol', {
                required: 'Debe seleccionar un rol',
                validate: value => value !== undefined && value !== null && value !== '' || 'Debe seleccionar un rol'
              })}
              error={errors.rol?.message}
              className='rounded-md'
            >
              <option value="">Seleccione un rol</option>
              <option value="admin">Administrador</option>
              <option value="almacenista">Almacenista</option>
              <option value="recepcion">Recepcion</option>
            </SelectInput>
            <InputField
              label="Contraseña"
              placeholder="Contraseña"
              type="password"
              {...register('password', {
                required: 'Debe ingresar una contraseña',
                minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' }
              })}
              error={errors.password?.message}
              className='rounded-md'
            />
            <InputField
              label="Confirmar Contraseña"
              placeholder="Confirmar contraseña"
              type="password"
              {...register('confirmPassword', {
                required: 'Debe confirmar su contraseña',
                validate: (value) => value === getValues('password') || 'Las contraseñas no coinciden'
              })}
              error={errors.confirmPassword?.message}
              className='rounded-md'
            />
          </form>
        </ModalBase>
      </>
    )
}