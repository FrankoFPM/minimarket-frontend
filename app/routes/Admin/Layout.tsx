import { Outlet, useNavigate } from 'react-router'
import { Header, Navbar } from './Components/LayoutComponents'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '~/firebase/firebaseConfig'

export default function AdminLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login')
      }
    })
    return () => unsubscribe()
  }, [navigate])

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