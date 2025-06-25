import { addToast } from '@heroui/react'
import { useEffect, useState } from 'react'
import { getProductoById, getProductos, getProductosLowStock } from '~/services/productosService'
import type { Producto } from '~/Types/Producto'

export function useProducto(idProducto: string) {
  const [producto, setProducto] = useState<Producto>()
  const [loading, setLoading] = useState(true)

  const fetchProductos = async () => {
    setLoading(true)
    try {
      const productos = await getProductoById(idProducto)
      setProducto(productos)
    } catch (error) {
      addToast({
        title: 'Error',
        description: 'No se pudo obtener el producto.' + (error instanceof Error ? error.message : ''),
        color: 'danger',
        shouldShowTimeoutProgress: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return { producto, loading, fetchProductos }

}

export function useProductosByIds(ids: string[]) {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(false)

  const fetchProductos = async () => {
    setLoading(true)
    try {
      const results = await Promise.all(
        ids.map(id => getProductoById(id))
      )
      setProductos(results)
    } catch (error) {
      addToast({
        title: 'Error',
        description: 'No se pudieron obtener los productos.' + (error instanceof Error ? error.message : ''),
        color: 'danger',
        shouldShowTimeoutProgress: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return { productos, loading, fetchProductos }
}

export function useAllProductos() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAllProductos = async () => {
    setLoading(true)
    try {
      const response = await getProductos()
      setProductos(response)
    } catch (error) {
      addToast({
        title: 'Error',
        description: 'No se pudieron obtener los productos.' + (error instanceof Error ? error.message : ''),
        color: 'danger',
        shouldShowTimeoutProgress: true,
      })
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchAllProductos()
  }, [])

  return { productos, loading, fetchAllProductos }
}

//useProductos without stock
export function useProductosLowStock() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProductosLowStock = async () => {
    setLoading(true)
    try {
      const allProductos = await getProductosLowStock()
      console.log('Productos de bajo stock:', allProductos)
      setProductos(allProductos)
    } catch (error) {
      addToast({
        title: 'Error',
        description: 'No se pudieron obtener los productos con bajo stock.' + (error instanceof Error ? error.message : ''),
        color: 'danger',
        shouldShowTimeoutProgress: true,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductosLowStock()
  }, [])

  return { productos, loading, fetchProductosLowStock }
}