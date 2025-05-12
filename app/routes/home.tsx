import type { Route } from './Shop/+types'
import { Welcome } from '../welcome/welcome'

// Edita lo que desees aquí para que practiques
// y aprendas a usar React Router
// Puedes usar el componente Welcome como base para tu página de inicio
// o crear tu propio componente
export function meta({}: Route.MetaArgs) {
  //Estos son los metadatos que se envían al navegador
  return [
    { title: 'Minimarket La Caserita' },
    { name: 'description', content: '¡Bienvenido a su minimarket favorito!' },
  ]
}

export default function Home() {
  //Aquí puedes agregar tu lógica de React Router
  return <Welcome />
}
