import { MdOutlineSupportAgent } from 'react-icons/md'
import { GoShieldCheck } from 'react-icons/go'
import { PiCarrot } from 'react-icons/pi'
import { LuTruck } from 'react-icons/lu'
import { BsTags } from 'react-icons/bs'
import { FaHouseLaptop, FaArrowRight } from 'react-icons/fa6'
import { BannerHome, InfoCard, Marquee, MarqueeLogos } from './components/Cards'
import { ListCategorias, ListProducts } from './Products/ListProducts'
import { CategoryChips } from './components/CategoryChips'
import { HomeAnimation } from './animations/HomeAnimation'
import { Link } from 'react-router'
import { useState } from 'react'

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId)
  }

  return (
    <>
      <HomeAnimation />
      <div className="flex flex-col bg-background mx-auto my-10 container gap-6 min-h-screen">
        {/* Hero Marquee */}
        <Marquee />

        {/* Features Section */}
        <section className='my-10'>
          <div className="text-center mb-8">
            <h2 className="text-foreground font-bold text-3xl lg:text-4xl">
              ¿Qué nos hace <span className="text-primary-1">diferentes</span>?
            </h2>
            <p className="text-foreground/70 mt-2 max-w-2xl mx-auto">
              Descubre las ventajas que hacen de nuestro minimarket tu mejor opción
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 h-fit justify-items-center">
            <InfoCard title="Pago Seguro" color='bg-gradient-to-br from-purple-100 to-purple-200' icon={<GoShieldCheck size={50} />} />
            <InfoCard title="Productos Frescos" color='bg-gradient-to-br from-green-100 to-green-200' icon={<PiCarrot size={50} />} />
            <InfoCard title="Envíos Rápidos" color='bg-gradient-to-br from-orange-100 to-orange-200' icon={<LuTruck size={50} />} />
            <InfoCard title="Atención Personalizada" color='bg-gradient-to-br from-blue-100 to-blue-200' icon={<MdOutlineSupportAgent size={50} />} />
            <InfoCard title="Precios Competitivos" color='bg-gradient-to-br from-slate-100 to-slate-200' icon={<BsTags size={50} />} />
            <InfoCard title="Compra desde casa" color='bg-gradient-to-br from-red-100 to-red-200' icon={<FaHouseLaptop size={50} />} />
          </div>
        </section>

        {/* Call to Action Banner */}
        <BannerHome image='/images/legumbres.webp' />

        {/* Products Section */}
        <section className='flex flex-col lg:flex-row gap-6' id='shopsection'>
          <div className="hidden lg:block">
            <ListCategorias
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
          <div className="w-full text-primary-1 p-4 lg:p-6">
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4'>
              <div>
                <h2 className='text-foreground text-2xl lg:text-3xl font-bold'>
                  {selectedCategory ? 'Productos destacados' : 'Nuestros productos'}
                </h2>
                <p className='text-foreground/70 text-sm lg:text-base'>
                  {selectedCategory
                    ? 'Los mejores productos de la categoría seleccionada'
                    : 'Explora nuestra amplia gama de productos frescos y de calidad'
                  }
                </p>
              </div>
              <Link
                to="/shop"
                className='bg-primary-1 text-secondary font-semibold px-6 py-3 rounded-xl hover:bg-primary-1/90 transition-colors duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl'
              >
                Ver todos los productos
                <FaArrowRight size={14} />
              </Link>
            </div>

            {/* Mobile category filter */}
            <div className="lg:hidden mb-6">
              <CategoryChips
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>

            <ListProducts selectedCategory={selectedCategory} />
          </div>
        </section>

        {/* Brands Section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-foreground font-bold text-2xl lg:text-3xl mb-2">
              Marcas de <span className="text-primary-1">confianza</span>
            </h2>
            <p className="text-foreground/70">
              Trabajamos con las mejores marcas del mercado
            </p>
          </div>
          <MarqueeLogos />
        </section>
      </div>
    </>
  )
}