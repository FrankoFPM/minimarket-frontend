import { useEffect, useState } from 'react'
import { ContaninerTest } from './appTest'

export const TestProductos = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [message, setMessage] = useState<string>('')
  const [recommendation, setRecommendation] = useState<string>('')
  useEffect(() => {
    const fetchProductos = async () => {
      setStatus('loading')
      setMessage('Cargando productos...')
      try {
        // Aquí deberías llamar a tu servicio para obtener los productos
        // const productos = await getProductos()
        // Simulando una respuesta exitosa
        const productos = [{ id: 1, nombre: 'Producto 1' }, { id: 2, nombre: 'Producto 2' }]
        setStatus('ok')
        setMessage('Productos obtenidos correctamente')
        setRecommendation(`Total: ${productos.length}`)
        console.log('Productos obtenidos:', productos)
      } catch (error) {
        setStatus('error')
        setMessage('Error al obtener productos')
        setRecommendation('Verifique la conexión o intente más tarde')
        console.error('Error al obtener productos:', error)
      }
    }

    fetchProductos()
  }, [])
  return (
    <ContaninerTest
      modulo="Productos"
      status={status}
      message={message}
      recommendation={recommendation}
    />
  )
}