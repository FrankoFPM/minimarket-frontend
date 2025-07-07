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
  discount?: number, // TODO: Activar cuando el backend esté listo
  src: string
}

export function CardProduct({ name, price, stars, image, marca, src }: CardProductProps) {
  // TODO: Implementar sistema de descuentos cuando el backend esté listo
  // const discountedPrice = price - price * (discount ?? 0)
  // const hasDiscount = discount && discount > 0

  return (
    <Link
      to={src}
      className="group relative flex flex-col bg-secondary rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200/20 overflow-hidden hover:scale-[1.02] hover:border-primary-1/30"
    >
      {/* TODO: Descuentos - Activar cuando el backend esté listo */}
      {/* {hasDiscount && (
        <div className="absolute bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full right-3 top-3 z-10 shadow-md">
          -{Math.round(discount * 100)}%
        </div>
      )} */}

      {/* Product image */}
      <div className='relative h-48 flex justify-center items-center p-4 bg-gradient-to-br from-secondary to-gray-100 group-hover:from-secondary group-hover:to-gray-200 transition-all duration-300'>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product info */}
      <div className='p-4 flex flex-col gap-2'>
        <p className='text-primary-1/70 font-semibold text-sm uppercase tracking-wide'>{marca}</p>
        <h3 className="text-foreground font-bold text-lg line-clamp-2 group-hover:text-primary-1 transition-colors duration-300">
          {name}
        </h3>

        {/* Price section */}
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-col'>
            <p className="text-primary-1 font-bold text-xl">
              S/ {price.toFixed(2)}
            </p>
            {/* TODO: Precio con descuento - Activar cuando el backend esté listo */}
            {/* {hasDiscount && (
              <p className="text-gray-500 text-sm line-through">
                S/ {price.toFixed(2)}
              </p>
            )} */}
          </div>

          {/* Stars rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={index < stars ? 'text-yellow-400 text-sm' : 'text-gray-300 text-sm'}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Add to cart button */}
        <button className="mt-2 w-full bg-primary-1 text-secondary font-semibold py-2 px-4 rounded-lg hover:bg-primary-1/90 transition-colors duration-300 flex items-center justify-center gap-2">
          <FiShoppingBag size={16} />
          Ver producto
        </button>
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
