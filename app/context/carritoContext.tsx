import { createContext, useContext, useState, useEffect } from 'react'
import { getCarrito } from '~/services/carritoService'
import type { Carrito } from '~/Types/Carrito'
import { auth } from '~/firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'

const CarritoContext = createContext<{
  carrito: Carrito[]
  fetchCarrito: () => Promise<void>
    }>({
      carrito: [],
      fetchCarrito: async () => {},
    })

export function CarritoProvider({ children }: { children: React.ReactNode }) {
  const [carrito, setCarrito] = useState<Carrito[]>([])
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null)
    })
    return () => unsubscribe()
  }, [])

  const fetchCarrito = async () => {
    if (!userId) return
    const data = await getCarrito(userId)
    setCarrito(data)
  }

  useEffect(() => {
    if (userId) fetchCarrito()
  }, [userId])

  return (
    <CarritoContext.Provider value={{ carrito, fetchCarrito }}>
      {children}
    </CarritoContext.Provider>
  )
}

export const useCarritoContext = () => useContext(CarritoContext)