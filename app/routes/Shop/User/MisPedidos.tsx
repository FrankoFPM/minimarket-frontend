import { addToast, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, Tooltip, useDisclosure } from '@heroui/react'
import dayjs from 'dayjs'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { FaQuestionCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import { auth } from '~/firebase/firebaseConfig'
import { useDetallePedidoByUser } from '~/hooks/useDetallePedido'
import { usePedido } from '~/hooks/usePedido'
import { cancelarPedido, getBoleta } from '~/services/pedidoService'
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
  const [idUsuario, setIdUsuario] = useState<string>('')
  const { pedido, loading }  = usePedido()
  const { detallePedidos } = useDetallePedidoByUser()

  const navigate = useNavigate()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login')
        return
      }
      setIdUsuario(user.uid)
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
                <PedidosDetalles key={item.id} pedido={item} productos={detallePedidos} uid={idUsuario}/>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

function PedidosDetalles({ pedido, productos, uid }: { pedido: Pedido, productos: DetallePedido[], uid: string }) {
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
          <TitleStatus estado={pedido.estado as TitleStatusProps['estado']} />
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
          <div className="col-span-2 w-full border-b-1 border-primary-1 my-2"></div>
          <PedidoActions estado={pedido.estado as PedidoActionsProps['estado']} pedido={pedido} uid={uid} />
        </div>
      </div>
      <section className='w-full h-full bg-secondary rounded-r-md shadow-xs col-span-2 p-6'>
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

interface TitleStatusProps {
  estado: 'solicitado' | 'pendiente_pago' | 'pagado' | 'completado' | 'cancelado';
}

const getEstadoMensaje = (estado: TitleStatusProps['estado']) => {
  switch (estado) {
  case 'solicitado':
    return {
      titulo: 'Pedido Solicitado',
      descripcion: 'Tu pedido ha sido registrado y está esperando el siguiente paso en el proceso.',
    }
  case 'pendiente_pago':
    return {
      titulo: 'Pago Pendiente',
      descripcion: 'Tu pedido está esperando que se realice el pago para continuar con el proceso.',
    }
  case 'pagado':
    return {
      titulo: 'Pago Confirmado',
      descripcion: 'El pago ha sido recibido. Tu pedido será procesado pronto.',
    }
  case 'completado':
    return {
      titulo: 'Pedido Completado',
      descripcion: 'Tu pedido ha sido entregado exitosamente.',
    }
  case 'cancelado':
    return {
      titulo: 'Pedido Cancelado',
      descripcion: 'Este pedido ha sido cancelado y no será procesado.',
    }
  default:
    return {
      titulo: 'Estado Desconocido',
      descripcion: 'No se reconoce el estado actual del pedido.',
    }
  }
}

export function TitleStatus({ estado }: TitleStatusProps) {
  const { titulo, descripcion } = getEstadoMensaje(estado)

  return (
    <div className="flex items-center gap-2">
      <h2 className="text-2xl font-bold text-primary-1 capitalize">{estado.replaceAll('_', ' ')}</h2>
      <Tooltip
        showArrow
        color="warning"
        closeDelay={2000}
        content={
          <div className="text-sm w-52">
            <p className="font-semibold">{titulo}</p>
            <p>{descripcion}</p>
          </div>
        }
      >
        <FaQuestionCircle className="text-yellow-400 cursor-pointer" />
      </Tooltip>
    </div>
  )
}

interface PedidoActionsProps {
  estado: 'solicitado' | 'pendiente_pago' | 'pagado' | 'completado' | 'cancelado';
  pedido: Pedido,
  uid: string,
}

export function PedidoActions({ estado, pedido, uid }: PedidoActionsProps) {

  const {isOpen, onOpen, onOpenChange, } = useDisclosure()

  const handleCancelar = async () => {
    try {
      console.log(`Pedido ${pedido.id} cancelado.`)
      await cancelarPedido(pedido.id, uid)
      addToast({
        title: 'Pedido Cancelado',
        description: `El pedido ${pedido.id} ha sido cancelado exitosamente.`,
        color: 'success',
        shouldShowTimeoutProgress: true,
      })
    } catch (error) {
      console.error(`Error al cancelar el pedido ${pedido.id}:`, error)
      addToast({
        title: 'Error al cancelar el pedido',
        description: `No se pudo cancelar el pedido ${pedido.id}. Por favor, inténtalo de nuevo más tarde.`,
        color: 'warning',
        shouldShowTimeoutProgress: true,
      })
    }

  }

  const handleVerBoleta = async () => {
    try {
      const url = await getBoleta(pedido.id, uid)
      // Para abrir en una nueva pestaña:
      window.open(url, '_blank')
      /* pa descargar el PDF:
      const a = document.createElement('a')
      a.href = url
      a.download = `boleta_${pedido.id}.pdf`
      a.click()
      window.URL.revokeObjectURL(url)*/
    } catch (error) {
      console.error('Error al obtener la boleta:', error)
      addToast({
        title: 'Error',
        description: 'No se pudo obtener la boleta.',
        color: 'danger',
      })
    }
  }

  if (estado === 'cancelado') {
    return (
      <div className="text-red-500 font-semibold col-span-2">
        Este pedido ha sido cancelado.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 col-span-2 items-center">
      {(estado === 'solicitado' || estado === 'pendiente_pago') && (
        <Button
          variant="solid"
          color="primary"
          className="w-full"
          onPress={handleVerBoleta}
        >
          Proceder al Pago
        </Button>
      )}

      {(estado === 'pagado' || estado === 'completado') && (
        <Button
          variant="solid"
          color="primary"
          className="w-full"
          onPress={handleVerBoleta}
        >
        Ver Boleta de Venta
        </Button>
      )}

      {!['completado', 'cancelado'].includes(estado) && (
        <Button
          variant="flat"
          color="danger"
          className="w-full col-start-2"
          onPress={onOpen}
        >
        Cancelar Pedido
        </Button>
      )}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop='blur'
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h3 className="text-lg font-semibold mb-3 text-gray-800 text-center">
                    ¿Estás seguro de que deseas cancelar este pedido?
                </h3>
              </ModalHeader>
              <ModalBody>
                <div className="text-center">

                  <p className="text-gray-600 mb-4">
                    Esta acción es irreversible. El pedido será cancelado y no podrás realizar más acciones sobre él.
                  </p>
                  <div className="bg-gray-100 p-4 rounded-md text-sm text-left">
                    <p><span className="font-semibold">Pedido:</span> #{pedido.id}</p>
                    <p><span className="font-semibold">Cliente:</span> {pedido.idUsuarioNombre} {pedido.idUsuarioApellido}</p>
                    <p><span className="font-semibold">Fecha:</span> {new Date(pedido.fechaPedido).toLocaleDateString()}</p>
                    <p><span className="font-semibold">Total:</span> S/. {pedido.total.toFixed(2)}</p>
                    <p className="text-red-500 font-semibold mt-2">Esta acción no se puede deshacer.</p>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color="primary" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="danger" onPress={async () => {
                  await handleCancelar()
                  onClose()
                }}>
                  Confirmar Cancelación
                </Button>
              </ModalFooter>

            </>
          )
          }
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Pedidos