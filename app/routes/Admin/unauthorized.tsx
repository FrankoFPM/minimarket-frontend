import { Home, AlertCircle, User, Shield } from 'lucide-react'
import { Link } from 'react-router'
import { useEffect, useState } from 'react'
import { auth } from '~/firebase/firebaseConfig'
import { signOut } from 'firebase/auth'

export default function unauthorizedLayout() {
  const [userEmail, setUserEmail] = useState<string>('')

  useEffect(() => {
    const user = auth.currentUser
    if (user) {
      setUserEmail(user.email || '')
    }
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      window.location.href = '/login'
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Icono de advertencia */}
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>

          {/* Título */}
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Acceso No Autorizado
          </h1>

          {/* Mensaje */}
          <p className="text-gray-600 mb-6">
            No tienes permisos para acceder al panel de administración.
          </p>

          {/* Info del usuario */}
          {userEmail && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center mb-2">
                <User className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">Usuario actual:</span>
              </div>
              <p className="text-sm font-medium text-gray-800">{userEmail}</p>
            </div>
          )}

          {/* Posibles razones */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <Shield className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-800">Posibles razones:</span>
            </div>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Tu cuenta tiene rol de cliente</li>
              <li>• Los permisos están siendo procesados</li>
              <li>• No tienes asignado un rol administrativo</li>
            </ul>
          </div>

          {/* Botones de acción */}
          <div className="space-y-3">
            <Link to="/" className="block">
              <button className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:transform hover:scale-105">
                <Home size={20} />
                Volver al inicio
              </button>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full px-6 py-3 bg-gray-500 hover:bg-gray-700 text-white rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
            >
              <User size={20} />
              Cambiar de cuenta
            </button>
          </div>

          {/* Mensaje de contacto */}
          <p className="text-xs text-gray-500 mt-6">
            Si crees que esto es un error, contacta al administrador del sistema.
          </p>
        </div>
      </div>
    </div>
  )
}
