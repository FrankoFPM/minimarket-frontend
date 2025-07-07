import { MdLocalGroceryStore, MdTrendingUp, MdStar, MdInventory } from 'react-icons/md'
import { useCategorias } from '~/hooks/useCatalogos'

interface StatsProps {
  totalProducts: number
  filteredCount: number
}

export function ProductStats({ totalProducts, filteredCount }: StatsProps) {
  const { categorias } = useCategorias()

  const stats = [
    {
      icon: <MdLocalGroceryStore size={20} />,
      label: 'Total productos',
      value: totalProducts,
      color: 'bg-blue-500'
    },
    {
      icon: <MdTrendingUp size={20} />,
      label: 'Disponibles',
      value: filteredCount,
      color: 'bg-green-500'
    },
    {
      icon: <MdStar size={20} />,
      label: 'Calificación promedio',
      value: '4.8',
      color: 'bg-yellow-500'
    },
    {
      icon: <MdInventory size={20} />,
      label: 'Categorías',
      value: categorias.length,
      color: 'bg-purple-500'
    }
    // TODO: Agregar estadística de descuentos cuando el backend esté listo
    // {
    //   icon: <MdDiscount size={20} />,
    //   label: 'Con descuento',
    //   value: discountedProducts,
    //   color: 'bg-red-500'
    // }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-secondary rounded-xl p-4 border border-gray-200/20 shadow-sm">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${stat.color} text-white`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-foreground/70">{stat.label}</p>
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
