import { useEffect, useState } from 'react'
import { ResponsivePie } from '@nivo/pie'
import { useAllProductos } from '~/hooks/useProducto'
import { useUsuarios } from '~/hooks/useUsuarios'

export function PieChartCategorias() {
  const { productos } = useAllProductos()
  const [data, setData] = useState<{ id: string; label: string; value: number }[]>([])

  useEffect(() => {
    const conteo = productos.reduce((acc: Record<string, number>, prod) => {
      const categoria = prod.categoriaNombre || 'Sin categoría'
      acc[categoria] = (acc[categoria] || 0) + 1
      return acc
    }, {})

    const formateado = Object.entries(conteo).map(([key, value]) => ({
      id: key,
      label: key,
      value: Number(value)
    }))

    setData(formateado)
    console.log('Datos del gráfico:', formateado)
  }, [productos])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          Productos por Categoría
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Distribución de productos en el inventario
        </p>
      </div>
      <div style={{ height: 350 }}>
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={{ scheme: 'category10' }}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#374151"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
          theme={{
            background: 'transparent',
            text: {
              fontSize: 12,
              fill: '#374151',
              outlineWidth: 0,
              outlineColor: 'transparent'
            },
            tooltip: {
              container: {
                background: 'white',
                color: '#374151',
                fontSize: 12,
                borderRadius: 8,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }
            }
          }}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#6b7280',
              itemDirection: 'left-to-right',
              symbolSize: 18,
              symbolShape: 'circle'
            }
          ]}
        />
      </div>
    </div>
  )
}

export function PieChartUsuariosPorRol() {
  const { usuarios } = useUsuarios() // Asumiendo que tienes un hook para obtener usuarios
  const [data, setData] = useState<{ id: string; label: string; value: number }[]>([])

  useEffect(() => {
    const conteo = usuarios.reduce((acc: Record<string, number>, user) => {
      const rol = user.rol || 'Sin rol'
      acc[rol] = (acc[rol] || 0) + 1
      return acc
    }, {})
    console.log('Conteo de usuarios por rol:', conteo)

    const formateado = Object.entries(conteo).map(([key, value]) => ({
      id: key,
      label: key,
      value: Number(value)
    }))

    setData(formateado)
    console.log('Datos del gráfico de usuarios:', formateado)
  }, [usuarios])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          Usuarios por Rol
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Distribución de roles en el sistema
        </p>
      </div>
      <div style={{ height: 350 }}>
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={{ scheme: 'pastel1' }}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#374151"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
          theme={{
            background: 'transparent',
            text: {
              fontSize: 12,
              fill: '#374151',
              outlineWidth: 0,
              outlineColor: 'transparent'
            },
            tooltip: {
              container: {
                background: 'white',
                color: '#374151',
                fontSize: 12,
                borderRadius: 8,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }
            }
          }}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#6b7280',
              itemDirection: 'left-to-right',
              symbolSize: 18,
              symbolShape: 'circle'
            }
          ]}
        />
      </div>
    </div>
  )
}

