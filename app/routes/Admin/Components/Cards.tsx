import type { JSX } from 'react'
import {
  FaUsers,
  FaShoppingCart,
  FaBoxOpen,
  FaTags,
  FaClipboardList
} from 'react-icons/fa'
import { useCarrito } from '~/hooks/useCarrito'
import {
  useCategorias,
  useProveedores
} from '~/hooks/useCatalogos'
import { useAllPedidos } from '~/hooks/usePedido'
import { useAllProductos } from '~/hooks/useProducto'
import { useUsuarios } from '~/hooks/useUsuarios'

interface CardReportProps {
  title: string
  value: number | string
  icon: JSX.Element
  color: string
}

function CardReport({ title, value, icon, color }: CardReportProps) {
  return (
    <div
      className={'rounded-xl p-6 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 border-l-4'}
    >
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full text-white text-2xl ${color}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-gray-600 text-sm font-medium uppercase tracking-wide">
            {title}
          </h3>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  )
}

export function CardsReport() {
  const { usuarios } = useUsuarios()
  const { pedidos } = useAllPedidos()
  const { productos } = useAllProductos()
  const { categorias } = useCategorias()
  const { proveedores } = useProveedores()
  const {carrito} = useCarrito()

  const totalUsuarios = usuarios.length || 0
  const totalPedidos = pedidos.length || 0
  const totalProductos = productos.length || 0
  const totalCategorias = categorias.length || 0
  const totalProveedores = proveedores.length || 0
  const totalCarrito = carrito.length || 0

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <CardReport
        title="Usuarios"
        value={totalUsuarios}
        icon={<FaUsers />}
        color="bg-blue-500"
      />
      <CardReport
        title="Productos"
        value={totalProductos}
        icon={<FaBoxOpen />}
        color="bg-yellow-500"
      />
      <CardReport
        title="Pedidos"
        value={totalPedidos}
        icon={<FaShoppingCart />}
        color="bg-green-500"
      />
      <CardReport
        title="Categorías"
        value={totalCategorias}
        icon={<FaTags />}
        color="bg-purple-500"
      />
      <CardReport
        title="Proveedores"
        value={totalProveedores}
        icon={<FaClipboardList />}
        color="bg-pink-500"
      />
      <CardReport
        title="Carritos Activos"
        value={totalCarrito}
        icon={<FaShoppingCart />}
        color="bg-orange-500"
      />
    </div>
  )
}
