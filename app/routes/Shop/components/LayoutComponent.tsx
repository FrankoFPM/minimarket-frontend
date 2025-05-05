import { AiOutlineShoppingCart } from 'react-icons/ai'
import { CiUser } from 'react-icons/ci'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router'
import { InputField } from '~/Components/FormComponent'
import { ThemeToggle } from '~/Components/UiComponentes'

export function HeaderShop() {
  return (
    <header className="bg-background shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center gap-5">
        <img src="/images/Logo.webp" alt="logo la caserita" width={150} />
        <InputField
          type='text'
          placeholder='Buscar productos...'
          afterElement={<div className='flex items-center justify-center w-16 h-9 bg-primary-1 rounded-l-4xl rounded-r-md'>
            <FaSearch size={25} className='text-background' /></div>}
        />
        <nav className="flex gap-4 items-center">
          <Link to="/perfil" className="text-gray-700 hover:opacity-80">
            <div>
              <CiUser size={35} className='text-foreground hover:text-primary-1' />
            </div>

          </Link>
          <Link to="/carrito" className="hover:text-primary-1 text-foreground"><AiOutlineShoppingCart size={35} /></Link>
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