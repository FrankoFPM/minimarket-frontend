import { useEffect, useState } from 'react'
import { getCategorias } from '~/services/categoriaService'
import { getDistritos } from '~/services/distritoService'
import { getProveedores } from '~/services/proveedorService'

export interface Categoria {
  id: number
  nombre: string
}

export interface Proveedor {
  id: number
  nombre: string
}

export interface Distrito {
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

export function useDistritos() {
  const [distritos, setDistritos] = useState<Distrito[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getDistritos()
      .then(data => {
        setDistritos(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error al obtener distritos:', error)
        setLoading(false)
      })
  }, [])

  return { distritos, loadingDistritos: loading }
}