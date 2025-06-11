import { BiRefresh } from 'react-icons/bi'
import { GiFruitBowl } from 'react-icons/gi'
import { MdSecurity } from 'react-icons/md'
import { FaFacebook, FaTwitter, FaInstagram, FaHeart } from 'react-icons/fa'
import { SiVisa, SiMastercard, SiPaypal } from 'react-icons/si'

import 'swiper/css'
import { InputField } from '~/Components/FormComponent'
import { ImageGallery } from '../components/ImageGallery'
import { BannerHome, CardPromo } from '../components/Cards'
import { ListCategorias, ListProducts } from './ListProducts'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { getProductoById } from '~/services/productosService'
import type { Producto } from '~/Types/Producto'

export default function Product() {

  /**usar
   * export const getProductoById = async (id: string): Promise<Producto> => {
  try {
    const response = await axios.get<Producto>(`${API_URL}/producto/${id}`)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al obtener producto:', error.response?.data || error.message)
    } else {
      console.error('Error al obtener producto:', (error as Error).message)
    }
    throw new Error('Error al obtener producto.')
  }
}
   */
  const { id } = useParams<{ id: string }>()
  const [producto, setProducto] = useState<Producto | null>(null)
  const [loading, setLoading] = useState(true)
  const handleProductos = () => {
    const cantidadInput = document.querySelector<HTMLInputElement>('input[name="cantidad"]')
    const cantidad = parseInt(cantidadInput?.value || '1')

    if (isNaN(cantidad) || cantidad <= 0) {
      alert('Ingrese una cantidad válida')
      return
    }

    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]')

    if (!producto) return null
    const index = carrito.findIndex((item: Producto) => item.idProducto === producto.idProducto)

    if (index >= 0) {
      carrito[index].cantidad += cantidad
    } else {
      carrito.push({
        ...producto,
        cantidad: cantidad
      })
    }

    localStorage.setItem('carrito', JSON.stringify(carrito))
    window.dispatchEvent(new Event('carritoActualizado')) // dispara el evento para que actualice
    alert('Producto agregado al carrito') // Mensaje de alerta, se puede modificar
  }

  useEffect(() => {
    if (!id) return
    setLoading(true)
    getProductoById(id.toUpperCase())
      .then((producto) => {
        setProducto(producto)
        console.log('Producto obtenido:', producto) // Verifica que el producto se haya obtenido correctamente
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="text-center py-10">Cargando producto...</div>
  if (!producto) return <div className="text-center py-10 text-red-500">Producto no encontrado</div>

  return (
    <div className="min-h-screen container mx-auto">
      <div className='flex flex-row gap-20 items-start justify-center my-10'>
        <div className='flex flex-row gap-6 items-start justify-center w-full'>
          {/* imagen del producto y sub imagenes */}
          <ImageGallery images={[`/images/products/${producto.foto}`]}/>
          <div>
            <h3 className="text-2xl font-bold text-foreground">{producto.nombre}</h3>
            <div className='border-b border-gray-300 w-full my-2'></div>
            {/* stock */}
            <div className='flex flex-row gap-2 my-2'>
              <span className='text-foreground font-semibold'>Stock:</span>
              <span className='text-primary-1'>{producto.stock > 0 ? 'Disponible' : 'Agotado'}</span>
            </div>
            {/* precio */}
            <div className='flex flex-row gap-2 my-2'>
              <span className='text-foreground font-semibold'>Precio:</span>
              <span className='text-primary-1'>S/ {producto.precio.toFixed(2)}</span>
            </div>
            {/* descripcion */}
            <div className='flex flex-col gap-2 justify-center my-2'>
              <span className='text-foreground font-semibold'>Descripción:</span>
              <p className='text-foreground/50'>{producto.descripcion}</p>
            </div>
            {/* formulario y botones */}
            <div className='flex flex-col gap-2 justify-center my-2'>
              <InputField
                type='number'
                name='cantidad'
                label='Cantidad'
                placeholder='1'
                className='w-32'
                min={1}
                max={10}
                required
              />
              <div className='grid grid-cols-2 gap-2 my-2'>
                <button onClick={handleProductos} className='bg-primary-1 text-white rounded-md p-2'>Agregar al carrito</button>
                <button className='bg-black dark:bg-slate-700 text-white rounded-md p-2'>Comprar ahora</button>
              </div>
              {/* whistlist */}
              <div className='flex items-center gap-2 my-2'>
                <FaHeart className='text-red-500 cursor-pointer' size={24} />
                <label htmlFor="whistlist" className='text-foreground/50'>Agregar a la lista de deseos</label>
              </div>
              <div className='border-b border-gray-300 w-full my-2'></div>
              {/* sku */}
              <div className='flex flex-row gap-2 my-2'>
                <span className='text-foreground font-semibold'>SKU:</span>
                <span className='text-primary-1'>123456</span>
              </div>
              {/* compartir */}
              <div className='flex flex-row gap-2 my-2'>
                <span className='text-foreground font-semibold'>Compartir:</span>
                <div className='flex flex-row gap-2'>
                  <FaFacebook className='text-blue-600 cursor-pointer' size={24} />
                  <FaTwitter className='text-blue-400 cursor-pointer' size={24} />
                  <FaInstagram className='text-pink-500 cursor-pointer' size={24} />
                </div>
              </div>
              {/* métodos de pago */}
              <div className='flex flex-row gap-2 my-2'>
                <span className='text-foreground font-semibold'>Métodos de pago:</span>
                <div className='flex flex-row gap-2'>
                  <SiVisa className='text-blue-600' size={30} />
                  <SiMastercard className='text-red-600' size={30} />
                  <SiPaypal className='text-blue-400' size={30} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-6 items-center justify-center w-72'>
          <Promos />
        </div>
      </div>
      <BannerHome image='/images/legumbres.webp' />
      <div className='flex flex-row gap-4 mb-10'>
        <ListCategorias />
        <div className="w-full h-full text-primary-1 p-4">
          <h2 className='text-foreground text-2xl font-bold'>Nuestros productos</h2>
          <p className='text-foreground'>Explora nuestra amplia gama de productos frescos y de calidad.</p>
          <ListProducts />
        </div>
      </div>
    </div>
  )

  function Promos() {
    const promoFrescura = {
      icon: <GiFruitBowl size={20} />,
      title: 'Frescura garantizada',
      description: 'Productos frescos todos los días. ¡Te lo aseguramos!'
    }
    const promoDevolucion = {
      icon: <BiRefresh size={20} />,
      title: 'Devoluciones sin complicaciones',
      description: 'Tienes hasta 7 días para devolver productos sin costo adicional.'
    }
    const promoSeguridad = {
      icon: <MdSecurity size={20} />,
      title: 'Compra 100% segura',
      description: 'Tus datos están protegidos con encriptación de última generación.'
    }
    return (
      <>
        <CardPromo {...promoFrescura} />
        <CardPromo {...promoDevolucion} />
        <CardPromo {...promoSeguridad} />
      </>
    )
  }
}

