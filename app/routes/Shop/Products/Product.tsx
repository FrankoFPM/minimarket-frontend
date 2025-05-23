import { BiRefresh } from 'react-icons/bi'
import { GiBreadSlice, GiCarrot, GiFruitBowl, GiMeat } from 'react-icons/gi'
import { MdLocalDrink, MdLocalGroceryStore, MdSecurity } from 'react-icons/md'
import { FaFacebook, FaTwitter, FaInstagram, FaHeart, FaAppleAlt, FaCheese, FaSoap, FaTooth } from 'react-icons/fa'
import { SiVisa, SiMastercard, SiPaypal } from 'react-icons/si'

import 'swiper/css'
import { InputField } from '~/Components/FormComponent'
import { ImageGallery } from '../components/ImageGallery'
import { BannerHome, CardProduct } from '../components/Cards'
import { AiOutlineEllipsis } from 'react-icons/ai'

export default function Product() {
  const promoFrescura = {
    icon: <GiFruitBowl size={20} />,
    title: 'Frescura garantizada',
    description: 'Productos frescos todos los días. ¡Te lo aseguramos!'
  }
  const promoDevolucion = {
    icon: <BiRefresh size={20} />,
    title: 'Devoluciones sin complicaciones',
    description: 'Tienes hasta 7 días para devolver productos sin costo adicional.'
  }
  const promoSeguridad = {
    icon: <MdSecurity size={20} />,
    title: 'Compra 100% segura',
    description: 'Tus datos están protegidos con encriptación de última generación.'
  }

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
    <div className="min-h-screen container mx-auto">
      <div className='flex flex-row gap-20 items-start justify-center my-10'>
        <div className='flex flex-row gap-6 items-start justify-center w-full'>
          {/* imagen del producto y sub imagenes */}
          <ImageGallery />
          <div>
            <h3 className="text-2xl font-bold text-foreground">Nombre de producto</h3>
            <div className='border-b border-gray-300 w-full my-2'></div>
            {/* estrellas */}
            <div className='flex flex-row gap-2 my-2'>
              <span className='text-yellow-500'>⭐⭐⭐⭐⭐</span>
              <span className='text-gray-500'>(100 valoraciones)</span>
            </div>
            {/* stock */}
            <div className='flex flex-row gap-2 my-2'>
              <span className='text-foreground font-semibold'>Stock:</span>
              <span className='text-primary-1'>Disponible</span>
            </div>
            {/* precio */}
            <div className='flex flex-row gap-2 my-2'>
              <span className='text-foreground font-semibold'>Precio:</span>
              <span className='text-primary-1'>$100.00</span>
            </div>
            {/* descripcion */}
            <div className='flex flex-col gap-2 justify-center my-2'>
              <span className='text-foreground font-semibold'>Descripción:</span>
              <p className='text-foreground/50'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            {/* tamaño y/o peso lista radio button */}
            <div className='flex flex-col gap-2 justify-center my-2'>
              <span className='text-foreground font-semibold'>Tamaño:</span>
              <div className='flex flex-row gap-4'>
                <label className="flex items-center gap-2">
                  <input type="radio" id="tamaño1" name="tamaño" value="tamaño1" className="accent-primary-1 w-5 h-5" />
                  <span className="text-foreground/50">Tamaño 1</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" id="tamaño2" name="tamaño" value="tamaño2" className="accent-primary-1 w-5 h-5" />
                  <span className="text-foreground/50">Tamaño 2</span>
                </label>
              </div>
            </div>
            {/* formulario y botones */}
            <div className='flex flex-col gap-2 justify-center my-2'>
              <InputField
                type='number'
                name='cantidad'
                label='Cantidad'
                placeholder='1'
                className='w-32'
                min={1}
                max={10}
                required
              />
              <div className='grid grid-cols-2 gap-2 my-2'>
                <button className='bg-primary-1 text-white rounded-md p-2'>Agregar al carrito</button>
                <button className='bg-black dark:bg-slate-700 text-white rounded-md p-2'>Comprar ahora</button>
              </div>
              {/* whistlist */}
              <div className='flex items-center gap-2 my-2'>
                <FaHeart className='text-red-500 cursor-pointer' size={24} />
                <label htmlFor="whistlist" className='text-foreground/50'>Agregar a la lista de deseos</label>
              </div>
              <div className='border-b border-gray-300 w-full my-2'></div>
              {/* sku */}
              <div className='flex flex-row gap-2 my-2'>
                <span className='text-foreground font-semibold'>SKU:</span>
                <span className='text-primary-1'>123456</span>
              </div>
              {/* compartir */}
              <div className='flex flex-row gap-2 my-2'>
                <span className='text-foreground font-semibold'>Compartir:</span>
                <div className='flex flex-row gap-2'>
                  <FaFacebook className='text-blue-600 cursor-pointer' size={24} />
                  <FaTwitter className='text-blue-400 cursor-pointer' size={24} />
                  <FaInstagram className='text-pink-500 cursor-pointer' size={24} />
                </div>
              </div>
              {/* métodos de pago */}
              <div className='flex flex-row gap-2 my-2'>
                <span className='text-foreground font-semibold'>Métodos de pago:</span>
                <div className='flex flex-row gap-2'>
                  <SiVisa className='text-blue-600' size={30} />
                  <SiMastercard className='text-red-600' size={30} />
                  <SiPaypal className='text-blue-400' size={30} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-6 items-center justify-center w-72'>
          <CardPromo {...promoFrescura} />
          <CardPromo {...promoDevolucion} />
          <CardPromo {...promoSeguridad} />
        </div>
      </div>
      <BannerHome image='/images/legumbres.webp' />
      <div className='flex flex-row gap-4 mb-10'>
        <div className="flex flex-col p-4 w-[25rem] h-fit bg-secondary rounded-lg overflow-hidden sticky top-26">
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
                stars={producto.stars}
                image={producto.image}
                marca={producto.marca}
                discount={producto.discount}
                src={`/Producto/${producto.id}`}
              />
            ))}
          </div>
        </div>
      </div>
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

