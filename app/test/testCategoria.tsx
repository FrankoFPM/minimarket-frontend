import { useEffect, useState } from 'react'
import { ContaninerTest } from './appTest'
import { getCategorias } from '~/services/categoriaService'

export const TestCategoria = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [message, setMessage] = useState<string>('')
  const [recommendation, setRecommendation] = useState<string>('')
  useEffect(() => {
    const fetchCategorias = async () => {
      setStatus('loading')
      setMessage('Cargando categorías...')
      try {
        const categorias = await getCategorias()
        setStatus('ok')
        setMessage('Categorías obtenidas correctamente')
        setRecommendation(`Total: ${categorias.length}`)
        console.log('Categorías obtenidas:', categorias)
      } catch (error) {
        setStatus('error')
        setMessage('Error al obtener categorías')
        setRecommendation('Verifique la conexión o intente más tarde')
        console.error('Error al obtener categorías:', error)
      }
    }

    fetchCategorias()
  }, [])
  return (
    <ContaninerTest
      modulo="Categorías"
      status={status}
      message={message}
      recommendation={recommendation}
    />
  )
}