import { Outlet } from 'react-router'
import { Header, Navbar } from './Components/LayoutComponents'
import AdminLoader from './Components/AdminLoader'
import AuthIndicator from './Components/AuthIndicator'
import { useAdminAuth } from '~/hooks/useAdminAuth'

export default function AdminLayout() {
  const { isLoading, isAuthenticated, userName, showAuthIndicator, loadingMessage } = useAdminAuth()

  const handleLoaderComplete = () => {
    // Callback cuando el loader termina su animación
    console.log('Loader animation completed')
  }

  return (
    <>
      <AdminLoader
        isLoading={isLoading}
        onComplete={handleLoaderComplete}
        message={loadingMessage}
      />
      <AuthIndicator isVisible={showAuthIndicator} message="Acceso autorizado" />

      {isAuthenticated && !isLoading && (
        <div className="dashboard relative">
          <Navbar />
          <Header user={userName}/>
          <main className='main pr-5 pb-5'>
            <Outlet />
          </main>
        </div>
      )}
    </>
  )
}
