import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

export function PaySuccessAnimation({
  onComplete,
  onReverseComplete,
}: {
  onComplete?: () => void
  onReverseComplete?: () => void
}) {
  const circleRef = useRef<SVGCircleElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const tl = gsap.timeline({
    onReverseComplete: () => {
      if (onReverseComplete) onReverseComplete()
    }
  })

  useGSAP(() => {
    const splitTitle = new SplitText(textRef.current, { type: 'words' })
    tl.fromTo(circleRef.current, { r: 0 }, {
      r: 1200,
      duration: 1.2,
      ease: 'power2.inOut',
    })
      .to(textRef.current, { opacity: 1, duration: 0.1 }, '<')
      .from(splitTitle.words, {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        stagger: 0.1,
        onComplete: () => {
          if (onComplete) onComplete()
          gsap.delayedCall(0.1, () => tl.reverse())
        }
      }, '-=1')
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed backdrop-blur-sm inset-0 z-50 flex items-center justify-center bg-white/10"
      style={{ pointerEvents: 'none' }}
    >
      <svg width="100vw" height="100vh" viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        <circle ref={circleRef} cx="50" cy="50" r="0" className='fill-primary-1' />
      </svg>
      <div
        ref={textRef}
        className="relative z-60 text-4xl w-1/2 md:text-7xl uppercase font-lilita font-bold text-white text-center opacity-0"
        style={{ pointerEvents: 'auto' }}
      >
        ¡Compra completada con éxito!
      </div>
    </div>
  )
}