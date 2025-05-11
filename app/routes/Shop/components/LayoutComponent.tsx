import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineLogout, AiOutlineInfoCircle } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router'
import { InputField } from '~/Components/FormComponent'
import { ThemeToggle } from '~/Components/UiComponentes'

export function HeaderShop() {

  return (
    <header className="stuck">
      <div className={'stuck-child p-4 sticky transition-colors top-0 w-full'}>
        <div className="container mx-auto flex justify-between items-center gap-5">
          <div
            className="min-w-fit relative before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-background"
          >
            <img
              src="/images/Logo.webp"
              alt="logo la caserita"
              width={180}
              className='relative z-10 drop-shadow-sm drop-shadow-foreground/20'
            />
          </div>
          <InputField
            type='text'
            placeholder='Buscar productos...'
            afterElement={<div className='flex items-center justify-center w-16 h-9 bg-primary-1 rounded-4xl mr-1 cursor-pointer'>
              <FaSearch size={25} /></div>}
            className='rounded-4xl'
          />
          <nav className="flex gap-4 items-center min-w-fit">
            <div id='relative-group' className="relative group">
              {/* Botón de usuario */}
              <div className="hover:opacity-80 min-w-fit cursor-pointer">
                <div className='flex items-center gap-2'>
                  <AiOutlineUser size={35}/>
                  <div className='text-sm'>
                ¡Bienvenido!
                    <p className='font-bold'>Identifícate / Regístrate</p>
                  </div>
                </div>
              </div>
              {/* Menú desplegable */}
              <div className="absolute right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                {/* Espina del menú */}
                <div className="absolute right-4 w-3 h-3 top-3 bg-secondary rotate-45"></div>
                <ul className="py-4 z-10 mt-4 bg-secondary shadow-xl rounded-md  px-2">
                  <li>
                    <Link to="/login" className="flex items-center w-60 justify-center rounded-3xl px-4 py-2 btn-success font-bold text-xl">
                  Identifícate
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="flex items-center py-2 justify-center rounded-md text-foreground font-semibold text-md hover:opacity-80 hover:bg-background">
                  Regístrate
                    </Link>
                  </li>
                  <li className='border-b border-primary-1 my-2'></li>
                  <li>
                    <Link to="/pedidos" className="flex flex-row items-center justify-start gap-4 px-4 py-2 rounded-md text-foreground hover:opacity-80 hover:bg-background">
                      <AiOutlineShoppingCart size={25} />Mis Pedidos
                    </Link>
                  </li>
                  <li>
                    <Link to="/logout" className="flex items-center justify-start gap-4 px-4 py-2 rounded-md text-foreground hover:opacity-80 hover:bg-background">
                      <AiOutlineLogout size={25} />Cerrar Sesión
                    </Link>
                  </li>
                  <li className='border-b border-primary-1 my-2'></li>
                  <li>
                    <Link to="/nosotros" className="flex items-center justify-start gap-4 px-4 py-2 rounded-md text-foreground hover:opacity-80 hover:bg-background">
                      <AiOutlineInfoCircle size={25} />Nosotros
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <Link to="/carrito" className="hover:opacity-80">
              <div className="flex items-center gap-2">
                <AiOutlineShoppingCart size={35} />
                <div className="flex flex-col text-sm font-bold">
                  <span className={'stuck-span inline-block px-2 w-fit h-5 text-center rounded-full font-bold' }>0</span>
                Carrito
                </div>
              </div>
            </Link>

            <div className='w-16 flex justify-center items-center'>
              <ThemeToggle />
            </div>
          </nav>
        </div>
        {/* Aqui estaran las categorias generales*/}
        <div>

        </div>
      </div>
    </header>
  )
}

export function FooterShop() {
  return (
    <footer className="bg-secondary text-foreground shadow-md mt-auto">
      <div className='container mx-auto p-4'>
        <div className='flex flex-row justify-evenly items-center'>
          <p className='inline-block text-2xl'>Suscríbete y disfruta de nuestras ofertas más destacadas</p>
          <div className="flex justify-center items-center w-1/2">
            <form action="" className='w-full'>
              <InputField
                type='email'
                placeholder='Ingresa tu correo electrónico'
                className='rounded-4xl'
                afterElement={<button className="mx-0.5 bg-primary-1 text-white rounded-4xl px-4 py-2 hover:bg-primary-2">
              Suscribirse
                </button>}
              />
              <div className="flex items-center justify-center mt-2">
                <input type="checkbox" id="terms" className="mr-2 accent-primary-1" />
                <label htmlFor="terms" className="text-sm">Acepto los <Link to="/terminos" className="text-primary-1 hover:underline">términos y condiciones</Link></label>
              </div>
            </form>
          </div>
        </div>
        <div className='h-2 bg-primary-1 container my-4'></div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4'>
          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-bold'>Información</h3>
            <ul className='flex flex-col gap-1'>
              <li><Link to="/nosotros" className="hover:underline">Nosotros</Link></li>
              <li><Link to="/contacto" className="hover:underline">Contacto</Link></li>
              <li><Link to="/politicas" className="hover:underline">Políticas de privacidad</Link></li>
              <li><Link to="/terminos" className="hover:underline">Términos y condiciones</Link></li>
            </ul>
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-bold'>Redes Sociales</h3>
            <ul className='flex flex-col gap-1'>
              <li><a href="#" className="hover:underline">Facebook</a></li>
              <li><a href="#" className="hover:underline">Instagram</a></li>
              <li><a href="#" className="hover:underline">Twitter</a></li>
            </ul>
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-bold'>Contáctanos</h3>
            <p>Teléfono: +51 123 456 7890</p>
            <p>Email: example@example.com </p>
            <p>Dirección: Av. Ejemplo 123, Ciudad</p>
          </div>

        </div>

      </div>
      <div className="mx-auto bg-primary-1 w-full h-10 flex justify-center items-center">
        <p className="text-foreground text-lg text-center">© 2025 Minimarket la caserita. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}