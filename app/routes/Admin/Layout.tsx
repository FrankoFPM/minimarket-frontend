import { Outlet, useNavigate } from 'react-router'
import { Header, Navbar } from './Components/LayoutComponents'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '~/firebase/firebaseConfig'

export default function AdminLayout() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState<string>('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/login')
        return
      }
      const idToken = await user.getIdTokenResult()
      setUserName(user.displayName || user.email || 'Usuario')
      console.log(idToken.claims.role)
      console.log('ID Token Claims:', idToken.claims)
      if (idToken.claims.role === 'cliente') {
        navigate('/unauthorized')
      }
    })
    return () => unsubscribe()
  }, [navigate])

  return (
    <div className="dashboard relative">
      <Navbar />
      <Header user={userName}/>
      <main className='main pr-5 pb-5'>
        <Outlet />
      </main>
    </div>
  )
}