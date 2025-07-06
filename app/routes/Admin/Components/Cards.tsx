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
    <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-900 opacity-50"></div>

      {/* Content */}
      <div className="relative p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              {title}
            </h3>
            <p className="text-3xl font-bold text-gray-800 dark:text-white group-hover:text-gray-900 transition-colors">
              {value}
            </p>
          </div>
          <div className={`p-4 rounded-2xl text-white text-3xl ${color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-xl"></div>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      <CardReport
        title="Usuarios"
        value={totalUsuarios}
        icon={<FaUsers />}
        color="bg-gradient-to-r from-blue-500 to-blue-600"
      />
      <CardReport
        title="Productos"
        value={totalProductos}
        icon={<FaBoxOpen />}
        color="bg-gradient-to-r from-yellow-500 to-orange-500"
      />
      <CardReport
        title="Pedidos"
        value={totalPedidos}
        icon={<FaShoppingCart />}
        color="bg-gradient-to-r from-green-500 to-emerald-500"
      />
      <CardReport
        title="Categorías"
        value={totalCategorias}
        icon={<FaTags />}
        color="bg-gradient-to-r from-purple-500 to-indigo-500"
      />
      <CardReport
        title="Proveedores"
        value={totalProveedores}
        icon={<FaClipboardList />}
        color="bg-gradient-to-r from-pink-500 to-rose-500"
      />
      <CardReport
        title="Carritos Activos"
        value={totalCarrito}
        icon={<FaShoppingCart />}
        color="bg-gradient-to-r from-orange-500 to-red-500"
      />
    </div>
  )
}
