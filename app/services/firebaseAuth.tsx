import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { FaFacebook, FaGoogle } from 'react-icons/fa'
import { auth } from '~/firebase/firebaseConfig'

export const LoginSocial = () =>{
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
        alert(`Autenticación exitosa con ${providerName}`)
        // Aquí puedes guardar el usuario, redirigir, etc.
      } else {
        alert(`Error en la autenticación: ${data.message}`)
        console.error(`Error en la autenticación con ${providerName}:`, data.message)
      }

    } catch (error) {

      if (error instanceof Error) {
        console.error('Error al autenticar con el proveedor:', error.message)
        alert(`Error al autenticar con ${providerName}: ${error.message}`)
      } else {
        console.error('Error desconocido al autenticar con el proveedor:', error)
        alert(`Error desconocido al autenticar con ${providerName}`)
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