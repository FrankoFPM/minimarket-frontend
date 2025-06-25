import { ScrollShadow } from '@heroui/react'
import dayjs from 'dayjs'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { auth } from '~/firebase/firebaseConfig'
import { useDetallePedidoByUser } from '~/hooks/useDetallePedido'
import { usePedido } from '~/hooks/usePedido'
import type { DetallePedido } from '~/Types/DetallePedido'
import type { Pedido } from '~/Types/Pedido'

interface Props {
  detalle: DetallePedido;
  pedido: Pedido;
}

const CardProducto = ({ detalle, pedido }: Props) => {
  const {
    cantidad,
    idProductoDescripcion,
    idProductoFoto,
    idProductoNombre,
    precioUnitario,
    subtotal,
    idProducto,
  } = detalle

  const {
    id,
    fechaPedido,
    idUsuarioNombre,
    idUsuarioApellido,
  } = pedido

  return (
    <div className="border border-primary-1 rounded-md p-3 bg-secondary shadow-sm text-sm">
      <div className="flex justify-between items-center mb-2">
        <div>
          <p className="font-medium">{new Date(fechaPedido).toLocaleDateString()}</p>
          <p className="text-xs text-gray-600">Pedido #{id}</p>
        </div>
        <p className="text-xs text-gray-600 text-right">
          Cliente: {idUsuarioNombre} {idUsuarioApellido}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <img
          src={'/images/products/' + idProductoFoto}
          alt={idProductoNombre}
          className="w-20 h-20 object-cover border border-primary-1 rounded-md"
        />

        <div className="flex-1">
          <p className="font-semibold text-[15px]">{idProductoNombre}</p>
          <p className="text-xs text-gray-600 mb-1">{idProductoDescripcion}</p>
          <p className="text-xs text-gray-500">Código: {idProducto}</p>

          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
            <span>Cant: {cantidad}</span>
            <span>Unit: PEN {precioUnitario.toFixed(2)}</span>
            <span className="font-semibold">
              Subtotal: PEN {subtotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2 text-right">
        <a
          href={`/producto/${idProducto}`}
          className="text-primary-1 text-xs underline hover:text-primary-2 transition"
        >
          Ver producto
        </a>
      </div>
    </div>
  )
}

const Pedidos = () => {

  const { pedido, loading }  = usePedido()
  const { detallePedidos } = useDetallePedidoByUser()

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
    <section>
      { loading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg text-gray-500">Cargando pedidos...</p>
        </div>
      ) : (
        <div className="container mx-auto p-6">
          <h1 className="text-3xl text-foreground font-bold mb-6">Mis Pedidos</h1>
          {pedido.length === 0 ? (
            <p className="text-lg text-gray-500">No tienes pedidos realizados.</p>
          ) : (
            <div className="flex flex-col gap-6">
              {pedido.map((item: Pedido) => (
                <PedidosDetalles key={item.id} pedido={item} productos={detallePedidos} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

function PedidosDetalles({ pedido, productos }: { pedido: Pedido, productos: DetallePedido[] }) {
  const fecha = dayjs(pedido.fechaPedido)

  // Filtra los detalles que correspondan a este pedido
  const detallesFiltrados = productos.filter(
    (detalle) => detalle.idPedidoId === pedido.id
  )

  console.log('Detalles filtrados:', detallesFiltrados)

  return (
    <div className="grid grid-cols-3 items-center justify-center gap-1">
      <div className="p-6 bg-secondary rounded-l-md shadow-xs h-full">
        <div className='flex justify-between items-center mb-4 border-b-1 border-primary-1 pb-2'>
          <h2 className='font-bold text-2xl text-primary-1'>{pedido.estado}</h2>
          <p className='font-semibold text-foreground'>Fecha: <span className='font-normal text-sm text-gray-400/90'>{fecha.format('DD/MM/YYYY HH:mm')}</span></p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-400/90">
          <div>ID del Pedido:</div>
          <div className="font-semibold text-primary-1">{pedido.id}</div>
          <div>Método de pago:</div>
          <div className="font-semibold text-primary-1">{pedido.metodoPago}</div>
          <div>Total:</div>
          <div className="font-semibold text-primary-1">PEN {pedido.total}</div>
          <div>Fecha de actualizacion</div>
          <div className="font-semibold text-primary-1">{dayjs(pedido.updatedAt).format('DD/MM/YYYY HH:mm')}</div>
          <div className="col-span-2 w-full border-b-1 border-primary-1 my-2"></div>
          <div>Nombre del cliente:</div>
          <div className="font-semibold text-primary-1">{pedido.idUsuarioNombre + ' ' + pedido.idUsuarioApellido}</div>
        </div>
      </div>
      <section className='w-full bg-secondary rounded-r-md shadow-xs col-span-2 p-6'>
        <h3 className='text-lg font-semibold text-primary-1 mb-4'>Productos del Pedido</h3>
        <ScrollShadow hideScrollBar className='h-56'>
          <div className='grid grid-cols-2 gap-6'>
            {detallesFiltrados.length === 0 ? (
              <p className='text-gray-500'>No hay productos en este pedido.</p>
            ) : (
              detallesFiltrados.map((detalle: DetallePedido) => (
                <CardProducto key={detalle.id} detalle={detalle} pedido={pedido} />
              ))
            )}
          </div>
        </ScrollShadow>
      </section>
    </div>
  )

}

export default Pedidos