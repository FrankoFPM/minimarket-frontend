import { CardsReport } from './Components/Cards'
import { PieChartCategorias, PieChartUsuariosPorRol } from './Components/Charts'
import { TableDashboard } from './Components/TableDashboard'

export default function AdminIndex() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Panel de Administración
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Gestiona todos los aspectos de tu tienda desde aquí
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Cards Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Resumen General
          </h2>
          <CardsReport />
        </div>

        {/* Analytics Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Análisis y Reportes
          </h2>
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
            <PieChartCategorias />
            <PieChartUsuariosPorRol />
            <div className="lg:col-span-2 xl:col-span-3">
              <TableDashboard />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}