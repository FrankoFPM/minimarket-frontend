import { FaClock, FaCreditCard, FaShoppingCart, FaTruck } from 'react-icons/fa'
import { FiShoppingBag } from 'react-icons/fi'
import { GiBread, GiFruitBowl, GiSoap } from 'react-icons/gi'
import { Link } from 'react-router'

interface CardProductProps {
  name: string
  price: number
  stars: number
  image: string,
  marca?: string,
  discount?: number,
  src: string
}

export function CardProduct({ name, price, stars, image, marca, discount, src }: CardProductProps) {
  return (
    <Link to={src} className="relative flex flex-col bg-secondary rounded-md hover:shadow-md transition-shadow duration-300 cursor-pointer">
      {discount && discount > 0 ? (
        <span className="absolute bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md right-3 top-3">
              -{Math.round((discount) * 100)}%
        </span>
      ) : ''}

      <picture className='h-fit flex justify-center items-center'>
        <img src={image} alt={name} className="w-auto h-full object-cover rounded-md bg-secondary" />
      </picture>
      <div className='p-4 '>
        <p className='text-foreground/50 font-bold'>{marca}</p>
        <h3 className="text-primary-1 font-semibold text-lg">{name}</h3>
        <div className='flex flex-row justify-start items-center gap-3'>
          <p className="text-primary-1 font-bold text-xl">S/ {(price - price * (discount ?? 0)).toFixed(2)}</p>
          {discount && discount > 0 ? (
            <p className="text-gray-500 text-sm line-through">S/ {price.toFixed(2)}</p>
          ): ''}
        </div>
        <div className="flex items-center mt-2">
          {[...Array(stars)].map((_, index) => (
            <span key={index} className="text-yellow-500">★</span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export function InfoCard({ title, color, icon }: { title: string, color: string, icon?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap flex-col justify-center items-center gap-4 w-28 h-fit group">
      <div className={' h-28 w-28 rounded-full flex justify-center items-center text-gray-600 transition-transform group-hover:scale-x-[-1] ' + color}>
        {icon}
      </div>
      <h3 className="text-foreground font-light text-center">{title}</h3>
    </div>
  )
}

export function BannerHome({ image }: { image: string }) {
  return (
    <div className="w-full bg-accent rounded-lg mb-24 relative xl:h-72">
      {/* --- Vista móvil y tablet hasta <1280px --- */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-6 py-10 xl:hidden">
        {/* Texto + botón */}
        <div className="flex flex-col gap-4 items-center md:items-start w-full md:w-1/2">
          <span className="text-gray-800 font-semibold text-sm md:text-lg text-center bg-yellow-300 px-4 py-2 rounded-full">
            Producto 100% natural
          </span>
          <h2 className="text-white font-semibold text-2xl md:text-3xl text-center md:text-left max-w-sm">
            ¡Compra productos frescos!
          </h2>
          <Link
            to="/shop"
            className="mt-4 px-6 py-3 rounded-full bg-gray-800 text-white font-bold uppercase flex gap-2 w-full md:w-72 items-center justify-center"
          >
            Comprar ahora! <span>|</span> <FiShoppingBag size={20} />
          </Link>
        </div>

        {/* Imagen visible hasta <1280px */}
        <img
          src={image}
          alt="Banner"
          className="w-full md:w-1/2 h-auto max-h-72 object-contain md:object-cover rounded-xl"
        />
      </div>

      {/* --- Vista "god" desde xl (1280px+) --- */}
      <div className="hidden xl:block relative w-full h-72">
        {/* Texto a la izquierda */}
        <div className="flex flex-col w-fit gap-6 absolute top-1/2 -translate-y-1/2 left-28">
          <span className="text-gray-800 font-semibold text-lg text-center w-64 bg-yellow-300 px-6 py-2 rounded-full">
            Producto 100% natural
          </span>
          <h2 className="text-white font-semibold text-3xl text-left text-wrap w-70">
            ¡Compra productos frescos!
          </h2>
        </div>

        {/* Imagen flotando en el centro */}
        <img
          src={image}
          alt="Banner"
          className="absolute w-auto h-72 object-cover right-1/2 translate-x-1/2 top-1/2 -translate-y-20 rounded-xl"
        />

        {/* Botón a la derecha */}
        <Link
          to="/shop"
          className="px-10 py-4 rounded-full bg-gray-800 text-white font-bold uppercase flex gap-2 w-72 items-center justify-center absolute top-1/2 -translate-y-1/2 right-28"
        >
          Comprar ahora! <span>|</span> <FiShoppingBag size={20} />
        </Link>
      </div>
    </div>
  )
}
interface MarqueeProps {
  classname?: string; // Prop para clases adicionales
  children: React.ReactNode; // Prop para aceptar cualquier contenido React
}

export function MarqueeContainer({classname = 'h-16 w-full', children }: MarqueeProps) {
  return (
    <div
      className={`relative overflow-hidden border-y border-gray-300 flex items-center
      before:w-20 before:z-20 before:bg-gradient-to-r before:from-10% before:from-background before:to-transparent before:absolute before:-inset-1
      after:w-20 after:z-20 after:bg-gradient-to-l after:from-10% after:from-background after:to-transparent after:absolute after:ml-auto after:-inset-1 `
    + classname}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {children}
      </div>
    </div>
  )
}

export function Marquee() {
  const mensajes = [
    { texto: 'Productos frescos todos los días', icono: <GiFruitBowl /> },
    { texto: 'Atención rápida y cercana', icono: <FaClock /> },
    { texto: 'Variedad para toda la familia', icono: <FaShoppingCart /> },
    { texto: 'Aceptamos Yape, Plin y tarjetas', icono: <FaCreditCard /> },
    { texto: 'Pan recién horneado cada mañana', icono: <GiBread /> },
    { texto: 'Artículos de limpieza y más', icono: <GiSoap /> },
    { texto: 'Delivery disponible en tu zona', icono: <FaTruck /> },
  ]

  // Duplicamos el contenido para simular scroll infinito
  const contenido = [...mensajes, ...mensajes]

  return (
    <MarqueeContainer>
      {contenido.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-2 text-foreground font-medium text-sm px-6"
        >
          {item.icono}
          <span>{item.texto}</span>
        </div>
      ))}
    </MarqueeContainer>
  )
}

export function MarqueeLogos(){
  const logos = [
    { src: '/images/brands/Coca-Cola-logo.svg', alt: 'Coca-cola' },
    { src: '/images/brands/milo-logo.svg', alt: 'Milo' },
    { src: '/images/brands/Coca-Cola-logo.svg', alt: 'Coca-cola' },
    { src: '/images/brands/milo-logo.svg', alt: 'Milo' },
    { src: '/images/brands/Coca-Cola-logo.svg', alt: 'Coca-cola' },
    { src: '/images/brands/milo-logo.svg', alt: 'Milo' },
    { src: '/images/brands/Coca-Cola-logo.svg', alt: 'Coca-cola' },
    { src: '/images/brands/milo-logo.svg', alt: 'Milo' },
    { src: '/images/brands/Coca-Cola-logo.svg', alt: 'Coca-cola' },
    { src: '/images/brands/milo-logo.svg', alt: 'Milo' },
    { src: '/images/brands/Coca-Cola-logo.svg', alt: 'Coca-cola' },
    { src: '/images/brands/milo-logo.svg', alt: 'Milo' },
    { src: '/images/brands/Coca-Cola-logo.svg', alt: 'Coca-cola' },
    { src: '/images/brands/milo-logo.svg', alt: 'Milo' }
  ]

  const contenido = [...logos, ...logos]
  return (
    <div>
      <div className="flex items-center justify-center mx-5 gap-6 py-4 flex-wrap">
        <div>
          <h6 className="text-foreground font-medium text-center sm:text-left mb-10">
      ¡Disfruta nuestras <span className="text-primary-1">ofertas semanales</span> en productos frescos!
          </h6>
        </div>

        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full text-primary-1 motion-safe:animate-[spin_10s_linear_infinite]"
          >
            <defs>
              <path
                id="circle"
                d="
          M 60, 60
          m -44, 0
          a 44,44 0 1,1 88,0
          a 44,44 0 1,1 -88,0"
              />
            </defs>

            {/* Círculo superior */}
            <circle
              cx="60"
              cy="60"
              r="56"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            />

            {/* Círculo inferior */}
            <circle
              cx="60"
              cy="60"
              r="38"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            />

            {/* Texto circular */}
            <text className="text-[9px] fill-foreground tracking-wide uppercase">
              <textPath href="#circle" startOffset="0%">
        Minimarket Online • Productos frescos • Precios bajos • Atención rápida •
              </textPath>
            </text>
          </svg>
        </div>

        <div>
          <h6 className="text-foreground font-medium text-center sm:text-left mb-10">
      ¡Explora nuestra sección <span className="text-primary-1">100% orgánica</span> y cuida tu salud cada día!
          </h6>
        </div>
      </div>

      <MarqueeContainer classname='h-40 w-full bg-background -mt-20'>
        {contenido.map((logo, index) => (
          <div key={index} className="flex items-center mx-5 w-32">
            <img src={logo.src} alt={logo.alt} className="h-28 w-auto" />
          </div>
        ))}
      </MarqueeContainer>
    </div>
  )

}

type CardPromoProps = {
  icon: React.ReactNode
  title: string
  description: string
}

export function CardPromo({ icon, title, description }: CardPromoProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-gray-400/5 w-fit px-4 py-6 rounded-md shadow-sm">
      <div className="w-14 h-14 rounded-full bg-secondary flex justify-center items-center text-primary-1">
        {icon}
      </div>
      <h5 className="w-48 font-semibold uppercase text-sm text-wrap text-foreground text-center">{title}</h5>
      <p className="text-wrap w-72 text-center text-sm text-foreground/50">{description}</p>
    </div>
  )
}
