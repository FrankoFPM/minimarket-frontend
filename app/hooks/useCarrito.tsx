import { addToast } from '@heroui/react'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from '~/firebase/firebaseConfig'
import { getCarrito } from '~/services/carritoService'
import type { Carrito } from '~/Types/Carrito'

export function useCarrito() {
  const [carrito, setCarrito] = useState<Carrito[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  // Suscribirse a cambios de autenticación SOLO una vez
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUserId(null)
        setLoading(false)
        return
      }
      setUserId(user.uid)
    })
    return () => unsubscribe()
  }, [])

  // Definir fetchCarrito fuera del useEffect para poder exponerlo
  const fetchCarrito = async () => {
    if (!userId) return
    setLoading(true)
    try {
      const data = await getCarrito(userId)
      setCarrito(data)
    } catch (error) {
      addToast({
        title: 'Error',
        description: 'No se pudo obtener el carrito.' + (error instanceof Error ? error.message : ''),
        color: 'danger',
        shouldShowTimeoutProgress: true,
      })
      console.error('Error al obtener el carrito:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!userId) return
    fetchCarrito()
  }, [userId])

  return { carrito, loading, fetchCarrito, userId }
}