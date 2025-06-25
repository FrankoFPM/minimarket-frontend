import { addToast } from '@heroui/react'
import { useEffect, useState } from 'react'
import { getProveedores } from '~/services/proveedorService'
import type { Proveedor } from './useCatalogos'

export function useProveedor() {
  const [proveedor, setProveedor] = useState<Proveedor[] | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchAllProveedor = async () => {
    setLoading(true)
    try {
      const response = await getProveedores()
      setProveedor(response)
    } catch (error) {
      console.error('Error al obtener proveedor:', error)
      addToast({
        title: 'Error',
        description: 'No se pudo obtener el proveedor.' + (error instanceof Error ? error.message : ''),
        color: 'danger',
        shouldShowTimeoutProgress: true,
      })
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchAllProveedor()
  }, [])
  return { proveedor, loading, fetchAllProveedor }
}
