import { TestDepartamento } from './testDepartamento'
import { TestDistritos } from './testDistrito'
import { TestUsuario } from './testUsuario'

export default function TestApp() {
  return (
    <div className="bg-background min-h-screen py-10">
      <div className="container mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-primary mb-2 text-center">Estado de servicios</h1>
        <p className="text-gray-600 mb-6 text-center">Puede verificar el estado de nuestros servicios, cualquier inconveniente es culpa del backend</p>
        <div className="flex flex-col gap-6">
          <TestDistritos />
          <TestDepartamento />
          <TestUsuario />
        </div>
      </div>
    </div>
  )
}

interface ContainerTestProps {
  modulo: string,
  status: string,
  message: string,
  recommendation: string
}

export function ContaninerTest( { modulo, status, message, recommendation }: ContainerTestProps) {

  const getStatusClass = (status: string) => {
    switch (status) {
    case 'ok':
      return 'bg-green-500'
    case 'error':
      return 'bg-red-500'
    case 'warning':
      return 'bg-yellow-500'
    case 'loading':
      return 'bg-blue-500'
    case 'idle':
      return 'bg-gray-500'
    default:
      return 'bg-gray-500'
    }
  }

  return (
    <div className='bg-secondary rounded-md shadow-md border-1 border-slate-400 h-10 grid grid-cols-4 gap-2 px-4 items-center'>
      <h5 className='inline-block uppercase font-bold text-lg'>{modulo}</h5>
      <div className={`flex items-center justify-around rounded-lg w-28 text-white font-bold ${getStatusClass(status)}`}>
        {status}
      </div>
      <p className='text-center text-gray-500'>{message}</p>
      <p className='text-center text-gray-500'>{recommendation}</p>
    </div>
  )
}