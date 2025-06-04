import { ButtonsActions, ChipStatus, Table } from './Components/Table'

export default function SuppliersIndex() {

  const headers = [
    { text: '#', className: 'text-center' },
    { text:'Proovedores', className: 'text-left' },
    { text:'Producto', className: 'text-left' },
    { text: 'Fecha de compra', className: 'text-left' },
    { text: 'Cantidad', className: 'text-left' },
    { text: 'Precio unitario', className: 'text-left' },
    { text: 'Total', className: 'text-left' },
    { text: 'Estado', className: 'text-center' },
    { text: 'Acciones', className: 'text-center' },
  ]

  return (
    <div className="flex flex-col bg-background mx-auto my-10 container gap-4">
      <h1 className="text-3xl font-bold text-center">Gestión de Proovedores</h1>
      <p className="text-center">Aquí puedes gestionar todos los proovedores de tu tienda.</p>
      <Table headers={headers}>

        <tr className="[&>td]:h-12 [&>td]:px-4 [&>td]:py-1.5">
          <td className="text-center" width={160}>1</td>
          <td>Proveedor xyz</td>
          <td>Manzana</td>
          <td>10/03/25</td>
          <td>100</td>
          <td>S/.1.50</td>
          <td>S/.135.00</td>
          <td className="">
            <ChipStatus status={1} />
          </td>
          <td className="">
            <div className="flex items-center justify-center text-2xl gap-4">
              <ButtonsActions />
            </div>
          </td>
        </tr>
      </ Table>
    </div>
  )
}