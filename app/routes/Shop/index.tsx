import { AiOutlineEllipsis } from 'react-icons/ai'
import { FaAppleAlt, FaCheese, FaSoap, FaTooth } from 'react-icons/fa'
import { GiBreadSlice, GiCarrot, GiMeat } from 'react-icons/gi'
import { MdLocalDrink, MdLocalGroceryStore } from 'react-icons/md'
/*{ id: 1, name: 'Manzana', price: 1.5, priceBefore:2.5, stars: 5, image: '/images/apple.webp' } */
interface CardProductProps {
  name: string
  price: number
  priceBefore: number
  stars: number
  image: string
}

function CardProduct({ name, price, priceBefore, stars, image }: CardProductProps) {
  return (
    <div className="flex flex-col bg-secondary rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <img src={image} alt={name} className="w-full h-40 object-cover rounded-md bg-secondary" />
      <div className='p-4'>
        <h3 className="text-primary-1 font-semibold text-lg mt-2">{name}</h3>
        <div className='flex flex-row justify-start items-center gap-3'>
          <p className="text-primary-1 font-bold text-xl">S/.{price}</p>
          <p className="text-gray-500 text-sm line-through">S/.{priceBefore}</p>
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

export default function Shop() {

  const filterTags = [
    { id: 1, name: 'Frutas', icon: <FaAppleAlt size={20} /> },
    { id: 2, name: 'Verduras', icon: <GiCarrot size={20} /> },
    { id: 3, name: 'Lácteos', icon: <FaCheese size={20} /> },
    { id: 4, name: 'Carnes', icon: <GiMeat size={20} /> },
    { id: 5, name: 'Panadería', icon: <GiBreadSlice size={20} /> },
    { id: 6, name: 'Abarrotes', icon: <MdLocalGroceryStore size={20} /> },
    { id: 7, name: 'Bebidas', icon: <MdLocalDrink size={20} /> },
    { id: 8, name: 'Limpieza', icon: <FaSoap size={20} /> },
    { id: 9, name: 'Cuidado Personal', icon: <FaTooth size={20} /> },
    { id: 10, name: 'Otros', icon: <AiOutlineEllipsis size={20} /> },
  ]

  const productos = [
    { id: 1, name: 'Manzana', price: 1.5, priceBefore:2.5, stars: 5, image: '/images/apple.webp' },
    { id: 2, name: 'Manzana', price: 1.5, priceBefore:2.5, stars: 5, image: '/images/apple.webp' },
    { id: 3, name: 'Manzana', price: 1.5, priceBefore:2.5, stars: 5, image: '/images/apple.webp' },
    { id: 4, name: 'Manzana', price: 1.5, priceBefore:2.5, stars: 5, image: '/images/apple.webp' },
    { id: 5, name: 'Manzana', price: 1.5, priceBefore:2.5, stars: 5, image: '/images/apple.webp' },
    { id: 6, name: 'Manzana', price: 1.5, priceBefore:2.5, stars: 5, image: '/images/apple.webp' },
    { id: 7, name: 'Manzana', price: 1.5, priceBefore:2.5, stars: 5, image: '/images/apple.webp' },
    { id: 8, name: 'Manzana', price: 1.5, priceBefore:2.5, stars: 5, image: '/images/apple.webp' },
    { id: 9, name: 'Manzana', price: 1.5, priceBefore:2.5, stars: 5, image: '/images/apple.webp' },
    { id: 10, name: 'Manzana', price: 1.5, priceBefore:2.5, stars: 5, image: '/images/apple.webp' },
    { id: 11, name: 'Manzana', price: 1.5, priceBefore:2.5, stars: 5, image: '/images/apple.webp' },
    { id: 12, name: 'Manzana', price: 1.5, priceBefore:2.5, stars: 5, image: '/images/apple.webp' },
    { id: 13, name: 'Manzana', price: 1.5, priceBefore:2.5, stars: 5, image: '/images/apple.webp' },
    { id: 14, name: 'Manzana', price: 1.5, priceBefore:2.5, stars: 5, image: '/images/apple.webp' },

  ]

  return (
    <div className="flex flex-row bg-background mx-auto my-10 w-[90rem] gap-4 min-h-screen">
      <div className="flex flex-col p-4 w-[25rem] h-fit bg-secondary rounded-lg overflow-hidden sticky top-3">
        <h2 className="text-primary-1 font-semibold text-xl">Categorias</h2>
        <ul className="flex flex-col gap-2 mt-4">
          {filterTags.map((tag) => (
            <li key={tag.id} className="group transition-colors group flex items-center gap-2 p-2 rounded-md hover:bg-primary-1 hover:text-secondary cursor-pointer">
              {tag.icon && <span className="transition-colors text-primary-1 group-hover:text-secondary">{tag.icon}</span>}
              <label htmlFor={`tag-${tag.id}`} className="transition-colors text-sm font-semibold text-foreground group-hover:text-secondary cursor-pointer select-none">{tag.name}</label>
            </li>
          ))}
        </ul>

      </div>
      <div className="w-full h-full text-primary-1 p-4">
        <h2 className='text-foreground text-2xl font-bold'>Nuestros productos</h2>
        <p className='text-foreground'>Explora nuestra amplia gama de productos frescos y de calidad.</p>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {productos.map((producto) => (
            <CardProduct
              key={producto.id}
              name={producto.name}
              price={producto.price}
              priceBefore={producto.priceBefore}
              stars={producto.stars}
              image={producto.image}
            />
          ))}
        </div>
      </div>
    </div>
  )
}