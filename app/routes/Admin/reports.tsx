import { ButtonsActions, ChipStatus, Table } from './Components/Table'

export default function ReportsIndex() {

  const headers = [
    { text:'Fecha', className: 'text-center' },
    { text:'Venta total', className: 'text-left' },
    { text:'Ganancia total', className: 'text-left' },
    { text:'# Productos vendidos', className: 'text-left' },
    { text:'Metodo de pago', className: 'text-left' },
    { text:'Estado', className: 'text-center' },
    { text:'Acciones', className: 'text-center' },
  ]

  return (
    <div className="flex flex-col bg-background mx-auto my-10 container gap-4">
      <h1 className="text-3xl font-bold text-center">Gestión de Reportes</h1>
      <p className="text-center">Aquí puedes gestionar todos los reportes de tu tienda.</p>
      <Table headers={headers}>

        <tr className="[&>td]:h-12 [&>td]:px-4 [&>td]:py-1.5">
          <td>10/03/25</td>
          <td className="text-center" width={160}>40</td>
          <td>S/.10.00</td>
          <td>13</td>
          <td>Efectivo</td>
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