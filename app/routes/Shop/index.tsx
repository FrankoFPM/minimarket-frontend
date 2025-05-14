import { AiOutlineEllipsis } from 'react-icons/ai'
import { FaAppleAlt, FaCheese, FaSoap, FaTooth } from 'react-icons/fa'
import { GiBreadSlice, GiCarrot, GiMeat } from 'react-icons/gi'
import { MdLocalDrink, MdLocalGroceryStore, MdOutlineSupportAgent } from 'react-icons/md'
import { CarruselJS } from './components/Carrusel'
import { GoShieldCheck } from 'react-icons/go'
import { PiCarrot } from 'react-icons/pi'
import { LuTruck } from 'react-icons/lu'
import { BsTags } from 'react-icons/bs'
import { FaHouseLaptop } from 'react-icons/fa6'
import { BannerHome, CardProduct, InfoCard, Marquee } from './components/Cards'

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
    { id: 1, name: 'Manzana', price: 2, priceBefore:2.5, stars: 5, image: '/images/apple.webp', marca: 'Marca 1', discount: 0 },
    { id: 2, name: 'Manzana', price: 2, priceBefore:2.5, stars: 5, image: '/images/apple.webp', marca: 'Marca 1', discount: 0.5 },
    { id: 3, name: 'Manzana', price: 2, priceBefore:2.5, stars: 5, image: '/images/apple.webp', marca: 'Marca 1', discount: 0.5 },
    { id: 4, name: 'Manzana', price: 2, priceBefore:2.5, stars: 5, image: '/images/apple.webp', marca: 'Marca 1', discount: 0.5 },
    { id: 5, name: 'Manzana', price: 2, priceBefore:2.5, stars: 5, image: '/images/apple.webp', marca: 'Marca 1', discount: 0.5 },
    { id: 6, name: 'Manzana', price: 2, priceBefore:2.5, stars: 5, image: '/images/apple.webp', marca: 'Marca 1', discount: 0.2 },
    { id: 7, name: 'Manzana', price: 2, priceBefore:2.5, stars: 5, image: '/images/apple.webp', marca: 'Marca 1', discount: 0.5 },
    { id: 8, name: 'Manzana', price: 2, priceBefore:2.5, stars: 5, image: '/images/apple.webp', marca: 'Marca 1', discount: 0.5 },
    { id: 9, name: 'Manzana', price: 2, priceBefore:2.5, stars: 5, image: '/images/apple.webp', marca: 'Marca 1', discount: 0.5 },
    { id: 10, name: 'Manzana', price: 2, priceBefore:2.5, stars: 5, image: '/images/apple.webp', marca: 'Marca 1', discount: 0.5 },
    { id: 11, name: 'Manzana', price: 2, priceBefore:2.5, stars: 5, image: '/images/apple.webp', marca: 'Marca 1', discount: 0.5 },
    { id: 12, name: 'Manzana', price: 2, priceBefore:2.5, stars: 5, image: '/images/apple.webp', marca: 'Marca 1', discount: 0.5 },
    { id: 13, name: 'Manzana', price: 2, priceBefore:2.5, stars: 5, image: '/images/apple.webp', marca: 'Marca 1', discount: 0.5 },
    { id: 14, name: 'Manzana', price: 2, priceBefore:2.5, stars: 5, image: '/images/apple.webp', marca: 'Marca 1', discount: 0.5 },

  ]

  return (
    <div className="flex flex-col bg-background mx-auto my-10 container gap-4 min-h-screen">
      <CarruselJS />
      <Marquee />
      <div className='my-10'>
        <h2 className="text-foreground font-semibold text-3xl text-center">¿Qué nos hace diferentes?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 h-fit my-5 justify-items-center">
          <InfoCard title="Pago Seguro" color='bg-purple-200' icon={<GoShieldCheck  size={50} />} />
          <InfoCard title="Productos Frescos" color='bg-green-200' icon={<PiCarrot size={50} />} />
          <InfoCard title="Envíos Rápidos" color='bg-orange-200' icon={<LuTruck size={50} />} />
          <InfoCard title="Atención Personalizada" color='bg-blue-200' icon={<MdOutlineSupportAgent size={50} />} />
          <InfoCard title="Precios Competitivos" color='bg-slate-200' icon={<BsTags size={50} />} />
          <InfoCard title="Compra desde casa" color='bg-red-200' icon={<FaHouseLaptop size={50} />} />
        </div>
      </div>
      <BannerHome image='/images/legumbres.webp' />
      <div className='flex flex-row gap-4'>
        <div className="hidden md:flex flex-col p-4 w-[25rem] h-fit bg-secondary rounded-lg overflow-hidden sticky top-26">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {productos.map((producto) => (
              <CardProduct
                key={producto.id}
                name={producto.name}
                price={producto.price}
                stars={producto.stars}
                image={producto.image}
                marca={producto.marca}
                discount={producto.discount}
                src={`/producto/${producto.id}`} // Cambia la ruta según tu estructura de rutas
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}