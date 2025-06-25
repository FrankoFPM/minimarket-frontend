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
    <div className="flex flex-col bg-background mx-auto shadow-xs container gap-4 col-span-3">
      <div className="overflow-x-auto">
        {loading ? (
          <div className="text-center py-8">Cargando productos...</div>
        ) : productos.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-secondary rounded-lg">
            No hay productos con bajo stock.
          </div>
        ) : (
          <Table headers={headers}>
            {productos.map((prod) => (
              <tr key={prod.idProducto} className="[&>td]:h-12 [&>td]:px-4 [&>td]:py-1.5">
                <td width={100}>
                  <div className='text-center w-32 whitespace-nowrap overflow-hidden text-ellipsis'>
                    {prod.idProducto}
                  </div>
                </td>
                <td className="text-center" width={200}>{prod.nombre}</td>
                <td className="text-center" width={160}>{prod.categoriaNombre}</td>
                <td className="text-center" width={200}>{prod.descripcion}</td>
                <td className="text-center" width={100}>{prod.stock}</td>
                <td className="text-center" width={200}>S/.{prod.precio.toFixed(2)}</td>
                <td className="text-center" width={160}>{prod.proveedorNombre}</td>
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