import { Link, useNavigate } from 'react-router'
import { InputField } from '../../Components/FormComponent'
import { useForm } from 'react-hook-form'
import { authenticateUser } from '~/services/authService'
import { LoginSocial, LoginWithEmail } from '~/services/firebaseAuth'

/**
 * Componente principal para la página de inicio de sesión.
 * Contiene el formulario de inicio de sesión y elementos de diseño.
 */
export default function Login() {
  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm<FormData>({criteriaMode: 'all'})
  const navigate = useNavigate()
  interface FormData {
    email: string;
    password: string;
  }

  function error(){
    console.log('Credenciales incorrectas')
    setError('email', { type: 'manual', message: 'Credenciales incorrectas' })
    setError('password', { type: 'manual', message: 'Credenciales incorrectas' })
  }

  const onSubmit = async (data: FormData) => {
    console.log('Datos enviados:', data)
    const { email, password } = data
    if(!email || !password) {
      return
    }

    try {
      const isAuthenticated = await authenticateUser(email, password)
      console.log('Autenticación exitosa:', isAuthenticated)
      if (isAuthenticated) {
        LoginWithEmail(email, password, navigate)
      }else {
        error()
      }

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error al autenticar:', error.message)
      } else {
        console.error('Error desconocido:', error)
      }

    }

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
            Iniciar sesión
          </h1>
          <div className="w-full max-w-[30rem] px-5 sm:px-10 lg:px-20">
            <form className="w-full flex flex-col justify-center items-center gap-5 mb-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Campo de entrada para el usuario */}
              <InputField
                label="Email"
                placeholder="example@example.com"
                type="email"
                {...register('email', {required: 'Debe ingresar su email',
                  pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Email no válido' } })}
                error={errors.email?.message}
                className='rounded-md'
                onChange={() => {
                  clearErrors('email')
                }}
              />

              {/* Campo de entrada para la contraseña */}
              <InputField
                label="Contraseña"
                placeholder="Ingrese su contraseña"
                type="password"
                {...register('password', { required: 'Debe ingresar su contraseña' })}
                error={errors.password?.message}
                className='rounded-md'
              />

              {/* Botón de inicio de sesión */}
              <button type="submit" className={'btn-success'}>
              Iniciar sesión
              </button>
            </form>
            {/* Contenedor para inicio de sesión con OAuth */}
            <div className="flex flex-col items-center justify-center gap-5 w-full">
              <span className='relative w-full border-b-1 border-foreground after:content-["o"] after:bg-secondary after:w-7 after:h-5 after:text-xl after:text-foreground after:absolute after:inset-0 after:-translate-y-3.5 after:-translate-x-1/2 after:left-1/2 after:text-center' />
              <LoginSocial />
            </div>

            {/* Enlaces adicionales */}
            <div className="flex flex-col items-center justify-center mt-2 gap-2 text-foreground">
              <Link to="/forgot-password" className="text-blue-700 hover:underline dark:text-blue-500">
                Olvidaste tu contraseña?
              </Link>
              <p className="text-foreground font-medium flex gap-1">
                ¿No tienes una cuenta?
                <Link to="/register" className="text-blue-700 hover:underline dark:text-blue-500">
                  Registrarse
                </Link>
              </p>
              {/* Opción para entrar como invitado */}
              <Link to="/" className="text-primary-1 hover:underline font-semibold">
    Entrar como invitado
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
