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
  discount?: number
}

export function CardProduct({ name, price, stars, image, marca, discount }: CardProductProps) {
  return (
    <div className="relative flex flex-col bg-secondary rounded-md hover:shadow-md transition-shadow duration-300 cursor-pointer">
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
          <p className="text-primary-1 font-bold text-xl">S/.{price - price * (discount ?? 0)}</p>
          {discount && discount > 0 ? (
            <p className="text-gray-500 text-sm line-through">S/.{price}</p>
          ): ''}
        </div>
        <div className="flex items-center mt-2">
          {[...Array(stars)].map((_, index) => (
            <span key={index} className="text-yellow-500">★</span>
          ))}
        </div>
      </div>
    </div>
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
    <div className="relative w-full h-72 bg-accent rounded-lg mb-24">
      <div className='flex flex-col w-fit gap-6 absolute top-1/2 -translate-y-1/2 left-28'>
        <span
          className="text-gray-800 font-semibold text-lg text-center w-64 bg-yellow-300 px-6 py-2 rounded-full"
        >
          Producto 100% natural
        </span>
        <h2 className="text-white font-semibold text-3xl text-left text-wrap w-70">¡Compra productos frescos!</h2>
      </div>
      <img src={image} alt="Banner" className="absolute w-auto h-72 object-cover right-1/2 translate-x-1/2 top-1/2 -translate-y-20 rounded-xl" />
      <Link
        to={'/shop'}
        className='px-10 py-4 rounded-full bg-gray-800 text-white font-bold uppercase flex gap-2 w-72 items-center justify-center absolute top-1/2 -translate-y-1/2 right-28'
      >
      Comprar ahora! <span>|</span> <FiShoppingBag size={20} />
      </Link>
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
    <div
      className="relative w-full h-16 overflow-hidden border-y border-gray-300 flex items-center
      before:w-20 before:z-20 before:bg-gradient-to-r before:from-10% before:from-background before:to-transparent before:absolute before:-inset-1
      after:w-20 after:z-20 after:bg-gradient-to-l after:from-10% after:from-background after:to-transparent after:absolute after:ml-auto after:-inset-1"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {contenido.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-foreground font-medium text-sm px-6"
          >
            {item.icono}
            <span>{item.texto}</span>
          </div>
        ))}
      </div>
    </div>
  )
}