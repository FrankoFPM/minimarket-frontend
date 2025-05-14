import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineLogout, AiOutlineInfoCircle } from 'react-icons/ai'
import { FaFacebookF, FaInstagram, FaSearch, FaTiktok, FaTwitter } from 'react-icons/fa'
import { IoCallSharp, IoLocation, IoMail } from 'react-icons/io5'
import { Link } from 'react-router'
import { InputField } from '~/Components/FormComponent'
import { ThemeToggle } from '~/Components/UiComponentes'

export function HeaderShop() {

  return (
    <header className="stuck">
      <div className={'stuck-child p-4 sticky transition-colors duration-400 top-0 w-full'}>
        <div className="container mx-auto flex justify-between items-center gap-5">
          <Link to={'/'}
            className="min-w-fit"
          >
            <img
              src="/images/Logo.webp"
              alt="logo la caserita"
              width={300}
              className='relative z-10 drop-shadow-xs drop-shadow-secondary/50'
            />
          </Link>
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
    <footer className="bg-secondary text-foreground shadow-inner mt-auto border-t border-border">
      <div className="container mx-auto px-4 py-8 space-y-10">

        {/* Sección Suscripción */}
        <div className="bg-primary-1/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-xl md:text-2xl font-semibold text-center md:text-left max-w-md">
            Suscríbete y disfruta de nuestras ofertas más destacadas
          </p>
          <form action="" className="w-full md:w-1/2">
            <InputField
              type='email'
              placeholder='Ingresa tu correo electrónico'
              className='rounded-4xl'
              afterElement={
                <button className="ml-2 bg-primary-1 text-white rounded-4xl px-4 py-2 mr-0.5 hover:bg-primary-2 transition">
                  Suscribirse
                </button>
              }
            />
            <div className="flex items-center mt-2">
              <input type="checkbox" id="terms" className="mr-2 accent-primary-1" />
              <label htmlFor="terms" className="text-sm">Acepto los <Link to="/terminos" className="text-primary-1 hover:underline">términos y condiciones</Link></label>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Información */}
          <div>
            <h3 className="text-lg font-bold mb-2">Información</h3>
            <div className="flex flex-col gap-4 text-sm">
              <div><Link to="/nosotros" className="hover:underline">Nosotros</Link></div>
              <div><Link to="/contacto" className="hover:underline">Contacto</Link></div>
              <div><Link to="/politicas" className="hover:underline">Políticas de privacidad</Link></div>
              <div><Link to="/terminos" className="hover:underline">Términos y condiciones</Link></div>
            </div>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="text-lg font-bold mb-2">Redes Sociales</h3>
            <ul className="flex gap-4 text-xl text-primary-1">
              <li><a href="#" className="block bg-background p-4 rounded-full hover:text-primary-2 transition"><FaFacebookF /></a></li>
              <li><a href="#" className="block bg-background p-4 rounded-full hover:text-primary-2 transition"><FaInstagram /></a></li>
              <li><a href="#" className="block bg-background p-4 rounded-full hover:text-primary-2 transition"><FaTwitter /></a></li>
              <li><a href="#" className="block bg-background p-4 rounded-full hover:text-primary-2 transition"><FaTiktok /></a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-bold mb-2">Contáctanos</h3>
            <div className='flex flex-col gap-4'>
              <p className="text-sm flex gap-2"><IoCallSharp size={20} /> +51 123 456 7890</p>
              <p className="text-sm flex gap-2"><IoMail size={20} /> example@example.com</p>
              <p className="text-sm flex gap-2"><IoLocation size={20} /> Av. Ejemplo 123, Ciudad</p>
            </div>
          </div>

          {/* Mapa */}
          <div>
            <h3 className="text-lg font-bold mb-2">Ubicación</h3>
            <div className="rounded-lg overflow-hidden border border-border">
              <iframe
                title="Ubicación en Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4686.007326530308!2d-77.07277228863234!3d-11.9528898882277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105d1d877f532d7%3A0x8db19fe8e1f40feb!2sUniversidad%20Tecnol%C3%B3gica%20del%20Per%C3%BA!5e1!3m2!1ses!2sus!4v1746998533318!5m2!1ses!2sus"
                width="100%"
                height="150"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer final */}
      <div className="bg-primary-1 text-white text-center py-4">
        <p className="text-sm md:text-base">© 2025 Minimarket La Caserita. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}