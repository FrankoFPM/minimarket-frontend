import { Link } from 'react-router'
import { InputField } from '~/Components/FormComponent'
import { ThemeToggle } from '~/Components/UiComponentes'

const Register = () => {

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
        <div className="xl:w-5/6 h-full bg-background flex flex-col justify-center items-center gap-5">
          <h1 className="text-2xl font-semibold text-foreground uppercase">
                Registrarse
          </h1>
          <form className="w-full bg-background grid grid-cols-2 gap-5 px-20">
            {/* Campo de entrada para el usuario */}
            <InputField label="Nombre" placeholder="Ingrese sus nombres" type="text" />
            <InputField label="Apellido" placeholder="Ingrese sus apellidos" type="text" />
            <InputField label="Telefono" placeholder="Ingrese su telefono" type="number" />
            <InputField label="Email" placeholder="Ingrese su correo" type="email" />

            {/* Campo de entrada para la contraseña */}
            <InputField label="Contraseña" placeholder="Contraseña" type="password" />
            <InputField label="Confirmar Contraseña" placeholder="Confirmar contraseña" type="password" />

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
