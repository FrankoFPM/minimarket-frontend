import React, { useEffect, useState } from 'react'
import { getDistritos } from '~/services/distritoService'
import { ContaninerTest } from './appTest'

export const TestDistritos = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [message, setMessage] = useState<string>('')
  const [recommendation, setRecommendation] = useState<string>('')

  useEffect(() => {
    const fetchDistritos = async () => {
      setStatus('loading')
      setMessage('Cargando distritos...')
      try {
        const distritos = await getDistritos()
        setStatus('ok')
        setMessage('Distritos obtenidos correctamente')
        setRecommendation(`Total: ${distritos.length}`)
        console.log('Distritos obtenidos:', distritos)
      } catch (error) {
        setStatus('error')
        setMessage('Error al obtener distritos')
        setRecommendation('Verifique la conexión o intente más tarde')
        console.error('Error al obtener distritos:', error)
      }
    }

    fetchDistritos()
  }, [])

  return (
    <ContaninerTest
      modulo="Distritos"
      status={status}
      message={message}
      recommendation={recommendation}
    />
  )
}