import { ChipStatus, Table } from '../Components/Table'
import { getProductos} from '~/services/productosService'
import { useEffect, useState } from 'react'
import type { Producto } from '~/Types/Producto'
import { ModalAdd } from './ModalAdd'
import { ModalActions } from './ModalActions'

export default function ModuloProduct() {
  const headers = [
    { text:'Código', className: 'text-center' },
    { text:'Nombre de producto', className: 'text-center' },
    { text:'Categoría', className: 'text-center' },
    { text:'Descripción', className: 'text-center' },
    { text:'Stock actual', className: 'text-center' },
    { text:'Precio de venta', className: 'text-center' },
    { text:'Proveedor', className: 'text-center' },
    { text:'Estado', className: 'text-center' },
    { text:'Acciones', className: 'text-center' },
  ]

  const [products, setProducts] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = () => {
    setLoading(true)
    getProductos()
      .then((data) => setProducts(data))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="flex flex-col bg-background mx-auto my-10 container gap-4">
      <h1 className="text-3xl font-bold text-center">Panel de administración</h1>
      <p className="text-center">Desde este panel puedes gestionar los productos.</p>
      <ModalAdd onSuccess={fetchProducts} />
      {loading ? (
        <div className="text-center py-8">Cargando productos...</div>
      ) : (
        <Table headers={headers}>
          {products.map((prod) => (
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
              <td className="text-center">
                <div className="flex items-center justify-center text-2xl gap-4">
                  <ModalActions producto={prod} onSuccess={fetchProducts} />
                </div>
              </td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  )
}

