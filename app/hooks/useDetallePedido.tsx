import { addToast } from '@heroui/react'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from '~/firebase/firebaseConfig'
import { getDetallePedidosByUsuario } from '~/services/detallePedidoService'
import type { DetallePedido } from '~/Types/DetallePedido'

export function useDetallePedidoByUser(){
  const [detallePedidos, setDetallePedidos] = useState<DetallePedido[]>([])
  const [loading, setLoading] = useState(true)
  const [idUsuario, setIdUsuario] = useState<string>('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setIdUsuario('')
        setLoading(false)
        addToast({
          title: 'Error',
          description: 'No se pudo obtener el usuario autenticado.',
          color: 'danger',
          shouldShowTimeoutProgress: true,
        })
        return
      }
      setIdUsuario(user.uid)
    })
    return () => unsubscribe()
  }, [])

  const fetchDetallePedidos = async () => {
    if (!idUsuario) return
    setLoading(true)
    try {
      const data = await getDetallePedidosByUsuario(idUsuario)

      setDetallePedidos(data)
      console.log('Detalles de pedidos obtenidos:', data)
    } catch (error) {
      console.error('Error al obtener los detalles de los pedidos:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!idUsuario) return
    fetchDetallePedidos()
  }, [idUsuario])

  return { detallePedidos, loading, fetchDetallePedidos, idUsuario }

}