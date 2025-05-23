import React, { useEffect, useState } from 'react'
import { getDepartamentos } from '~/services/departamentoService'
import { ContaninerTest } from './appTest'

export const TestDepartamento = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [message, setMessage] = useState<string>('')
  const [recommendation, setRecommendation] = useState<string>('')

  useEffect(() => {
    const fetchDepartamentos = async () => {
      setStatus('loading')
      setMessage('Cargando departamentos...')
      try {
        const departamentos = await getDepartamentos()
        setStatus('ok')
        setMessage('Departamentos obtenidos correctamente')
        setRecommendation(`Total: ${departamentos.length}`)
        console.log('Departamentos obtenidos:', departamentos)
      } catch (error) {
        setStatus('error')
        setMessage('Error al obtener departamentos')
        setRecommendation('Verifique la conexión o intente más tarde')
        console.error('Error al obtener departamentos:', error)
      }
    }

    fetchDepartamentos()
  }, [])

  return (
    <ContaninerTest
      modulo="Departamentos"
      status={status}
      message={message}
      recommendation={recommendation}
    />
  )
}
