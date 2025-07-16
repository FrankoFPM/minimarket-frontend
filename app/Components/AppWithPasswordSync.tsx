// Ejemplo de cómo integrar la sincronización en tu app principal

import { useEffect } from 'react'
import { usePasswordResetSync } from '~/hooks/usePasswordResetSync'
import { passwordResetSyncService } from '~/services/passwordResetSyncService'

export const AppWithPasswordSync = ({ children }: { children: React.ReactNode }) => {
  // Usar el hook para detectar restablecimientos
  const { isInitialized } = usePasswordResetSync()

  useEffect(() => {
    // Inicializar el servicio de sincronización
    passwordResetSyncService.start()

    // Cleanup al desmontar
    return () => {
      passwordResetSyncService.stop()
    }
  }, [])

  return (
    <div>
      {children}
      {/* Opcional: Mostrar indicador de sincronización */}
      {!isInitialized && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
          Sincronizando autenticación...
        </div>
      )}
    </div>
  )
}

// En tu root.tsx o App.tsx:
/*
import { AppWithPasswordSync } from './components/AppWithPasswordSync'

export default function App() {
  return (
    <AppWithPasswordSync>
      <Routes>
        // ... tus rutas
      </Routes>
    </AppWithPasswordSync>
  )
}
*/
