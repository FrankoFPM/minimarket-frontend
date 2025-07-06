import { useState, useMemo } from 'react'
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, addToast } from '@heroui/react'
import { TbEye, TbEdit } from 'react-icons/tb'
import { Table } from '../Components/Table'
import { SelectInput } from '~/Components/FormComponent'
import { useAllPedidos } from '~/hooks/usePedido'
import { getDetallePedidoById } from '~/services/detallePedidoService'
import { updatePedidoEstado } from '~/services/pedidoService'
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
        classNames={{
          backdrop: 'backdrop-blur-md'
        }}
        backdrop='blur'
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader>
                {pedidoSeleccionado ? `Detalle de venta #${pedidoSeleccionado.id}` : 'Detalle de venta'}
              </ModalHeader>
              <ModalBody>
                {detalleLoading ? (
                  <div className="text-center py-8">Cargando detalles...</div>
                ) : detallePedido && pedidoSeleccionado ? (
                  <div>
                    <div className="mb-2 font-semibold">Cliente: {pedidoSeleccionado.idUsuarioNombre} {pedidoSeleccionado.idUsuarioApellido}</div>
                    <div className="mb-2">Fecha: {new Date(pedidoSeleccionado.fechaPedido).toLocaleString()}</div>
                    <div className="mb-2">Estado: <ChipEstadoPedido estado={pedidoSeleccionado.estado} /></div>
                    <div className="mb-2">Total: <span className="font-bold">S/ {pedidoSeleccionado.total?.toFixed(2)}</span></div>
                    <div className="mb-2">Productos:</div>
                    <table className="w-full text-sm border">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-2 border">ID</th>
                          <th className="p-2 border">Nombre</th>
                          <th className="p-2 border">Cantidad</th>
                          <th className="p-2 border">Precio unitario</th>
                          <th className="p-2 border">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detallePedido.map(det => (
                          <tr key={det.id}>
                            <td className="p-2 border">{det.idProducto}</td>
                            <td className="p-2 border">{det.idProductoNombre}</td>
                            <td className="p-2 border">{det.cantidad}</td>
                            <td className="p-2 border">S/ {det.precioUnitario?.toFixed(2)}</td>
                            <td className="p-2 border">S/ {det.subtotal?.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">No se encontraron detalles para este pedido.</div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button onPress={() => setDetalleOpen(false)}>Cerrar</Button>
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