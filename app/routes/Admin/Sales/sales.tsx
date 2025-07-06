import { useState, useMemo } from 'react'
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, addToast } from '@heroui/react'
import { TbEye, TbEdit } from 'react-icons/tb'
import { Table } from '../Components/Table'
import { SelectInput } from '~/Components/FormComponent'
import { useAllPedidos } from '~/hooks/usePedido'
import { getDetallePedidoById } from '~/services/detallePedidoService'
import { updatePedidoEstado, getBoleta } from '~/services/pedidoService'
import type { Pedido } from '~/Types/Pedido'
import type { DetallePedido } from '~/Types/DetallePedido'

// Componente para mostrar el estado de los pedidos
function ChipEstadoPedido({ estado }: { estado: string }) {
  const getEstiloEstado = (estado: string) => {
    switch (estado) {
    case 'solicitado':
      return 'bg-blue-500/25 text-blue-800 dark:text-blue-500'
    case 'pendiente_pago':
      return 'bg-yellow-500/25 text-yellow-800 dark:text-yellow-500'
    case 'pagado':
      return 'bg-green-500/25 text-green-800 dark:text-green-500'
    case 'completado':
      return 'bg-emerald-500/25 text-emerald-800 dark:text-emerald-500'
    case 'cancelado':
      return 'bg-red-500/25 text-red-800 dark:text-red-500'
    default:
      return 'bg-gray-500/25 text-gray-800 dark:text-gray-500'
    }
  }

  const getTextoEstado = (estado: string) => {
    switch (estado) {
    case 'solicitado': return 'Solicitado'
    case 'pendiente_pago': return 'Pendiente pago'
    case 'pagado': return 'Pagado'
    case 'completado': return 'Completado'
    case 'cancelado': return 'Cancelado'
    default: return 'Desconocido'
    }
  }

  return (
    <div className={`mx-auto w-24 text-center py-1 px-2 rounded-full text-xs font-semibold ${getEstiloEstado(estado)}`}>
      {getTextoEstado(estado)}
    </div>
  )
}

export default function ModuloSales() {
  // Estados posibles
  const ESTADOS = [
    { value: '', label: 'Todos' },
    { value: 'solicitado', label: 'Solicitado' },
    { value: 'pendiente_pago', label: 'Pendiente de pago' },
    { value: 'pagado', label: 'Pagado' },
    { value: 'completado', label: 'Completado' },
    { value: 'cancelado', label: 'Cancelado' },
  ]

  const headers = [
    { text:'Código de venta', className: 'text-center' },
    { text:'Cliente', className: 'text-center' },
    { text:'Fecha', className: 'text-center' },
    { text:'Estado', className: 'text-center' },
    { text:'Total', className: 'text-center' },
    { text:'Acciones', className: 'text-center' },
  ]

  // Headers para la tabla de productos en el modal
  const productHeaders = [
    { text: 'ID Producto', className: 'text-center' },
    { text: 'Nombre', className: 'text-left' },
    { text: 'Cantidad', className: 'text-center' },
    { text: 'Precio Unit.', className: 'text-right' },
    { text: 'Subtotal', className: 'text-right' },
  ]

  // Filtros
  const [estado, setEstado] = useState('')
  const [cliente, setCliente] = useState('')

  // Pedidos y loading
  const { pedidos, loading, refetchPedidos } = useAllPedidos()
  // Para modal de detalles
  const [detalleOpen, setDetalleOpen] = useState(false)
  const [detallePedido, setDetallePedido] = useState<DetallePedido[] | null>(null)
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState<Pedido | null>(null)
  const [detalleLoading, setDetalleLoading] = useState(false)

  // Para modal de edición
  const editModal = useDisclosure()
  const [pedidoParaEditar, setPedidoParaEditar] = useState<Pedido | null>(null)
  const [nuevoEstado, setNuevoEstado] = useState('')

  // Para descarga de boleta
  const [boletaLoading, setBoletaLoading] = useState(false)

  // Obtener lista de clientes únicos
  const clientesUnicos = useMemo(() => {
    const map = new Map<string, string>()
    pedidos.forEach(p => {
      const nombre = `${p.idUsuarioNombre} ${p.idUsuarioApellido}`.trim()
      if (nombre && !map.has(nombre)) map.set(nombre, nombre)
    })
    return Array.from(map.values())
  }, [pedidos])

  // Filtrar pedidos
  const pedidosFiltrados = useMemo(() => {
    return pedidos.filter(p => {
      const coincideEstado = estado ? p.estado === estado : true
      const coincideCliente = cliente ? (`${p.idUsuarioNombre} ${p.idUsuarioApellido}`.trim() === cliente) : true
      return coincideEstado && coincideCliente
    })
  }, [pedidos, estado, cliente])

  // Abrir modal de detalles
  const handleVerDetalle = async (pedido: Pedido) => {
    setDetalleLoading(true)
    setPedidoSeleccionado(pedido)
    try {
      // El servicio retorna un array de detalles
      const detalles = await getDetallePedidoById(pedido.id)
      setDetallePedido(Array.isArray(detalles) ? detalles : [detalles])
      setDetalleOpen(true)
    } catch {
      setDetallePedido(null)
      setDetalleOpen(false)
    } finally {
      setDetalleLoading(false)
    }
  }

  // Abrir modal de edición
  const handleEditarPedido = (pedido: Pedido) => {
    setPedidoParaEditar(pedido)
    setNuevoEstado(pedido.estado)
    editModal.onOpen()
  }

  // Descargar boleta
  const handleDescargarBoleta = async (pedido: Pedido) => {
    setBoletaLoading(true)
    try {
      // TODO: Necesitamos el idUsuario para la boleta. Por ahora usaremos un placeholder
      // En una implementación real, deberías obtener el idUsuario del pedido o del contexto
      const boletaUrl = await getBoleta(pedido.id, 'placeholder-user-id')

      // Crear enlace temporal para descarga
      const link = document.createElement('a')
      link.href = boletaUrl
      link.download = `boleta-pedido-${pedido.id}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Liberar el objeto URL
      URL.revokeObjectURL(boletaUrl)

      addToast({
        title: 'Boleta descargada',
        description: 'La boleta se ha descargado correctamente.',
        color: 'success',
        shouldShowTimeoutProgress: true,
      })
    } catch (error) {
      console.error('Error al descargar la boleta:', error)
      addToast({
        title: 'Error al descargar boleta',
        description: error instanceof Error ? error.message : 'No se pudo descargar la boleta.',
        color: 'danger',
        shouldShowTimeoutProgress: true,
      })
    } finally {
      setBoletaLoading(false)
    }
  }  // Obtener estados válidos para la transición
  const getEstadosValidos = (estadoActual: string) => {
    const transicionesValidas: Record<string, string[]> = {
      'solicitado': ['pendiente_pago', 'cancelado'],
      'pendiente_pago': ['pagado', 'cancelado'],
      'pagado': ['completado', 'cancelado'],
      'completado': [], // Estado final - no se puede cambiar
      'cancelado': [] // Estado final - no se puede cambiar
    }

    return ESTADOS.filter(estado => {
      if (estado.value === '') return false // Excluir "Todos"
      if (estado.value === estadoActual) return false // Excluir el estado actual
      return transicionesValidas[estadoActual]?.includes(estado.value) || false
    })
  }
  const handleActualizarEstado = async () => {
    if (!pedidoParaEditar) return

    // Validar que se haya seleccionado un nuevo estado
    if (!nuevoEstado || nuevoEstado === pedidoParaEditar.estado) {
      addToast({
        title: 'Error de validación',
        description: 'Debe seleccionar un estado diferente al actual.',
        color: 'warning',
        shouldShowTimeoutProgress: true,
      })
      return
    }

    // Validar transición
    const estadosValidos = getEstadosValidos(pedidoParaEditar.estado)
    const esTransicionValida = estadosValidos.some(estado => estado.value === nuevoEstado)

    if (!esTransicionValida) {
      addToast({
        title: 'Transición no válida',
        description: `No se puede cambiar de '${pedidoParaEditar.estado}' a '${nuevoEstado}'.`,
        color: 'warning',
        shouldShowTimeoutProgress: true,
      })
      return
    }

    try {
      await updatePedidoEstado(pedidoParaEditar.id, nuevoEstado)

      // Mostrar mensaje de éxito
      addToast({
        title: 'Estado actualizado',
        description: `El estado del pedido #${pedidoParaEditar.id} se actualizó correctamente a '${nuevoEstado}'.`,
        color: 'success',
        shouldShowTimeoutProgress: true,
      })

      // Actualizar la lista de pedidos
      await refetchPedidos()
      editModal.onClose()
    } catch (error) {
      console.error('Error al actualizar el estado:', error)

      // Mostrar mensaje de error
      addToast({
        title: 'Error al actualizar estado',
        description: error instanceof Error ? error.message : 'No se pudo actualizar el estado del pedido.',
        color: 'danger',
        shouldShowTimeoutProgress: true,
      })
    }
  }

  return (
    <div className="flex flex-col bg-background mx-auto my-10 container gap-4">
      <h1 className="text-3xl font-bold text-center">Panel de administración de ventas</h1>
      <p className="text-center">Desde este panel puedes gestionar y revisar todas las ventas realizadas.</p>

      {/* Filtros */}
      <div className="flex gap-4 w-fit mx-auto items-center justify-center mb-4">
        <SelectInput
          label="Estado"
          value={estado}
          onChange={e => setEstado(e.target.value)}
          className="w-48 rounded-md"
        >
          {ESTADOS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </SelectInput>
        <SelectInput
          label="Cliente"
          value={cliente}
          onChange={e => setCliente(e.target.value)}
          className="w-64 rounded-md"
        >
          <option value="">Todos</option>
          {clientesUnicos.map(nombre => (
            <option key={nombre} value={nombre}>{nombre}</option>
          ))}
        </SelectInput>
        <Button onPress={refetchPedidos} color="primary">Actualizar</Button>
      </div>

      <Table headers={headers}>
        {loading ? (
          <tr><td colSpan={headers.length} className="text-center py-8">Cargando...</td></tr>
        ) : pedidosFiltrados.length === 0 ? (
          <tr><td colSpan={headers.length} className="text-center py-8">No hay ventas para mostrar.</td></tr>
        ) : (
          pedidosFiltrados.map(pedido => (
            <tr key={pedido.id} className="[&>td]:h-12 [&>td]:px-4 [&>td]:py-1.5">
              <td className="text-center">{pedido.id}</td>
              <td className="text-center">{pedido.idUsuarioNombre} {pedido.idUsuarioApellido}</td>
              <td className="text-center">{new Date(pedido.fechaPedido).toLocaleDateString()}</td>
              <td className="text-center"><ChipEstadoPedido estado={pedido.estado} /></td>
              <td className="text-center">S/ {pedido.total?.toFixed(2)}</td>
              <td className="text-center flex gap-2 items-center justify-center">
                <TbEye className="text-blue-400 drop-shadow-xs cursor-pointer size-6" onClick={() => handleVerDetalle(pedido)} />
                <TbEdit className="text-amber-400 drop-shadow-xs cursor-pointer size-6" onClick={() => handleEditarPedido(pedido)} />
              </td>
            </tr>
          ))
        )}
      </Table>

      {/* Modal de detalles de venta */}
      <Modal
        isOpen={detalleOpen}
        onOpenChange={() => setDetalleOpen(false)}
        size="5xl"
        hideCloseButton
        classNames={{
          backdrop: 'backdrop-blur-md'
        }}
        backdrop='blur'
        scrollBehavior='outside'
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="border-b">
                <div className="flex items-center justify-between w-full">
                  <h2 className="text-xl font-bold">
                    {pedidoSeleccionado ? `Detalle de venta #${pedidoSeleccionado.id}` : 'Detalle de venta'}
                  </h2>
                  {pedidoSeleccionado && (
                    <Button
                      size="sm"
                      color="success"
                      variant="flat"
                      isLoading={boletaLoading}
                      onPress={() => handleDescargarBoleta(pedidoSeleccionado)}
                    >
                      📄 Descargar Boleta
                    </Button>
                  )}
                </div>
              </ModalHeader>
              <ModalBody className="p-6">
                {detalleLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando detalles...</p>
                  </div>
                ) : detallePedido && pedidoSeleccionado ? (
                  <div className="space-y-6">
                    {/* Información del pedido */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-3 text-gray-800">Información del Pedido</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm font-medium text-gray-600">Cliente:</span>
                          <p className="text-base font-semibold text-gray-900">
                            {pedidoSeleccionado.idUsuarioNombre} {pedidoSeleccionado.idUsuarioApellido}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Fecha del pedido:</span>
                          <p className="text-base text-gray-900">
                            {new Date(pedidoSeleccionado.fechaPedido).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Estado:</span>
                          <div className="mt-1">
                            <ChipEstadoPedido estado={pedidoSeleccionado.estado} />
                          </div>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Total:</span>
                          <p className="text-xl font-bold text-green-600">
                            S/ {pedidoSeleccionado.total?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tabla de productos */}
                    <div>
                      <h3 className="font-semibold text-lg mb-3 text-gray-800">Productos</h3>
                      <Table headers={productHeaders}>
                        {detallePedido.map(det => (
                          <tr key={det.id} className="[&>td]:h-12 [&>td]:px-4 [&>td]:py-1.5">
                            <td className="text-center font-mono text-sm">{det.idProducto}</td>
                            <td className="text-left">{det.idProductoNombre}</td>
                            <td className="text-center font-semibold">{det.cantidad}</td>
                            <td className="text-right">S/ {det.precioUnitario?.toFixed(2)}</td>
                            <td className="text-right font-semibold">S/ {det.subtotal?.toFixed(2)}</td>
                          </tr>
                        ))}
                      </Table>
                    </div>

                    {/* Resumen Financiero */}
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <h3 className="font-semibold text-lg mb-3 text-green-800">Resumen Financiero</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-green-700">Subtotal (sin impuesto):</span>
                          <span className="text-lg font-semibold text-green-600">
                            S/ {((pedidoSeleccionado.total || 0) - (pedidoSeleccionado.impuesto || 0)).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-green-700">Impuesto (IGV):</span>
                          <span className="text-lg font-semibold text-green-600">
                            S/ {pedidoSeleccionado.impuesto?.toFixed(2) || '0.00'}
                          </span>
                        </div>
                        <div className="border-t border-green-300 pt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-green-800">Total del Pedido:</span>
                            <span className="text-2xl font-bold text-green-600">
                              S/ {pedidoSeleccionado.total?.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📦</div>
                    <p className="text-gray-600 text-lg">No se encontraron detalles para este pedido.</p>
                  </div>
                )}
              </ModalBody>
              <ModalFooter className="border-t">
                <Button
                  color="primary"
                  variant="flat"
                  onPress={() => setDetalleOpen(false)}
                >
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Modal de edición de estado */}
      <Modal
        isOpen={editModal.isOpen}
        onOpenChange={editModal.onOpenChange}
        size="md"
        classNames={{
          backdrop: 'backdrop-blur-md'
        }}
        backdrop='blur'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {pedidoParaEditar ? `Editar estado de venta #${pedidoParaEditar.id}` : 'Editar estado de venta'}
              </ModalHeader>
              <ModalBody>
                {pedidoParaEditar && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        Cliente: {pedidoParaEditar.idUsuarioNombre} {pedidoParaEditar.idUsuarioApellido}
                      </p>
                      <div className="text-sm text-gray-600 mb-2">
                        Estado actual: <ChipEstadoPedido estado={pedidoParaEditar.estado} />
                      </div>
                      {getEstadosValidos(pedidoParaEditar.estado).length === 0 && (
                        <p className="text-sm text-red-600 mb-2">
                          ⚠️ No se pueden realizar cambios de estado desde &apos;{pedidoParaEditar.estado}&apos;
                        </p>
                      )}
                    </div>
                    <SelectInput
                      label="Nuevo estado"
                      value={nuevoEstado}
                      onChange={e => setNuevoEstado(e.target.value)}
                      className="rounded-md"
                    >
                      <option value="">Seleccione un estado</option>
                      {getEstadosValidos(pedidoParaEditar.estado).map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </SelectInput>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={handleActualizarEstado}>
                  Actualizar Estado
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}