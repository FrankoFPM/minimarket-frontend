import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface AdminLoaderProps {
  isLoading: boolean
  onComplete?: () => void
  message?: string
}

export default function AdminLoader({ isLoading, onComplete, message }: AdminLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    if (!loaderRef.current) return

    const tl = gsap.timeline()

    if (isLoading) {
      // Animación de entrada
      tl.fromTo(loaderRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
      )
        .fromTo(logoRef.current,
          { y: -50, opacity: 0, rotation: -180 },
          { y: 0, opacity: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' },
          '-=0.3'
        )
        .fromTo(textRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '-=0.4'
        )

      // Animación del círculo de progreso
      if (circleRef.current) {
        gsap.fromTo(circleRef.current,
          { strokeDasharray: '0 283' },
          { strokeDasharray: '283 283', duration: 2, ease: 'power2.inOut', repeat: -1 }
        )
      }

      // Animación de los puntos de carga
      const dots = dotsRef.current?.children
      if (dots) {
        gsap.fromTo(dots,
          { y: 0, opacity: 0.3 },
          {
            y: -10,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.inOut',
            stagger: 0.1,
            repeat: -1,
            yoyo: true
          }
        )
      }
    } else {
      // Animación de salida
      tl.to(loaderRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: onComplete
      })
    }

    return () => {
      tl.kill()
    }
  }, [isLoading, onComplete])

  if (!isLoading) return null

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50"
    >
      <div className="text-center">
        {/* Logo animado con círculo de progreso */}
        <div
          ref={logoRef}
          className="relative w-24 h-24 mx-auto mb-8"
        >
          {/* Círculo de progreso */}
          <svg
            className="absolute inset-0 w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
            />
            <circle
              ref={circleRef}
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="0 283"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Icono central */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Texto de carga */}
        <div ref={textRef} className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-3">
            Panel de Administración
          </h2>
          <p className="text-blue-200 text-lg mb-2">
            {message || 'Verificando permisos de acceso...'}
          </p>
          <div className="text-blue-300 text-sm">
            <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
            Conexión segura establecida
          </div>
        </div>

        {/* Puntos de carga animados */}
        <div ref={dotsRef} className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
