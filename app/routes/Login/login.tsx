import { Link } from 'react-router'
import { InputField } from '../../Components/FormComponent'
import { ThemeToggle } from '~/Components/UiComponentes'
import { useForm } from 'react-hook-form'

/**
 * Componente principal para la página de inicio de sesión.
 * Contiene el formulario de inicio de sesión y elementos de diseño.
 */
const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  interface FormData {
    email: string;
    password: string;
  }

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(errors)
  }

  return (
    <div className="h-screen w-screen flex bg-background justify-center items-center">
      <div className="absolute xl:w-[60rem] xl:h-[40rem] md:w-1/2 sm:w-full w-full h-screen flex items-center justify-center shadow-foreground/30 shadow-lg">
        {/* Sección izquierda: Información de bienvenida */}
        <div className="w-1/2 h-full hidden bg-primary-2 xl:flex flex-col items-center justify-center px-8">
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
        <div className="xl:w-1/2 h-full bg-background flex flex-col justify-center items-center gap-5">
          <h1 className="text-2xl font-semibold text-foreground uppercase">
            Iniciar sesión
          </h1>
          <form className="w-full bg-background flex flex-col justify-center items-center gap-5 px-20" onSubmit={handleSubmit(onSubmit)}>
            {/* Campo de entrada para el usuario */}
            <InputField
              label="Email"
              placeholder="example@example.com"
              type="email"
              {...register('email', {required: 'Debe ingresar su email',
                pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Email no válido' } })}
              error={errors.email?.message}
            />

            {/* Campo de entrada para la contraseña */}
            <InputField
              label="Contraseña"
              placeholder="Ingrese su contraseña"
              type="password"
              {...register('password', { required: 'Debe ingresar su contraseña' })}
              error={errors.password?.message}
            />

            {/* Botón de inicio de sesión */}
            <button type="submit" className={'btn-success'}>
              Iniciar sesión
            </button>

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

export default Login