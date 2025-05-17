import { fetchUsers } from '~/services/usuarioService'
import { ContaninerTest } from './appTest'
import { useEffect, useState } from 'react'

export const TestUsuario = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [message, setMessage] = useState<string>('')
  const [recommendation, setRecommendation] = useState<string>('')

  useEffect(() => {
    const fetchUsuarios = async () => {
      setStatus('loading')
      setMessage('Cargando usuarios...')
      try {
        const usuarios = await fetchUsers()
        setStatus('ok')
        setMessage('Usuarios obtenidos correctamente')
        setRecommendation(`Total: ${usuarios.length}`)
        console.log('Usuarios obtenidos:', usuarios)
      } catch (error) {
        setStatus('error')
        setMessage('Error al obtener usuarios')
        setRecommendation('Verifique la conexión o intente más tarde')
        console.error('Error al obtener usuarios:', error)
      }
    }

    fetchUsuarios()
  }, [])

  return (
    <ContaninerTest
      modulo="Usuarios"
      status={status}
      message={message}
      recommendation={recommendation}
    />
  )
}