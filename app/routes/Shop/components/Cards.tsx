import { FiShoppingBag } from 'react-icons/fi'
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
    <div className="flex flex-wrap flex-col justify-center items-center gap-4 w-28 h-fit">
      <div className={' h-28 w-28 rounded-full flex justify-center items-center text-gray-600 ' + color}>
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