import { Outlet } from 'react-router'
import { FooterShop, HeaderShop } from './components/LayoutComponent'
import { CarritoProvider } from '~/context/carritoContext'

export default function Layout() {
  return (
    <CarritoProvider>
      <div className="flex flex-col min-h-screen bg-background">
        <HeaderShop />
        <Outlet />
        <FooterShop />
      </div>
    </CarritoProvider>
  )
}