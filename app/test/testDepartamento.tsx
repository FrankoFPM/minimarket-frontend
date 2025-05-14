import { useEffect } from 'react'
import { getDepartamentos } from '~/services/departamentoService'

export const TestDepartamento = () => {
  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const response = await getDepartamentos()
        console.log('Departamentos obtenidos:', response)
      } catch (error) {
        console.error('Error al obtener departamentos:', error)
      }
    }

    fetchDepartamentos()
  }, [])
  return <div>Revisa la consola para ver los departamentos.</div>
}
