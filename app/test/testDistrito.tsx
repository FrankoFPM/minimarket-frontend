import React, { useEffect } from 'react'
import { getDistritos } from '~/services/distritoService'

export const TestDistritos = () => {
  useEffect(() => {
    const fetchDistritos = async () => {
      try {
        const distritos = await getDistritos()
        console.log('Distritos obtenidos:', distritos)
      } catch (error) {
        console.error('Error al obtener distritos:', error)
      }
    }

    fetchDistritos()
  }, [])

  return <div>Revisa la consola para ver los distritos.</div>
}