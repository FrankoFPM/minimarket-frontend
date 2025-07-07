import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router'
import { auth } from '~/firebase/firebaseConfig'
import { PaySuccessAnimation } from './animations/PayAnimation'
import type { Producto } from '../../services/productosService'
import type { Carrito } from '~/Types/Carrito'
import { useCarrito } from '~/hooks/useCarrito'
import { useProductosByIds } from '~/hooks/useProducto'
import { setPedidoFromCarrito } from '~/services/pedidoService'
import { addToast, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react'
import { removeAllProductosFromCarrito } from '~/services/carritoService'

export default function Carrito() {

  const [ userId, setUserId ] = useState<string>('')
  //Custom hook para obtener los productos del carrito
  const {carrito, loading, fetchCarrito} = useCarrito()
  const ids = carrito.map(item => item.idProducto)
  console.log('IDs del carrito:', ids)
  const { productos, fetchProductos } = useProductosByIds(ids)

  const navigate = useNavigate()
  const [quantities, setQuantities] = useState<number[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const contraentrega = 0 // Contraentrega gratuita

  const subtotal = productos.reduce((acc, producto, i) => {
    return acc + producto.precio * quantities[i]
  }, 0)

  const total = subtotal + contraentrega // Total es igual al subtotal ya que contraentrega es gratis

  console.log('Productos del carrito:', productos)
  const handleCompra = async () => {
    try {
      await setPedidoFromCarrito(userId, userId)
      setShowSuccess(true)
      fetchCarrito() // Actualiza el carrito después de la compra
    } catch (error) {
      console.error('Error al realizar la compra:', error)
      addToast({
        title: 'Error al realizar la compra',
        description: 'Ocurrió un problema al procesar tu compra. Por favor, inténtalo de nuevo más tarde.',
        color: 'danger',
        shouldShowTimeoutProgress: true,
      })
    }
  }

  const vaciarCarrito = async () => {
    try {
      await removeAllProductosFromCarrito(userId)
      await fetchCarrito() // Actualiza el carrito después de vaciarlo
      addToast({
        title: 'Carrito vaciado',
        description: 'Todos los productos han sido eliminados del carrito.',
        color: 'secondary',
        shouldShowTimeoutProgress: true,
      })
    } catch (error) {
      console.error('Error al vaciar el carrito:', error)
      addToast({
        title: 'Error',
        description: 'No se pudo vaciar el carrito. Por favor, inténtalo de nuevo.',
        color: 'danger',
        shouldShowTimeoutProgress: true,
      })
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login')
        return
      }
      setUserId(user.uid)
    })
    return () => unsubscribe()
  }, [navigate])

  useEffect(() => {
    setQuantities(carrito.map((item: Carrito) => item.cantidad))
    console.log('Carrito actualizado:', carrito)
    console.log('Productos del carrito:', productos)
    fetchProductos()
  }, [carrito])

  return (
    <section className="container mx-auto flex flex-col lg:flex-row gap-8 py-8 min-h-[80vh] px-4">
      {/* Carrito */}
      <article className="flex-1">
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8'>
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-r from-primary-1/10 to-primary-2/10 p-3 rounded-xl">
              <FaShoppingCart className="text-2xl text-primary-1" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1">Tu Carrito</h2>
              <p className="text-gray-500 text-sm">
                {quantities.reduce((a, b) => a + b, 0) === 0 ? 'Carrito vacío' : `${quantities.reduce((a, b) => a + b, 0)} producto${quantities.reduce((a, b) => a + b, 0) > 1 ? 's' : ''} seleccionado${quantities.reduce((a, b) => a + b, 0) > 1 ? 's' : ''}`}
              </p>
            </div>
            <span className="bg-gradient-to-r from-primary-1 to-primary-2 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">
              {quantities.reduce((a, b) => a + b, 0)} items
            </span>
          </div>

          {/* Banner de contraentrega gratuita */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-4 mb-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <span className="text-2xl">🚚</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">¡Contraentrega Gratuita!</h3>
                <p className="text-green-100 text-sm">Paga al recoger tu pedido • Sin costo adicional</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-sm font-bold">GRATIS</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 border-b border-gray-200 pb-3 mb-6 font-semibold text-sm text-gray-600 uppercase tracking-wide">
            <h3>Producto</h3>
            <h3 className="text-center">Cantidad</h3>
            <h3 className="text-center">Total</h3>
          </div>

          <div className="space-y-3">
            {productos.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <FaShoppingCart className="text-2xl text-gray-400" />
                </div>
                <p className='text-gray-500 text-lg font-medium'>No hay productos en el carrito</p>
                <p className='text-gray-400 text-sm mt-2'>Agrega algunos productos para comenzar</p>
              </div>
            ) : productos.map((producto, i) => (
              <div key={producto.idProducto} className="grid grid-cols-3 gap-6 py-4 items-center hover:bg-gradient-to-r hover:from-primary-1/5 hover:to-transparent rounded-xl transition-all duration-200 px-3 border border-transparent hover:border-primary-1/20 hover:shadow-sm">
                <ProductMini producto={producto} quantity={quantities[i]} />
                <div className="flex justify-center">
                  <CantidadInput
                    quantity={quantities[i]}
                    setQuantity={q =>
                      setQuantities(prev => prev.map((val, idx) => (idx === i ? q : val)))
                    }
                  />
                </div>
                <p className="text-center font-bold text-primary-1 text-lg">
                  S/ {(producto.precio * quantities[i]).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 pt-6 border-t border-gray-200">
            <Link
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold transition-all duration-200 hover:shadow-sm border border-gray-200"
              to={'/'}
            >
              ← Seguir comprando
            </Link>
            <VaciarCarrito vaciarCarrito={vaciarCarrito} disabled={loading || productos.length === 0} />
          </div>
        </div>
      </article>

      {/* Resumen */}
      <aside className="w-full max-w-md">
        <article className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <span className="bg-gradient-to-r from-primary-1 to-primary-2 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
              💰
            </span>
            Resumen de compra
          </h2>

          <div className="flex justify-between mb-4 text-gray-600">
            <span>Subtotal:</span>
            <span className="font-semibold text-gray-800">S/ {subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-4 text-gray-600">
            <div className="flex items-center gap-2">
              <span>Contraentrega:</span>
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                GRATIS
              </div>
            </div>
            <span className="font-semibold text-green-600">S/ {contraentrega.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-6 border-t-2 border-gray-100 pt-4">
            <span className="text-lg font-bold text-gray-800">Total:</span>
            <span className="text-xl font-bold text-primary-1">S/ {total.toFixed(2)}</span>
          </div>

          {/* Información de contraentrega */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-sm font-bold">🚚</span>
              </div>
              <div>
                <h3 className="font-bold text-green-800">Contraentrega Gratuita</h3>
                <p className="text-green-600 text-sm">Paga al recoger tu pedido</p>
              </div>
            </div>
            <ul className="text-xs text-green-700 space-y-1 ml-11">
              <li>• Sin costo adicional de envío</li>
              <li>• Pago en efectivo al momento del recojo</li>
              <li>• Recojo en nuestro local</li>
            </ul>
          </div>

          <Button
            isDisabled={loading || productos.length === 0}
            aria-disabled={loading || productos.length === 0}
            onPress={handleCompra}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-1 to-primary-2 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:from-primary-2 hover:to-primary-1 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Procesando...' : 'Realizar pedido'}
          </Button>
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
      <div className="relative">
        <img
          src={`/images/products/${producto.foto}`}
          alt={producto.nombre}
          width={60}
          height={60}
          className="object-cover rounded-xl shadow-sm border border-gray-100"
        />
        <div className="absolute -top-2 -right-2 bg-primary-1 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
          {quantity}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-base text-gray-800 line-clamp-2">{producto.nombre}</h3>
        <p className="text-gray-500 text-sm mt-1">
          Precio: <span className="font-bold text-primary-1">S/ {producto.precio.toFixed(2)}</span>
        </p>
      </div>
    </div>
  )
}

function CantidadInput({ quantity, setQuantity }: { quantity: number, setQuantity: (q: number) => void }) {
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleIncrease = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1
    if (value >= 1 && value <= 99) {
      setQuantity(value)
    }
  }

  return (
    <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-primary-1/30 transition-all duration-200">
      <button
        onClick={handleDecrease}
        disabled={quantity <= 1}
        className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 hover:from-primary-1/10 hover:to-primary-1/20 disabled:from-gray-100 disabled:to-gray-100 disabled:text-gray-300 text-gray-600 hover:text-primary-1 transition-all duration-200 border-r border-gray-200"
      >
        <FaMinus size={14} />
      </button>

      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min={1}
        max={99}
        className="w-16 h-12 text-center font-bold text-lg text-foreground bg-transparent border-0 outline-none focus:bg-primary-1/5 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />

      <button
        onClick={handleIncrease}
        disabled={quantity >= 99}
        className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 hover:from-primary-1/10 hover:to-primary-1/20 disabled:from-gray-100 disabled:to-gray-100 disabled:text-gray-300 text-gray-600 hover:text-primary-1 transition-all duration-200 border-l border-gray-200"
      >
        <FaPlus size={14} />
      </button>
    </div>
  )
}

function PayMethods() {
  return (
    <article className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 max-w-xl mx-auto">
      <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
        <span className="bg-gradient-to-r from-primary-1 to-primary-2 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
          💳
        </span>
        Métodos de pago
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        Elige el método que más te convenga. Aceptamos transferencias, billeteras digitales y pagos en efectivo.
      </p>

      <div className="w-full flex flex-col gap-4">
        {/* Pago en efectivo - Contraentrega (Principal) */}
        <section className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
          <h4 className="text-base font-bold text-green-800 mb-3 flex items-center gap-2">
            <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              ⭐
            </span>
            Pago en Efectivo - Contraentrega
          </h4>
          <div className="flex items-center gap-4 mb-3">
            <div className="bg-white rounded-xl shadow-sm border border-green-200 p-3">
              <img src="/images/pay/pago-efectivo.svg" alt="Pago en Efectivo" className="w-16 h-10 object-contain" />
            </div>
            <div className="flex-1">
              <h5 className="font-semibold text-green-800">Pago al recibir</h5>
              <p className="text-green-600 text-sm">Sin costo adicional • Recomendado</p>
            </div>
          </div>
          <div className="bg-white/50 rounded-lg p-3">
            <ul className="text-xs text-green-700 space-y-1">
              <li>• Paga cuando recibas tu pedido</li>
              <li>• Recojo en nuestro local</li>
              <li>• Sin comisiones ni gastos adicionales</li>
              <li>• Verifica tu pedido antes de pagar</li>
            </ul>
          </div>
        </section>

        {/* Transferencias Bancarias */}
        <section className="bg-gradient-to-r from-blue-50 to-sky-50 border-2 border-blue-200 rounded-xl p-4">
          <h4 className="text-base font-bold text-blue-800 mb-3 flex items-center gap-2">
            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              🏦
            </span>
            Transferencias Bancarias
          </h4>
          <div className="flex gap-4 flex-wrap mb-3">
            {[
              { src: '/images/pay/bcp.svg', alt: 'BCP', label: 'Banco de Crédito del Perú' },
              { src: '/images/pay/interbank.png', alt: 'Interbank', label: 'Interbank' },
            ].map(({ src, alt, label }) => (
              <div key={alt} className="flex flex-col items-center group">
                <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-3 transition-all duration-200 group-hover:shadow-md group-hover:border-blue-300">
                  <img src={src} alt={alt} className="w-16 h-10 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-200" />
                </div>
                <span className="mt-2 text-[10px] text-center text-blue-700 group-hover:text-blue-800 transition-colors duration-200 font-medium">{label}</span>
              </div>
            ))}
          </div>
          <div className="bg-white/50 rounded-lg p-3">
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Realiza tu transferencia bancaria</li>
              <li>• Envía el comprobante a nuestros números autorizados</li>
              <li>• O acércate presencialmente al local</li>
              <li>• Procesamiento inmediato del pedido</li>
            </ul>
          </div>
        </section>

        {/* Billeteras Digitales */}
        <section className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4">
          <h4 className="text-base font-bold text-purple-800 mb-3 flex items-center gap-2">
            <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              📱
            </span>
            Billeteras Digitales
          </h4>
          <div className="flex gap-4 flex-wrap mb-3">
            {[
              { src: '/images/pay/yape.webp', alt: 'Yape', label: 'Rápido y sin comisiones' },
              { src: '/images/pay/plin.png', alt: 'Plin', label: 'Desde tu app bancaria' },
            ].map(({ src, alt, label }) => (
              <div key={alt} className="flex flex-col items-center group">
                <div className="bg-white rounded-xl shadow-sm border border-purple-200 p-3 transition-all duration-200 group-hover:shadow-md group-hover:border-purple-300">
                  <img src={src} alt={alt} className="w-16 h-10 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-200" />
                </div>
                <span className="mt-2 text-[10px] text-center text-purple-700 group-hover:text-purple-800 transition-colors duration-200 font-medium">{label}</span>
              </div>
            ))}
          </div>
          <div className="bg-white/50 rounded-lg p-3">
            <ul className="text-xs text-purple-700 space-y-1">
              <li>• Realiza tu pago por Yape o Plin</li>
              <li>• Envía el comprobante a nuestros números autorizados</li>
              <li>• O acércate presencialmente al local</li>
              <li>• Confirmación rápida del pago</li>
            </ul>
          </div>
        </section>

        {/* Números autorizados */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-xl p-4">
          <h4 className="text-base font-bold text-indigo-800 mb-3 flex items-center gap-2">
            <span className="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              📞
            </span>
            Números Autorizados
          </h4>
          <div className="bg-white/50 rounded-lg p-3">
            <p className="text-sm text-indigo-700 font-medium mb-2">Envía tu comprobante de pago a:</p>
            <ul className="text-xs text-indigo-700 space-y-1">
              <li>• WhatsApp: <span className="font-semibold">+51 999 888 777</span></li>
              <li>• Telegram: <span className="font-semibold">+51 999 888 777</span></li>
              <li>• SMS: <span className="font-semibold">+51 999 888 777</span></li>
            </ul>
            <p className="text-xs text-indigo-600 mt-2 font-medium">
              Incluye tu nombre completo y número de pedido
            </p>
          </div>
        </div>

        {/* Nota informativa */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-xs text-amber-700 text-center">
            <span className="font-semibold">Recuerda:</span> Todos los pedidos son para recojo en nuestro local. El pago en efectivo se realiza al momento del recojo.
          </p>
        </div>
      </div>
    </article>
  )
}

type VaciarCarritoProps = {
  vaciarCarrito: () => void
  disabled?: boolean
}

function VaciarCarrito({ vaciarCarrito, disabled }: VaciarCarritoProps) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure()

  return (
    <>
      <Button onPress={onOpen} isDisabled={disabled} className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            Vaciar carrito
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-primary-1 text-center">Vaciar Carrito</h2>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center gap-4">
                  <h3 className="text-lg font-semibold text-foreground">¿Estás seguro de que deseas vaciar el carrito?</h3>
                  <p className="text-sm text-foreground/50">Esta acción eliminará todos los productos del carrito.</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="success" onPress={() => {
                  try {
                    vaciarCarrito()
                    onClose()
                  } catch (error) {
                    console.error('Failed to empty the cart:', error)
                    addToast({
                      title: 'Error',
                      description: 'No se pudo vaciar el carrito. Por favor, inténtalo de nuevo.',
                      color: 'danger',
                    })
                  }
                }}>
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}