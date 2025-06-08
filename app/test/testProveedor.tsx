import { useEffect, useState } from 'react'
import { ContaninerTest } from './appTest'

export const TestProveedor = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [message, setMessage] = useState<string>('')
  const [recommendation, setRecommendation] = useState<string>('')
  useEffect(() => {
    const fetchProveedores = async () => {
      setStatus('loading')
      setMessage('Cargando proveedores...')
      try {
        // Aquí deberías llamar a tu servicio para obtener los proveedores
        // const proveedores = await getProveedores()
        // Simulando una respuesta exitosa
        const proveedores = [{ id: 1, nombre: 'Proveedor 1' }, { id: 2, nombre: 'Proveedor 2' }]
        setStatus('ok')
        setMessage('Proveedores obtenidos correctamente')
        setRecommendation(`Total: ${proveedores.length}`)
        console.log('Proveedores obtenidos:', proveedores)
      } catch (error) {
        setStatus('error')
        setMessage('Error al obtener proveedores')
        setRecommendation('Verifique la conexión o intente más tarde')
        console.error('Error al obtener proveedores:', error)
      }
    }

    fetchProveedores()
  }, [])
  return (
    <ContaninerTest
      modulo="Proveedores"
      status={status}
      message={message}
      recommendation={recommendation}
    />
  )
}