import { Outlet } from 'react-router'
import { FooterShop, HeaderShop } from './components/LayoutComponent'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <HeaderShop />
      <Outlet />
      <FooterShop />
    </div>
  )
}