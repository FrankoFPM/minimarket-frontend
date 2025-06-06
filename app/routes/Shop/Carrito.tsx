import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { auth } from '~/firebase/firebaseConfig'
export default function Carrito() {
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login')
      }
    })
    return () => unsubscribe()
  }, [navigate])
  return (
    <section className="container mx-auto flex gap-5 py-5">
      <article className="p-4 bg-secondary rounded-md shadow-xs w-full">
        <h2 className="text-3xl font-bold">Carrito</h2>
        <div className="grid grid-cols-3 gap-4 border-b-2 border-gray-300 pb-2 mt-4">
          <h3>Productos</h3>
          <h3>Cantidad</h3>
          <h3>Total</h3>
        </div>
        <div className="mt-4 border-b-2 border-gray-300 pb-4 mb-5">
          <div className="grid grid-cols-3 gap-4 mt-4">
            <ProductMini />
            <p>1</p>
            <p>$10.00</p>
          </div>
        </div>
        <Link className='btn-success' to={'/'}>Volver a la tienda</Link>
      </article>
      <article className="p-4 bg-secondary rounded-md shadow-xs w-[50rem]">
        <h2 className="text-2xl font-bold mb-4">Resumen</h2>
        <div className="flex justify-between mb-4">
          <p className="text-gray-600">Subtotal:</p>
          <p className="font-semibold">$10.00</p>
        </div>
        <div className="flex justify-between mb-4">
          <p className="text-gray-600">Envío:</p>
          <p className="font-semibold">$5.00</p>
        </div>
        <div className="flex justify-between mb-4">
          <p className="text-gray-600">Total:</p>
          <p className="font-semibold">$15.00</p>
        </div>
        <button className="btn-success w-full">Proceder al pago</button>
      </article>
    </section>
  )
}

function ProductMini(){
  return (
    <div className="flex gap-4">
      <img src="/images/apple.webp" alt="producto" width={60} height={60} className='object-cover' />
      <div>
        <h3 className="font-semibold">Producto Ejemplo</h3>
        <p className="text-gray-600">Precio: $10</p>
        <p className="text-gray-600">1kg</p>
      </div>
    </div>
  )
}