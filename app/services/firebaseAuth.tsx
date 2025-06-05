import { addToast } from '@heroui/react'
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { FaFacebook, FaGoogle } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import { auth } from '~/firebase/firebaseConfig'

export const LoginSocial = () =>{
  const navigate = useNavigate()
  const loginWithProvider = async (providerName: 'google.com' | 'facebook.com') => {
    const provider = providerName === 'google.com'
      ? new GoogleAuthProvider()
      : new FacebookAuthProvider()

    if (providerName === 'google.com') {
      provider.addScope('https://www.googleapis.com/auth/userinfo.profile')
    } else if (providerName === 'facebook.com') {
      provider.addScope('public_profile')
    }
    try {
      const result = await signInWithPopup(auth, provider)
      const token = await result.user.getIdToken()

      const url =
        providerName === 'google.com'
          ? 'http://localhost:8080/api/auth/firebase/google'
          : 'http://localhost:8080/api/auth/firebase/facebook'

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idToken: token })
      })

      const data = await response.json()

      if (data.success) {
        addToast({
          title: 'Autenticación exitosa',
          description: `Usuario autenticado con ${providerName}.`,
          color: 'success',
          shouldShowTimeoutProgress: true,
        })
        console.log(`Usuario autenticado con ${providerName}:`, data.user)

        navigate('/')
      } else {
        alert(`Error en la autenticación: ${data.message}`)
        console.error(`Error en la autenticación con ${providerName}:`, data.message)
      }

    } catch (error) {
      if (error instanceof Error) {
        const firebaseError = error as { code?: string }
        if (
          firebaseError.code === 'auth/popup-closed-by-user' ||
          firebaseError.code === 'auth/cancelled-popup-request' ||
          firebaseError.code === 'auth/user-cancelled' // <-- Facebook cancelado
        ) {
          addToast({
            title: 'Autenticación cancelada',
            description: `El usuario canceló o interrumpió la autenticación con ${providerName}.`,
            color: 'danger',
            shouldShowTimeoutProgress: true,
          })
          return
        }
      } else {
        console.error('Error desconocido al autenticar con el proveedor:', error)
        addToast({
          title: 'Error desconocido',
          description: `Ocurrió un error desconocido al autenticar con ${providerName}.`,
          color: 'danger',
          shouldShowTimeoutProgress: true,
        })
      }

    }
  }

  return(
    <div className="grid grid-cols-2 gap-4 w-full">
      <button
        onClick={() => loginWithProvider('google.com')}
        className="flex items-center justify-center gap-2 px-4 py-2 border-1 border-primary-1 text-foreground rounded-md hover:bg-primary-1 hover:text-white transition">
        <FaGoogle size={20} />
                      Google
      </button>
      <button
        onClick={() => loginWithProvider('facebook.com')}
        className="flex items-center justify-center gap-2 px-4 py-2 border-1 border-primary-1 text-foreground rounded-md hover:bg-primary-1 hover:text-white transition">
        <FaFacebook size={20} />
                      Facebook
      </button>
    </div>
  )
}