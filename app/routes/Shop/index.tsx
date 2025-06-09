import { MdOutlineSupportAgent } from 'react-icons/md'
import { CarruselJS } from './components/Carrusel'
import { GoShieldCheck } from 'react-icons/go'
import { PiCarrot } from 'react-icons/pi'
import { LuTruck } from 'react-icons/lu'
import { BsTags } from 'react-icons/bs'
import { FaHouseLaptop } from 'react-icons/fa6'
import { BannerHome, InfoCard, Marquee, MarqueeLogos } from './components/Cards'
import { ListCategorias, ListProducts } from './Products/ListProducts'

export default function Shop() {

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
        <ListCategorias />
        <div className="w-full h-full text-primary-1 p-4">
          <h2 className='text-foreground text-2xl font-bold'>Nuestros productos</h2>
          <p className='text-foreground'>Explora nuestra amplia gama de productos frescos y de calidad.</p>
          <ListProducts />
        </div>
      </div>
      {/* brands */}
      <MarqueeLogos />

    </div>
  )
}