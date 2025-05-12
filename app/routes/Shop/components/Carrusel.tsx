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
  const totalItems = 5

  return (
    <div className="w-full overflow-hidden relative">
      <div className="custom-navigation p-5 z-10">
        <button
          className="custom-prev bg-primary-1 rounded-md p-2 cursor-pointer z-10 hover:bg-transparent border-2 border-primary-1 transition-colors duration-300"
        >
          <FaAnglesLeft className="text-secondary" />
        </button>
        <button
          className="custom-next bg-primary-1 rounded-md p-2 cursor-pointer z-10 hover:bg-transparent border-2 border-primary-1 transition-colors duration-300"
        >
          <FaAnglesRight className="text-secondary" />
        </button>
      </div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true} // Habilitar el modo infinito
        autoplay={{
          delay: 3000, // Tiempo en milisegundos entre cada transición (3 segundos)
          disableOnInteraction: false, // Continuar el autoplay incluso después de la interacción del usuario
        }}
        speed={800} // Duración de la transición en milisegundos (800ms para una animación más suave)
        pagination={{
          clickable: true,
          dynamicBullets: true,
          renderBullet: function (index, className) {
            return '<span class="bg-primary-1 rounded-full w-2 h-2 z-10 inline-block ' + className + '"></span>'
          },
        }}
        modules={[Navigation, Pagination, Autoplay]} // Habilitar módulos
        className="carousel2"
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
      >
        {Array.from({ length: totalItems }).map((_, i) => (
          <SwiperSlide key={i}>
            <img
              src="/images/test.webp"
              alt="Banner"
              className="w-full h-auto object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

