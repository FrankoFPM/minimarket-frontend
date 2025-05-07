import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router'
import { InputField } from '~/Components/FormComponent'
import { ThemeToggle } from '~/Components/UiComponentes'

export function HeaderShop() {
  return (
    <header className="bg-primary-1 shadow-md p-4">
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
            <FaSearch size={25} className='text-background' /></div>}
          className='rounded-4xl'
        />
        <nav className="flex gap-4 items-center min-w-fit">
          <div id='relative-group' className="relative group">
            {/* Botón de usuario */}
            <div className="text-gray-700 hover:opacity-80 min-w-fit cursor-pointer">
              <div className='flex items-center gap-2'>
                <AiOutlineUser size={35} className='text-background' />
                <div className='text-sm text-background'>
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
                  <Link to="/register" className="flex items-center py-2 justify-center rounded-md text-foreground font-semiboldtext-md hover:opacity-80 hover:bg-background">
                  Regístrate
                  </Link>
                </li>
                <li className='border-b border-primary-1 my-2'></li>
                <li>
                  <Link to="/pedidos" className="flex flex-row items-center justify-start gap-4 px-4 py-2 rounded-md text-foreground hover:opacity-80 hover:bg-background">
                    <AiOutlineShoppingCart size={35} />Mis Pedidos
                  </Link>
                </li>
                <li>
                  <Link to="/logout" className="flex items-center justify-start gap-4 px-4 py-2 rounded-md text-foreground hover:opacity-80 hover:bg-background">
                    {/* <AiOutlineUser size={35} />Mi Cuenta */}
                    <AiOutlineLogout size={35} />Cerrar Sesión
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Link to="/carrito" className="hover:opacity-80 text-background">
            <div className="flex items-center gap-2">
              <AiOutlineShoppingCart size={35} className='text-background' />
              <div className="flex flex-col text-sm text-background font-bold">
                <span className='inline-block px-2 w-fit h-5 bg-secondary text-center rounded-full font-bold text-foreground'>0</span>
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
    </header>
  )
}

export function FooterShop() {
  return (
    <footer className="bg-white shadow-md p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-gray-700">© 2025 Mi Tienda. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}