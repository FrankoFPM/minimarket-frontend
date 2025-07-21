import { addToast } from '@heroui/react'
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { FaFacebook, FaGoogle } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import { auth } from '~/firebase/firebaseConfig'

// Crear una instancia separada de Firebase para registro de usuarios
const firebaseConfig = {
  apiKey: 'AIzaSyBDBKBxAZaJGYBdrfAd9ZBeLlAZSWqTjJo',
  authDomain: 'minimarketback.firebaseapp.com',
  projectId: 'minimarketback',
  storageBucket: 'minimarketback.firebasestorage.app',
  messagingSenderId: '634080994170',
  appId: '1:634080994170:web:2682fe6bb733003847acc3',
  measurementId: 'G-QQ3J1RMFCZ'
}

const adminApp = initializeApp(firebaseConfig, 'admin-app')
const adminAuth = getAuth(adminApp)

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

export const registerWithEmail = async (
  email: string,
  password: string,
  displayName: string,
) => {
  const auth = getAuth()

  try{
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    await updateProfile(user, { displayName })
    addToast({
      title: 'Registro exitoso',
      description: 'Usuario registrado correctamente.',
      color: 'success',
      shouldShowTimeoutProgress: true,
    })
    console.log('Usuario registrado:', user)
    return userCredential
  }catch (error: unknown) {
    let errorCode = 'unknown'
    let errorMessage = 'Ocurrió un error desconocido'
    if (typeof error === 'object' && error !== null && 'code' in error && 'message' in error) {
      errorCode = (error as { code: string }).code
      errorMessage = (error as { message: string }).message
    }
    addToast({
      title: 'Error en el registro',
      description: `Código de error: ${errorCode}. Mensaje: ${errorMessage}`,
      color: 'danger',
      shouldShowTimeoutProgress: true,
    })
    console.error('Error al registrar usuario:', error)
    throw error // <-- Lanza el error para manejarlo en el componente
  }
}

export const LoginWithEmail = (email: string, password: string,navigate: (path: string) => void) => {
  const auth = getAuth()
  try {

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      // Signed in
        const user = userCredential.user
        addToast({
          title: 'Inicio de sesión exitoso',
          description: 'Usuario autenticado correctamente.',
          color: 'success',
          shouldShowTimeoutProgress: true,
        })
        console.log('Usuario autenticado:', user)
        navigate('/')
      }).catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        addToast({
          title: 'Error en el inicio de sesión',
          description: `Código de error: ${errorCode}. Mensaje: ${errorMessage}`,
          color: 'danger',
          shouldShowTimeoutProgress: true,
        })
        console.error('Error al iniciar sesión:', error)
      })
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error al iniciar sesión:', error.message)
      addToast({
        title: 'Error en el inicio de sesión',
        description: error.message,
        color: 'danger',
        shouldShowTimeoutProgress: true,
      })
    } else {
      console.error('Error desconocido al iniciar sesión:', error)
      addToast({
        title: 'Error desconocido',
        description: 'Ocurrió un error desconocido al iniciar sesión.',
        color: 'danger',
        shouldShowTimeoutProgress: true,
      })
    }
  }
}

/**
 * Registra un nuevo usuario sin afectar la sesión actual del administrador
 * Utiliza una instancia separada de Firebase Auth
 */
export const registerUserAsAdmin = async (
  email: string,
  password: string,
  displayName: string,
) => {
  try {
    // Usar la instancia separada de Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(adminAuth, email, password)
    const user = userCredential.user
    await updateProfile(user, { displayName })

    console.log('Usuario registrado por admin:', user)

    // Inmediatamente deslogear el usuario de la instancia admin
    // para que no interfiera con la sesión principal
    await adminAuth.signOut()

    return userCredential
  } catch (error: unknown) {
    let errorCode = 'unknown'
    let errorMessage = 'Ocurrió un error desconocido'
    if (typeof error === 'object' && error !== null && 'code' in error && 'message' in error) {
      errorCode = (error as { code: string }).code
      errorMessage = (error as { message: string }).message
    }

    console.error('Error al registrar usuario como admin:', errorCode, errorMessage)

    // Mapear errores comunes de Firebase
    switch (errorCode) {
    case 'auth/email-already-in-use':
      throw new Error('El correo electrónico ya está en uso')
    case 'auth/invalid-email':
      throw new Error('El correo electrónico no es válido')
    case 'auth/operation-not-allowed':
      throw new Error('Operación no permitida')
    case 'auth/weak-password':
      throw new Error('La contraseña es muy débil')
    default:
      throw new Error(errorMessage)
    }
  }
}