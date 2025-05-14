import { TestDepartamento } from './testDepartamento'
import { TestDistritos } from './testDistrito'

export default function TestApp() {
  return (
    <div>
      <h1>Test App</h1>
      <p>Esta es una prueba de la aplicación.</p>
      <TestDistritos />
      <TestDepartamento />
    </div>
  )
}