import { useEffect, useState } from 'react'
import { getCategorias } from '~/services/categoriaService'
import { getProveedores } from '~/services/proveedorService'

export interface Categoria {
  id: number
  nombre: string
}

export interface Proveedor {
  id: number
  nombre: string
}

export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getCategorias()
      .then(data => {
        setCategorias(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error al obtener categorías:', error)
        setLoading(false)
      })
  }, [])

  return { categorias, loadingCategorias: loading }
}

export function useProveedores() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getProveedores()
      .then(data => {
        setProveedores(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error al obtener proveedores:', error)
        setLoading(false)
      })
  }, [])

  return { proveedores, loadingProveedores: loading }
}