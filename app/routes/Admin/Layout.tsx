import { Outlet, useNavigate } from 'react-router'
import { Header, Navbar } from './Components/LayoutComponents'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '~/firebase/firebaseConfig'

export default function AdminLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/login')
        return
      }
      const idToken = await user.getIdTokenResult()
      console.log(idToken.claims.role)
      console.log('ID Token Claims:', idToken.claims)
      if (idToken.claims.role == 'cliente') {
        navigate('/unauthorized')
      }
    })
    return () => unsubscribe()
  }, [navigate])

  return (
    <div className="dashboard relative">
      <Navbar />
      <Header />
      <main className='main pr-5 pb-5'>
        <Outlet />
      </main>
    </div>
  )
}