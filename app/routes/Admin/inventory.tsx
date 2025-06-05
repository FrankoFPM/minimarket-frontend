import { ButtonsActions, ChipStatus, Table } from './Components/Table'

export default function InventoryIndex() {

  const headers = [
    { text: 'Codigo', className: 'text-center' },
    { text:'Nombre', className: 'text-left' },
    { text:'Stock', className: 'text-left' },
    { text: 'Stock minimo', className: 'text-left' },
    { text: 'Precio costo', className: 'text-left' },
    { text: 'Stock venta', className: 'text-left' },
    { text: 'Fecha de Vencimiento', className: 'text-left' },
    { text: 'Estado', className: 'text-center' },
    { text: 'Acciones', className: 'text-center' },
  ]

  return (
    <div className="flex flex-col bg-background mx-auto my-10 container gap-4">
      <h1 className="text-3xl font-bold text-center">Gestión de Inventario</h1>
      <p className="text-center">Aquí puedes gestionar todo el inventario de tu tienda.</p>
      <Table headers={headers}>

        <tr className="[&>td]:h-12 [&>td]:px-4 [&>td]:py-1.5">
          <td className="text-center" width={160}>1</td>
          <td>UC100</td>
          <td>Manzana</td>
          <td>65</td>
          <td>20</td>
          <td>S/.1.50</td>
          <td>S/.3.00</td>
          <td>10/03/25</td>
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