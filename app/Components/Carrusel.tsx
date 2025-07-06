import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarruselProps {
  images: string[];
  interval?: number; // formato en milisegundos
}

const ImageCarrusel: React.FC<CarruselProps> = ({ images, interval = 3000 }) => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, interval)

    return () => clearInterval(timer) // Limpiar el intervalo
  }, [images.length, interval])

  const goToSlide = (index: number) => {
    setCurrent(index)
  }

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-gray-900 to-gray-700">
      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10"></div>

      <img
        src={images[current]}
        alt={`Slide ${current}`}
        className="w-full h-full object-cover transition-all duration-1000 ease-in-out transform hover:scale-105"
      />

      {/* Flecha izquierda */}
      <button
        onClick={() => setCurrent((current - 1 + images.length) % images.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full shadow-xl p-3 hover:bg-white/30 transition-all duration-300 z-20 group"
      >
        <ChevronLeft size={28} className="text-white group-hover:text-gray-200" />
      </button>

      {/* Flecha derecha */}
      <button
        onClick={() => setCurrent((current + 1) % images.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full shadow-xl p-3 hover:bg-white/30 transition-all duration-300 z-20 group"
      >
        <ChevronRight size={28} className="text-white group-hover:text-gray-200" />
      </button>

      {/* Puntos de navegación */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index
                ? 'bg-white scale-125 shadow-lg'
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Indicador de progreso */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20 z-20">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-1000 ease-linear"
          style={{ width: `${((current + 1) / images.length) * 100}%` }}
        ></div>
      </div>
    </div>
  )
}

export default ImageCarrusel