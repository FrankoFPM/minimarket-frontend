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
    <div className="relative w-full h-[400px] overflow-hidden shadow-lg">
      <img
        src={images[current]}
        alt={`Slide ${current}`}
        className="w-full h-full object-cover transition duration-700"
      />

      {/* Flecha izquierda */}
      <button
        onClick={() => setCurrent((current - 1 + images.length) % images.length)}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Flecha derecha */}
      <button
        onClick={() => setCurrent((current + 1) % images.length)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100"
      >
        <ChevronRight size={24} />
      </button>

      {/* Puntos de navegación */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              current === index ? 'bg-green-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageCarrusel