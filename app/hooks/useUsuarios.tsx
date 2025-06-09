import { useEffect, useState } from 'react'
import {  fetchClientUsers, fetchNonClientUsers } from '~/services/usuarioService'
import type { User } from '~/Types/Usuario'

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const fetchUsuarios = async () => {
    setLoading(true)
    try {
      const data = await fetchNonClientUsers()
      setUsuarios(data)
    } catch (error) {
      console.error('Error al obtener usuarios:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsuarios()
  }, [])

  return { usuarios, loadingUsuarios: loading, refetchUsuarios: fetchUsuarios }
}

// This hook fetches users who are not clients and provides loading state
export function useUsuariosClientes() {
  const [usuariosClientes, setUsuariosClientes] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const fetchUsuariosClientes = async () => {
    setLoading(true)
    try {
      const data = await fetchClientUsers()
      setUsuariosClientes(data)
    } catch (error) {
      console.error('Error al obtener usuarios clientes:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsuariosClientes()
  }, [])

  return { usuariosClientes, loadingUsuariosClientes: loading, refetchUsuariosClientes: fetchUsuariosClientes }
}