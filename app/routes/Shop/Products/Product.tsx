import { BiRefresh } from 'react-icons/bi'
import { GiFruitBowl } from 'react-icons/gi'
import { MdSecurity, MdAdd, MdRemove, MdShoppingCart, MdLocalShipping, MdVerified } from 'react-icons/md'
import { FaFacebook, FaTwitter, FaInstagram, FaHeart, FaRegHeart, FaStar } from 'react-icons/fa'
import { SiVisa, SiMastercard, SiPaypal } from 'react-icons/si'
import { HiShieldCheck } from 'react-icons/hi'

import 'swiper/css'
import { ImageGallery } from '../components/ImageGallery'
import { BannerHome } from '../components/Cards'
import { ListCategorias, ListProducts } from './ListProducts'
import { useNavigate, useParams, Link } from 'react-router'
import { useEffect, useState } from 'react'
import { getProductoById } from '~/services/productosService'
import type { Producto } from '~/Types/Producto'
import { addToast } from '@heroui/react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '~/firebase/firebaseConfig'
import { addProductoToCarrito } from '~/services/carritoService'
import { useCarritoContext } from '~/context/carritoContext'

export default function Product() {
  const [userId, setUserId] = useState<string>()
  const [cantidad, setCantidad] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const navigate = useNavigate()
  const { fetchCarrito } = useCarritoContext()

  // Declarar producto y loading ANTES de los useEffect que lo usan
  const { id } = useParams<{ id: string }>()
  const [producto, setProducto] = useState<Producto | null>(null)
  const [loading, setLoading] = useState(true)

  // Cargar wishlist de localStorage al montar
  useEffect(() => {
    const saved = localStorage.getItem('wishlist')
    if (saved) {
      try {
        setWishlist(JSON.parse(saved))
      } catch {
        setWishlist([])
      }
    }
  }, [])

  // Sincronizar isWishlisted con wishlist y producto
  useEffect(() => {
    if (!producto) return
    setIsWishlisted(wishlist.includes(producto.idProducto))
  }, [wishlist, producto])

  // Establecer categoría seleccionada cuando se carga el producto
  useEffect(() => {
    if (!producto) return
    setSelectedCategory(producto.idCategoria || null)
    // Ajustar cantidad si es mayor al stock disponible
    if (cantidad > producto.stock) {
      setCantidad(Math.max(1, producto.stock))
    }
  }, [producto, cantidad])

  // Mantener userId actualizado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        return
      }
      setUserId(user.uid)
    })
    return () => unsubscribe()
  }, [])

  // Guardar wishlist en localStorage
  const saveWishlist = (arr: string[]) => {
    setWishlist(arr)
    localStorage.setItem('wishlist', JSON.stringify(arr))
  }

  // Alternar producto en wishlist
  const toggleWishlist = () => {
    if (!producto) return
    if (wishlist.includes(producto.idProducto)) {
      const updated = wishlist.filter(id => id !== producto.idProducto)
      saveWishlist(updated)
      setIsWishlisted(false)
    } else {
      const updated = [...wishlist, producto.idProducto]
      saveWishlist(updated)
      setIsWishlisted(true)
    }
  }

  // Manejar cambio de categoría
  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId)
  }

  const handleProductos = async () => {
    if (isNaN(cantidad) || cantidad <= 0) {
      addToast({
        title: 'Error',
        description: 'Cantidad inválida. Debe ser un número positivo.',
        color: 'warning',
        shouldShowTimeoutProgress: true,
      })
      return
    }
    if (!producto) {
      addToast({
        title: 'Error',
        description: 'Producto no encontrado.',
        color: 'danger',
        shouldShowTimeoutProgress: true,
      })
      return
    }

    if (!userId) {
      addToast({
        title: 'Error',
        description: 'Usuario no autenticado.',
        color: 'danger',
        shouldShowTimeoutProgress: true,
      })
      navigate('/login')
      return
    }

    console.log('Agregando producto al carrito:', { idProducto: producto.idProducto, cantidad, userId })

    await addProductoToCarrito(userId, producto.idProducto, cantidad)
    fetchCarrito()
    addToast({
      title: 'Éxito',
      description: `Producto ${producto.nombre} agregado al carrito.`,
      color: 'primary',
      shouldShowTimeoutProgress: true,
    })
  }

  const handleComprarAhora = async () => {
    if (isNaN(cantidad) || cantidad <= 0) {
      addToast({
        title: 'Error',
        description: 'Cantidad inválida. Debe ser un número positivo.',
        color: 'warning',
        shouldShowTimeoutProgress: true,
      })
      return
    }
    if (!producto) {
      addToast({
        title: 'Error',
        description: 'Producto no encontrado.',
        color: 'danger',
        shouldShowTimeoutProgress: true,
      })
      return
    }
    if (!userId) {
      addToast({
        title: 'Error',
        description: 'Usuario no autenticado.',
        color: 'danger',
        shouldShowTimeoutProgress: true,
      })
      navigate('/login')
      return
    }

    await addProductoToCarrito(userId, producto.idProducto, cantidad)
    fetchCarrito()
    navigate('/carrito') // O la ruta que corresponda a tu carrito
  }

  useEffect(() => {
    if (!id) return
    setLoading(true)
    getProductoById(id)
      .then((producto) => {
        setProducto(producto)
        console.log('Producto obtenido:', producto) // Verifica que el producto se haya obtenido correctamente
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="text-center py-10">Cargando producto...</div>
  if (!producto) return <div className="text-center py-10 text-red-500">Producto no encontrado</div>

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-foreground/70">
          <span>Inicio</span>
          <span>/</span>
          <span>Productos</span>
          <span>/</span>
          <span className="text-primary-1">{producto.nombre}</span>
        </nav>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <ImageGallery images={[`/images/products/${producto.foto}`]} />

            {/* Product Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                ✨ Producto fresco
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                🚚 Envío rápido
              </span>
              {producto.stock > 0 && (
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-medium">
                  ✅ Disponible
                </span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Brand */}
            <div className="space-y-2">
              <p className="text-primary-1/70 font-semibold text-sm uppercase tracking-wide">
                {producto.proveedorNombre || 'Sin marca'}
              </p>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                {producto.nombre}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} size={16} />
                  ))}
                </div>
                <span className="text-foreground/70 text-sm">(4.8) • 245 reseñas</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-primary-1">
                  S/ {producto.precio.toFixed(2)}
                </span>
                {/* TODO: Descuento cuando esté disponible */}
                {/* <span className="text-xl text-gray-500 line-through">
                  S/ {(producto.precio * 1.2).toFixed(2)}
                </span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                  -20%
                </span> */}
              </div>
              <p className="text-foreground/70">Precio incluye IGV</p>
            </div>

            {/* Stock Status */}
            <div className="p-4 bg-secondary rounded-xl border border-gray-200/20">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${producto.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <div>
                  <p className="font-semibold text-foreground">
                    {producto.stock > 0 ? 'En stock' : 'Agotado'}
                  </p>
                  <p className="text-sm text-foreground/70">
                    {producto.stock > 0 ? `${producto.stock} unidades disponibles` : 'Producto no disponible'}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Descripción</h3>
              <p className="text-foreground/70 leading-relaxed">
                {producto.descripcion}
              </p>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-foreground font-medium">Cantidad:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={cantidad <= 1}
                  >
                    <MdRemove size={20} />
                  </button>
                  <span className="px-4 py-2 font-medium min-w-[60px] text-center">
                    {cantidad}
                  </span>
                  <button
                    onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))}
                    className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={cantidad >= producto.stock || producto.stock === 0}
                  >
                    <MdAdd size={20} />
                  </button>
                </div>
                <span className="text-sm text-foreground/70">
                  {producto.stock > 0
                    ? `Máximo ${producto.stock} unidades disponibles`
                    : 'Sin stock disponible'
                  }
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={handleProductos}
                    disabled={producto.stock === 0}
                    className="flex items-center justify-center gap-2 bg-primary-1 text-secondary font-semibold py-4 px-6 rounded-xl hover:bg-primary-1/90 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MdShoppingCart size={20} />
                    Agregar al carrito
                  </button>
                  <button
                    disabled={producto.stock === 0}
                    className="flex items-center justify-center gap-2 bg-accent text-secondary font-semibold py-4 px-6 rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleComprarAhora}
                  >
                    Comprar ahora
                  </button>
                </div>

                {/* Wishlist */}
                <button
                  onClick={toggleWishlist}
                  className="flex items-center justify-center gap-2 w-full border-2 border-gray-300 text-foreground font-medium py-3 px-6 rounded-xl hover:border-primary-1 hover:text-primary-1 transition-all duration-300"
                >
                  {isWishlisted ? (
                    <FaHeart className="text-red-500" size={20} />
                  ) : (
                    <FaRegHeart size={20} />
                  )}
                  {isWishlisted ? 'En tu lista de deseos' : 'Agregar a lista de deseos'}
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-foreground/70">SKU:</span>
                  <span className="ml-2 font-medium">{producto.idProducto.slice(-8)}</span>
                </div>
                <div>
                  <span className="text-foreground/70">Categoría:</span>
                  <span className="ml-2 font-medium text-primary-1">{producto.categoriaNombre}</span>
                </div>
              </div>

              {/* Share */}
              <div className="flex items-center gap-4 pt-4">
                <span className="text-foreground/70 font-medium">Compartir:</span>
                <div className="flex gap-3">
                  <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <FaFacebook size={16} />
                  </button>
                  <button className="p-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
                    <FaTwitter size={16} />
                  </button>
                  <button className="p-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                    <FaInstagram size={16} />
                  </button>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="flex items-center gap-4 pt-4">
                <span className="text-foreground/70 font-medium">Pagos seguros:</span>
                <div className="flex gap-2">
                  <SiVisa className="text-blue-600" size={32} />
                  <SiMastercard className="text-red-600" size={32} />
                  <SiPaypal className="text-blue-400" size={32} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <Promos />
        </div>

        {/* Contraentrega Info */}
        <div className="bg-secondary rounded-2xl p-8 mb-16 border border-gray-200/20">
          <h3 className="text-2xl font-bold text-foreground mb-6">Información de contraentrega</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <MdLocalShipping className="text-orange-600" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Contraentrega</h4>
                <p className="text-foreground/70 text-sm">Paga cuando recibas tu pedido</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <MdVerified className="text-green-600" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Entrega coordinada</h4>
                <p className="text-foreground/70 text-sm">Nos contactamos para coordinar</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <HiShieldCheck className="text-purple-600" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Compra segura</h4>
                <p className="text-foreground/70 text-sm">Sin pagos anticipados</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="bg-gray-50/50 py-16">
        <div className="container mx-auto px-4">
          <BannerHome image='/images/legumbres.webp' />
          <div className='flex flex-col lg:flex-row gap-6 mt-16'>
            <div className="hidden lg:block lg:flex-shrink-0">
              <ListCategorias
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>
            <div className="flex-1 lg:min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <h2 className='text-foreground text-3xl font-bold mb-2'>
                    {selectedCategory === null
                      ? 'Todos los productos'
                      : selectedCategory === producto?.idCategoria
                        ? 'Productos relacionados'
                        : 'Productos de esta categoría'
                    }
                  </h2>
                  <p className='text-foreground/70'>
                    {selectedCategory === null
                      ? 'Explora toda nuestra selección de productos'
                      : selectedCategory === producto?.idCategoria
                        ? `Otros productos de la categoría "${producto?.categoriaNombre}"`
                        : 'Descubre productos de esta categoría'
                    }
                  </p>
                </div>
                <Link
                  to="/shop"
                  className="bg-primary-1 text-secondary font-semibold px-6 py-3 rounded-xl hover:bg-primary-1/90 transition-colors duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl shrink-0"
                >
                  <MdShoppingCart size={16} />
                  Ver todos en Shop
                </Link>
              </div>
              <ListProducts selectedCategory={selectedCategory} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  function Promos() {
    const promoData = [
      {
        icon: <GiFruitBowl size={24} />,
        title: 'Frescura garantizada',
        description: 'Productos frescos todos los días. ¡Te lo aseguramos!',
        color: 'bg-green-100',
        iconColor: 'text-green-600'
      },
      {
        icon: <BiRefresh size={24} />,
        title: 'Devoluciones sin complicaciones',
        description: 'Tienes hasta 7 días para devolver productos sin costo adicional.',
        color: 'bg-blue-100',
        iconColor: 'text-blue-600'
      },
      {
        icon: <MdSecurity size={24} />,
        title: 'Compra 100% segura',
        description: 'Tus datos están protegidos con encriptación de última generación.',
        color: 'bg-purple-100',
        iconColor: 'text-purple-600'
      }
    ]

    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-foreground text-center">¿Por qué elegirnos?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promoData.map((promo, index) => (
            <div key={index} className="bg-secondary p-6 rounded-2xl border border-gray-200/20 hover:shadow-lg transition-all duration-300 text-center">
              <div className={`inline-flex p-4 ${promo.color} rounded-2xl mb-4`}>
                <span className={promo.iconColor}>
                  {promo.icon}
                </span>
              </div>
              <h4 className="font-bold text-foreground mb-2">{promo.title}</h4>
              <p className="text-foreground/70 text-sm leading-relaxed">{promo.description}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

