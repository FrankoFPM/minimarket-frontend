import { useState } from 'react'
import { Autoplay, Pagination, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export function ImageGallery({images}: { images?: string[] }) {

  const imagesAlter = [
    '/images/apple.webp',
    '/images/apple.webp',
    '/images/apple.webp',
    '/images/apple.webp'
  ]

  const filteredImages = (images ?? []).filter(img => !!img && img.trim() !== '')

  const validImages =
  filteredImages.length > 0
    ? filteredImages.length === 1
      ? Array(4).fill(filteredImages[0])
      : filteredImages
    : imagesAlter

  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <div className='w-[30rem]'>

      {/* Carrusel principal */}
      <Swiper
        modules={[Thumbs, Pagination, Autoplay]}
        thumbs={{ swiper: thumbsSwiper }}
        spaceBetween={10}
        className="mb-5 bg-secondary"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          renderBullet: function (index, className) {
            return '<span class="bg-primary-1 rounded-full w-2 h-2 z-10 inline-block ' + className + '"></span>'
          },
        }}
      >
        {validImages.map((src, index) => (
          <SwiperSlide key={index}>
            <img src={src} alt={`Product image ${index + 1}`} className="object-cover w-full h-full" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Carrusel de miniaturas */}
      <Swiper
        modules={[Thumbs]}
        watchSlidesProgress
        onSwiper={setThumbsSwiper}// Guarda la instancia de Swiper
        spaceBetween={10}
        slidesPerView={4}
        className="flex gap-4"
        autoplay={{
          delay: 300,
          disableOnInteraction: false,
        }}
      >
        {validImages.map((src, index) => (
          <SwiperSlide key={index} className='bg-secondary'>
            <img src={src} alt={`Thumbnail ${index + 1}`} className="object-cover w-full h-full" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}