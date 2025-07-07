import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'

export function CarruselBanner() {
  return (
    <div className="w-fit scroll-layout">
      <div className="carousel">
        <ul className="content">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i}>
              <img src="/images/test.webp" alt="Banner"/>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function CarruselJS() {
  const bannerImages = [
    '/images/banner1minimark.jpg',
    '/images/banner2minimark.webp',
    '/images/banner3minimark.jpg',
  ]

  return (
    <div className="w-full overflow-hidden relative rounded-2xl shadow-lg">
      <div className="custom-navigation absolute top-4 right-4 flex gap-2 z-10">
        <button
          className="custom-prev bg-white/20 backdrop-blur-sm rounded-full p-3 cursor-pointer hover:bg-white/30 border border-white/30 transition-all duration-300 shadow-lg"
        >
          <FaAnglesLeft className="text-white" size={16} />
        </button>
        <button
          className="custom-next bg-white/20 backdrop-blur-sm rounded-full p-3 cursor-pointer hover:bg-white/30 border border-white/30 transition-all duration-300 shadow-lg"
        >
          <FaAnglesRight className="text-white" size={16} />
        </button>
      </div>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={1000}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          renderBullet: function (index, className) {
            return '<span class="bg-white/70 hover:bg-white rounded-full w-3 h-3 z-10 inline-block transition-all duration-300 ' + className + '"></span>'
          },
        }}
        modules={[Navigation, Pagination, Autoplay]}
        className="carousel2 h-64 md:h-80 lg:h-96"
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
      >
        {bannerImages.map((image, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10" />
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Overlay content */}
            <div className="absolute inset-0 flex items-center justify-start p-8 z-20">
              <div className="text-white max-w-md">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                  {index === 0 && '¡Productos Frescos!'}
                  {index === 1 && '¡Ofertas Especiales!'}
                  {index === 2 && '¡Calidad Premium!'}
                </h2>
                <p className="text-sm md:text-base mb-6 opacity-90">
                  {index === 0 && 'Los mejores productos frescos directamente a tu mesa'}
                  {index === 1 && 'Descuentos increíbles en productos seleccionados'}
                  {index === 2 && 'Calidad garantizada en cada compra'}
                </p>
                <button className="bg-primary-1 text-secondary font-semibold px-6 py-3 rounded-lg hover:bg-primary-1/90 transition-colors duration-300">
                  Explorar productos
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

