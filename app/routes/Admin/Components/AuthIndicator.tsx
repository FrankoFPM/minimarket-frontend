import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface AuthIndicatorProps {
  isVisible: boolean
  message: string
}

export default function AuthIndicator({ isVisible, message }: AuthIndicatorProps) {
  const indicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!indicatorRef.current) return

    if (isVisible) {
      gsap.fromTo(indicatorRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      )

      // Auto-hide después de 2 segundos
      setTimeout(() => {
        gsap.to(indicatorRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: 'power2.in'
        })
      }, 2000)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div
      ref={indicatorRef}
      className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center space-x-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-sm font-medium">{message}</span>
    </div>
  )
}
