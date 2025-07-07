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
}

const CardProducto = ({ detalle }: Props) => {
  const {
    cantidad,
    idProductoDescripcion,
    idProductoFoto,
    idProductoNombre,
    precioUnitario,
    subtotal,
    idProducto,
  } = detalle

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-3">
        <div className="relative">
          <img
            src={'/images/products/' + idProductoFoto}
            alt={idProductoNombre}
            className="w-16 h-16 object-cover rounded-lg border border-gray-200"
          />
          <div className="absolute -top-1 -right-1 bg-primary-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {cantidad}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 text-sm leading-5 mb-1 truncate">
            {idProductoNombre}
          </h4>
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
            {idProductoDescripcion}
          </p>
          <p className="text-xs text-gray-500 mb-2">
            SKU: {idProducto.slice(-8)}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-600">
                S/ {precioUnitario.toFixed(2)} × {cantidad}
              </span>
              <span className="font-semibold text-sm text-primary-1">
                S/ {subtotal.toFixed(2)}
              </span>
            </div>
            <a
              href={`/producto/${idProducto}`}
              className="text-primary-1 text-xs font-medium hover:text-primary-2 transition-colors underline-offset-2 hover:underline"
            >
              Ver producto
            </a>
          </div>
        </div>
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
    <section className="min-h-screen bg-gray-50">
      { loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-1 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Cargando pedidos...</p>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Mis Pedidos</h1>
            <p className="text-gray-600">Gestiona y revisa el estado de tus pedidos</p>
          </div>

          {pedido.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay pedidos aún</h3>
                <p className="text-gray-600 mb-6">Cuando realices tu primera compra, aparecerá aquí</p>
                <a
                  href="/shop"
                  className="inline-flex items-center px-6 py-3 bg-primary-1 text-white font-medium rounded-lg hover:bg-primary-2 transition-colors"
                >
                  Comenzar a comprar
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header del pedido */}
      <div className="bg-gradient-to-r from-primary-1 to-primary-2 px-6 py-4 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <TitleStatus estado={pedido.estado as TitleStatusProps['estado']} />
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Pedido #{pedido.id}</p>
            <p className="text-sm opacity-90">{fecha.format('DD/MM/YYYY HH:mm')}</p>
          </div>
        </div>
      </div>

      {/* Contenido del pedido */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Información del pedido */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Información del Pedido</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Método de pago:</span>
                  <span className="font-medium text-gray-900">{pedido.metodoPago}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-bold text-primary-1">S/ {pedido.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Actualizado:</span>
                  <span className="font-medium text-gray-900">{dayjs(pedido.updatedAt).format('DD/MM/YYYY HH:mm')}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Cliente</h3>
              <p className="text-sm text-gray-800 font-medium">
                {pedido.idUsuarioNombre} {pedido.idUsuarioApellido}
              </p>
            </div>

            {/* Acciones del pedido */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Acciones</h3>
              <PedidoActions estado={pedido.estado as PedidoActionsProps['estado']} pedido={pedido} uid={uid} />
            </div>
          </div>

          {/* Productos del pedido */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Productos ({detallesFiltrados.length})</h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <ScrollShadow hideScrollBar className="max-h-96">
                <div className="space-y-3">
                  {detallesFiltrados.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No hay productos en este pedido.</p>
                  ) : (
                    detallesFiltrados.map((detalle: DetallePedido) => (
                      <CardProducto key={detalle.id} detalle={detalle} />
                    ))
                  )}
                </div>
              </ScrollShadow>
            </div>
          </div>
        </div>
      </div>
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

  const getEstadoColor = (estado: TitleStatusProps['estado']) => {
    switch (estado) {
    case 'solicitado':
      return 'text-blue-100'
    case 'pendiente_pago':
      return 'text-yellow-100'
    case 'pagado':
      return 'text-green-100'
    case 'completado':
      return 'text-emerald-100'
    case 'cancelado':
      return 'text-red-100'
    default:
      return 'text-gray-100'
    }
  }

  return (
    <div className="flex items-center gap-2">
      <h2 className={`text-xl font-bold capitalize ${getEstadoColor(estado)}`}>
        {estado.replaceAll('_', ' ')}
      </h2>
      <Tooltip
        showArrow
        color="warning"
        closeDelay={2000}
        content={
          <div className="text-sm w-64 p-1">
            <p className="font-semibold text-gray-800">{titulo}</p>
            <p className="text-gray-600 mt-1">{descripcion}</p>
          </div>
        }
      >
        <FaQuestionCircle className="text-white/80 hover:text-white cursor-pointer transition-colors" />
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
      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        <span className="text-red-700 font-medium text-sm">Este pedido ha sido cancelado</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {(estado === 'solicitado' || estado === 'pendiente_pago') && (
        <Button
          variant="solid"
          color="primary"
          className="w-full font-medium"
          onPress={handleVerBoleta}
        >
          Proceder al Pago
        </Button>
      )}

      {(estado === 'pagado' || estado === 'completado') && (
        <Button
          variant="solid"
          color="primary"
          className="w-full font-medium"
          onPress={handleVerBoleta}
        >
          Ver Boleta de Venta
        </Button>
      )}

      {!['completado', 'cancelado'].includes(estado) && (
        <Button
          variant="flat"
          color="danger"
          className="w-full font-medium"
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
        size="md"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-gray-900">
                  ¿Cancelar pedido?
                </h3>
                <p className="text-sm text-gray-600 font-normal">
                  Esta acción no se puede deshacer
                </p>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Una vez cancelado, el pedido no podrá ser procesado ni entregado.
                  </p>

                  <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pedido:</span>
                      <span className="font-medium text-gray-900">#{pedido.id}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Cliente:</span>
                      <span className="font-medium text-gray-900">{pedido.idUsuarioNombre} {pedido.idUsuarioApellido}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Fecha:</span>
                      <span className="font-medium text-gray-900">{new Date(pedido.fechaPedido).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total:</span>
                      <span className="font-bold text-primary-1">S/ {pedido.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="default"
                  variant="flat"
                  onPress={onClose}
                  className="font-medium"
                >
                  Mantener Pedido
                </Button>
                <Button
                  color="danger"
                  variant="solid"
                  onPress={async () => {
                    await handleCancelar()
                    onClose()
                  }}
                  className="font-medium"
                >
                  Sí, Cancelar
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