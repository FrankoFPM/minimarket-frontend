import { AiOutlineShoppingCart } from 'react-icons/ai'
import { CiUser } from 'react-icons/ci'
import { Link } from 'react-router'

export function HeaderShop() {
  return (
    <header className="bg-background shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">La Caserita</h1>
        <nav className="flex space-x-4">
          <Link to="/perfil" className="text-gray-700 hover:opacity-80">
            <div>

              <CiUser size={35} />
            </div>

          </Link>
          <Link to="/carrito" className="text-gray-700 hover:text-blue-500"><AiOutlineShoppingCart size={35} /></Link>
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