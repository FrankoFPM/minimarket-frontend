import { addToast } from '@heroui/react'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from '~/firebase/firebaseConfig'
import { getPedidosByUsuario } from '~/services/pedidoService'
import type { Pedido } from '~/Types/Pedido'

export function usePedido() {
  const [pedido, setPedido] = useState<Pedido[]>([])
  const [loading, setLoading] = useState(true)
  const [usuarioId, setUsuarioId] = useState<string>('')

  // Suscribirse a cambios de autenticación SOLO una vez
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUsuarioId('')
        setLoading(false)
        addToast({
          title: 'Error',
          description: 'No se pudo obtener el usuario autenticado.',
          color: 'danger',
          shouldShowTimeoutProgress: true,
        })
        return
      }
      setUsuarioId(user.uid)
    })
    return () => unsubscribe()
  }, [])

  // Definir fetchPedido fuera del useEffect para poder exponerlo
  const fetchPedido = async () => {
    if (!usuarioId) return
    setLoading(true)
    try {
      const data = await getPedidosByUsuario(usuarioId)
      setPedido(data)
      console.log('Pedidos obtenidos:', data)
    } catch (error) {
      console.error('Error al obtener el pedido:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!usuarioId) return
    fetchPedido()
  }, [usuarioId])

  return { pedido, loading, fetchPedido, usuarioId }
}