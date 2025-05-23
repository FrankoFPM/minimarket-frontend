import { Outlet } from 'react-router'
import { Header, Navbar } from './Components/LayoutComponets'

export default function AdminLayout() {
  return (
    <div className="dashboard">
      <Navbar />
      <Header />
      <main className='main pr-5 pb-5'>
        <Outlet />
      </main>
    </div>
  )
}