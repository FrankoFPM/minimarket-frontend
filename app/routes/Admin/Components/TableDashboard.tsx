import { useProductosLowStock } from '~/hooks/useProducto'
import { ChipStatus, Table } from './Table'
import { addToast } from '@heroui/react'
import { useEffect } from 'react'

export function TableDashboard() {

  const { productos, loading } = useProductosLowStock()

  const headers = [
    { text:'Código', className: 'text-center' },
    { text:'Nombre de producto', className: 'text-center' },
    { text:'Categoría', className: 'text-center' },
    { text:'Descripción', className: 'text-center' },
    { text:'Stock actual', className: 'text-center' },
    { text:'Precio de venta', className: 'text-center' },
    { text:'Proveedor', className: 'text-center' },
    { text:'Estado', className: 'text-center' },
  ]

  console.log('Productos de bajo stock:', productos)

  useEffect(() => {
    if (!loading && productos && productos.length > 0) {
      addToast({
        title: 'Productos de bajo stock',
        description: 'Estos productos tienen un stock menor a 5 unidades.',
        color: 'warning',
      })
    }
  }, [productos, loading])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          Productos con Bajo Stock
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Productos que requieren reabastecimiento (menos de 5 unidades)
        </p>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Cargando productos...</p>
          </div>
        ) : productos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
              ¡Excelente! No hay productos con bajo stock.
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
              Todos los productos tienen suficiente inventario.
            </p>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-4 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-700 dark:text-red-400 font-medium">
                Alerta de Stock Bajo
              </span>
            </div>
            <p className="text-red-600 dark:text-red-300 text-sm">
              {productos.length} producto{productos.length > 1 ? 's' : ''} necesita{productos.length > 1 ? 'n' : ''} reabastecimiento
            </p>
          </div>
        )}

        {productos.length > 0 && (
          <Table headers={headers}>
            {productos.map((prod) => (
              <tr key={prod.idProducto} className="[&>td]:h-12 [&>td]:px-4 [&>td]:py-1.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td width={100}>
                  <div className='text-center w-32 whitespace-nowrap overflow-hidden text-ellipsis font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded'>
                    {prod.idProducto}
                  </div>
                </td>
                <td className="text-center font-medium" width={200}>{prod.nombre}</td>
                <td className="text-center" width={160}>
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded-full text-xs">
                    {prod.categoriaNombre}
                  </span>
                </td>
                <td className="text-center text-gray-600 dark:text-gray-400" width={200}>{prod.descripcion}</td>
                <td className="text-center" width={100}>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    prod.stock <= 2
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
                  }`}>
                    {prod.stock} unidades
                  </span>
                </td>
                <td className="text-center font-semibold text-green-600 dark:text-green-400" width={200}>
                  S/.{prod.precio.toFixed(2)}
                </td>
                <td className="text-center" width={160}>
                  <span className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 px-2 py-1 rounded-full text-xs">
                    {prod.proveedorNombre}
                  </span>
                </td>
                <td className="text-center" width={100}>
                  <ChipStatus status={prod.estado === 'activo' ? 1 : 0} />
                </td>
              </tr>
            ))}
          </Table>
        )}
      </div>
    </div>
  )
}