import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router'
import { InputField } from '~/Components/FormComponent'
import { auth } from '~/firebase/firebaseConfig'
import { PaySuccessAnimation } from './animations/PayAnimation'
//import { getProductos } from '../../services/productosService'
import type { Producto } from '../../services/productosService'

export default function Carrito() {
  const navigate = useNavigate()
  const [quantities, setQuantities] = useState<number[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [productos, setProductos] = useState<Producto[]>([])
  const envio = 5

  const subtotal = productos.reduce((acc, producto, i) => {
    return acc + producto.precio * quantities[i]
  }, 0)

  const total = subtotal + envio

  const handleCompra = () => {
    setShowSuccess(true)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login')
      }
    })
    return () => unsubscribe()
  }, [navigate])

  type ProductoCarrito = {
      idProducto: number;
      nombre: string;
      cantidad: number;
      precio: number;
    }

  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]')

    setProductos(carrito.map((item: ProductoCarrito) =>  ({
      ...item
    })))

    setQuantities(carrito.map((item: ProductoCarrito) => item.cantidad))
  }, [])

  return (
    <section className="container mx-auto flex flex-col lg:flex-row gap-8 py-8 min-h-[80vh]">
      {/* Carrito */}
      <article className="flex-1">
        <div className='bg-secondary rounded-2xl shadow-lg p-8'>
          <div className="flex items-center gap-3 mb-6">
            <FaShoppingCart className="text-3xl text-primary-1" />
            <h2 className="text-3xl font-bold text-foreground">Tu Carrito</h2>
            <span className="ml-2 bg-primary-1 text-secondary px-3 py-1 rounded-full text-sm font-semibold">
              {quantities.reduce((a, b) => a + b, 0)} productos
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 border-b-2 border-gray-200 pb-2 mt-2 font-semibold text-lg text-foreground/50">
            <h3 className='text-foreground/50'>Producto</h3>
            <h3 className="text-center text-foreground/50">Cantidad</h3>
            <h3 className="text-center text-foreground/50">Total</h3>
          </div>
          <div className="mt-4 divide-y divide-gray-200">
            {productos.length === 0 ? (
              <p className='text-foreground/50 text-center'>No se han añadido productos.</p>
            ) :productos.map((producto, i) => (
              <div key={producto.idProducto} className="grid grid-cols-3 gap-4 py-6 items-center hover:bg-background rounded-xl transition">
                <ProductMini producto={producto} quantity={quantities[i]} />
                <div className="flex justify-center">
                  <CantidadInput
                    quantity={quantities[i]}
                    setQuantity={q =>
                      setQuantities(prev => prev.map((val, idx) => (idx === i ? q : val)))
                    }
                  />
                </div>
                <p className="text-center font-bold text-primary-1 text-xl">
                  ${(producto.precio * quantities[i]).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-8">
            <Link className="btn px-6 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition" to={'/'}>
            ← Seguir comprando
            </Link>
            <button onClick={() => {
              localStorage.setItem('carrito', JSON.stringify([]))
              setProductos([]) // si estás usando useState para productos
              setQuantities([])
              window.dispatchEvent(new Event('carritoActualizado')) // actualiza el contador
            }} className="btn px-6 py-2 rounded-xl bg-primary-1 text-secondary font-bold shadow hover:bg-primary-2 transition">
            Vaciar carrito
            </button>
          </div>
        </div>
      </article>

      {/* Resumen */}
      <aside className="w-full max-w-md">
        <article className="bg-secondary rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6 text-primary-1">Resumen de compra</h2>

          <div className="flex justify-between mb-4">
            <span className="text-foreground/50">Subtotal:</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-4">
            <span className="text-foreground/50">Envío:</span>
            <span className="font-semibold">${envio.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-6 border-t border-gray-200 pt-4">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-lg font-bold text-primary-1">${total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCompra}
            className="w-full py-3 rounded-xl bg-primary-1 text-secondary font-bold text-lg shadow hover:bg-primary-2 transition"
          >
  Proceder al pago
          </button>
          {showSuccess && (
            <PaySuccessAnimation
              onComplete={() => {
                // Se llama cuando termina la animación de entrada
                // El desmontaje lo controlamos desde dentro del componente animación
              }}
              onReverseComplete={() => setShowSuccess(false)} // <-- Nuevo prop
            />
          )}
        </article>
        <PayMethods />
      </aside>
    </section>
  )
}

function ProductMini({ producto, quantity }: { producto: Producto, quantity: number }) {
  if (quantity < 0 || producto.precio < 0) return null

  return (
    <div className="flex gap-4 items-center">
      <img
        src={`/images/products/${producto.foto}`}
        alt={producto.nombre}
        width={60}
        height={60}
        className="object-cover rounded-xl shadow"
      />
      <div>
        <h3 className="font-semibold text-lg text-foreground/50">{producto.nombre}</h3>
        <p className="text-foreground/50">
          Precio: <span className="font-bold text-primary-1">${producto.precio.toFixed(2)}</span>
        </p>
      </div>
    </div>
  )
}

function CantidadInput({ quantity, setQuantity }: { quantity: number, setQuantity: (q: number) => void }) {
  return (
    <InputField
      type="number" // mejor que "text" si es un campo numérico
      name="cantidad"
      placeholder="1"
      className="rounded-md overflow-hidden h-10 flex max-w-32"
      value={quantity}
      min={0}
      max={99}
      onChange={(e) => setQuantity(Number(e.target.value))}
      afterElement={
        <button
          className="text-foreground/50 min-w-10 h-full flex items-center justify-center bg-primary-1"
          onClick={() => setQuantity(quantity + 1)}
        >
          <FaPlus className="inline-block text-secondary" />
        </button>
      }
      beforeElement={
        <button
          className="text-foreground/50 min-w-10 h-full flex items-center justify-center bg-primary-1"
          onClick={() => setQuantity(quantity - 1)}
          disabled={quantity <= 0}
        >
          <FaMinus className="inline-block text-secondary rotate-180" />
        </button>
      }
    />
  )
}

function PayMethods() {
  return (
    <article className="bg-secondary rounded-xl shadow p-6 flex flex-col gap-4 items-start max-w-xl mx-auto">
      <h3 className="text-base font-bold text-primary-1 mb-1">Métodos de pago</h3>
      <p className="text-sm text-foreground/50 mb-4">
        Elige el método que más te convenga. Aceptamos transferencias, billeteras digitales y pagos en efectivo.
      </p>

      <div className="w-full flex flex-col gap-4">
        {/* Transferencias Bancarias */}
        <section>
          <h4 className="text-sm font-semibold text-foreground/50 mb-2 border-l-4 border-primary-1 pl-2">Transferencias Bancarias</h4>
          <div className="flex gap-4 flex-wrap">
            {[
              { src: '/images/pay/bcp.svg', alt: 'BCP', label: 'Banco de Crédito del Perú' },
              { src: '/images/pay/interbank.png', alt: 'Interbank', label: 'Interbank' },
            ].map(({ src, alt, label }) => (
              <div key={alt} className="flex flex-col items-center group w-20">
                <div className="bg-secondary rounded-lg shadow p-2 transition-transform group-hover:scale-105">
                  <img src={src} alt={alt} className="w-16 h-10 object-contain grayscale group-hover:grayscale-0 transition" />
                </div>
                <span className="mt-1 text-[10px] text-center text-foreground/50 group-hover:text-primary-1 transition">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Billeteras Digitales */}
        <section>
          <h4 className="text-sm font-semibold text-foreground/50 mb-2 border-l-4 border-primary-1 pl-2">Billeteras Digitales</h4>
          <div className="flex gap-4 flex-wrap">
            {[
              { src: '/images/pay/yape.webp', alt: 'Yape', label: 'Rápido y sin comisiones' },
              { src: '/images/pay/plin.png', alt: 'Plin', label: 'Desde tu app bancaria' },
            ].map(({ src, alt, label }) => (
              <div key={alt} className="flex flex-col items-center group w-20">
                <div className="bg-secondary rounded-lg shadow p-2 transition-transform group-hover:scale-105">
                  <img src={src} alt={alt} className="w-16 h-10 object-contain grayscale group-hover:grayscale-0 transition" />
                </div>
                <span className="mt-1 text-[10px] text-center text-foreground/50 group-hover:text-primary-1 transition">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pago en efectivo */}
        <section>
          <h4 className="text-sm font-semibold text-foreground/50 mb-2 border-l-4 border-primary-1 pl-2">Pago en Efectivo</h4>
          <div className="flex gap-4 flex-wrap">
            <div className="flex flex-col items-center group w-20">
              <div className="bg-secondary rounded-lg shadow p-2 transition-transform group-hover:scale-105">
                <img src="/images/pay/pago-efectivo.svg" alt="Pago Efectivo" className="w-16 h-10 object-contain grayscale group-hover:grayscale-0 transition" />
              </div>
              <span className="mt-1 text-[10px] text-center text-foreground/50 group-hover:text-primary-1 transition">Disponible en agentes</span>
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}
