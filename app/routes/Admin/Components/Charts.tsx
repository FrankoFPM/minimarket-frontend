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
    <div style={{ height: 400 }} className='bg-secondary rounded-lg p-4 shadow-lg col-span-2'>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        legends={
          [
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 30,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              symbolSize: 18,
              symbolShape: 'circle'
            }
          ]
        }
      />
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
    <div style={{ height: 400 }}  className='bg-secondary rounded-lg p-4 shadow-lg'>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 30,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            symbolSize: 18,
            symbolShape: 'circle'
          }
        ]}
      />
    </div>
  )
}

