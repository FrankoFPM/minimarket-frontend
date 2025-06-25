import { CardsReport } from './Components/Cards'
import { PieChartCategorias, PieChartUsuariosPorRol } from './Components/Charts'

export default function AdminIndex() {

  return (
    <div className="flex flex-col bg-background mx-auto my-10 container gap-4">
      <h1 className="text-3xl font-bold text-center">Bienvenido al panel de administración</h1>
      <p className="text-center mb-5">Aquí puedes gestionar todos los aspectos de tu tienda.</p>
      <CardsReport />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        <PieChartCategorias />
        <PieChartUsuariosPorRol />
      </div>
    </div>
  )
}