import { Outlet } from 'react-router'

export default function Adminlayout (){
  return (
    <div>
      <header>hola mundo</header>
      <Outlet></Outlet>
      <footer>adios</footer>
    </div>
  )
}