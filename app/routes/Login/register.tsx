import { Link } from 'react-router'
import { InputField } from '~/Components/FormComponent'
import { ThemeToggle } from '~/Components/UiComponentes'
import { useForm } from 'react-hook-form'

const Register = () => {

  const { register, handleSubmit, formState: { errors }, getValues } = useForm<FormData>()
  interface FormData {
    nombres: string;
    apellidos: string;
    telefono: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(errors)
  }

  return (
    <div className="h-screen w-screen flex bg-background justify-center items-center">
      <div className="absolute lg:w-full xl:w-[65rem] xl:h-[90%] xl:max-h-[40rem] xl:rounded-2xl overflow-hidden w-full h-screen flex items-center justify-center shadow-foreground/30 xl:shadow-lg">
        {/* Sección izquierda: Información de bienvenida */}
        <div className="w-1/2 h-full hidden bg-primary-2 lg:flex flex-col items-center justify-center px-8">
          <h1 className="w-full text-3xl font-bold uppercase text-foreground text-center">
                Minimarket
          </h1>

          <div className="w-40 h-40 bg-primary-2 rounded-2xl flex justify-center items-center my-9">
            <img src="/logoM.png" alt="Logo Minimarket" className="logo" />
          </div>

          <h2 className="text-xl font-semibold text-foreground text-center mb-4">
                ¡Bienvenido!
          </h2>

          <p className="text-foreground text-center text-sm leading-relaxed max-w-xs">
                Compra rápido, seguro y al mejor precio. Ingresa para descubrir ofertas exclusivas y productos esenciales para tu día a día.
          </p>
        </div>

        {/* Sección derecha: Formulario de inicio de sesión */}
        <div className="w-full lg:w-1/2 h-full bg-secondary flex flex-col justify-center items-center gap-5">
          <h1 className="text-2xl font-semibold text-foreground uppercase">
                Registrarse
          </h1>
          <form className="w-full lg:grid lg:grid-cols-2 gap-5 px-5 sm:px-10 lg:px-20" onSubmit={handleSubmit(onSubmit)}>
            {/* Campo de entrada para el usuario */}
            <InputField
              label="Nombre"
              placeholder="Ingrese sus nombres"
              type="text"
              {...register('nombres',{required: 'Debe ingresar su nombre'})}
              error={errors.nombres?.message}
              className='rounded-md'
            />
            <InputField
              label="Apellido"
              placeholder="Ingrese sus apellidos"
              type="text"
              {...register('apellidos', { required: 'Debe ingresar su apellido' })}
              error={errors.apellidos?.message}
              className='rounded-md'
            />
            <InputField
              label="Telefono"
              placeholder="Ingrese su telefono"
              type="number"
              {...register('telefono', {
                required: 'Debe ingresar su telefono',
                pattern: { value: /^[0-9]+$/, message: 'Solo se permiten números' }
              })}
              error={errors.telefono?.message}
              className='rounded-md'
            />
            <InputField
              label="Email"
              placeholder="Ingrese su correo"
              type="email"
              {...register('email', {
                required: 'Debe ingresar su correo',
                pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: 'Correo no válido' }
              })}
              error={errors.email?.message}
              className='rounded-md'
            />
            {/* Campo de entrada para la contraseña */}
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

            {/* Botón de registro */}
            <button type="submit" className={'btn-success col-span-2'}>
              Registrarse
            </button>

            {/* Enlaces adicionales */}
            <div className="flex flex-col items-center justify-center gap-2 text-foreground col-span-2">
              <p className="text-foreground font-medium flex gap-1">
                    ¿Ya tienes una cuenta?
                <Link to="/login" className="text-blue-700 hover:underline dark:text-blue-500">
                      Iniciar sesión
                </Link>
              </p>
            </div>
          </form>
          {/* Botón para alternar entre temas */}
          <div className='absolute bottom-20'>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
