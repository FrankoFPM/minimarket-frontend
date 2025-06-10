import { ChipStatus, Table } from '../Components/Table'
import { AdminModalActions } from './AdminModalActions'
import { AdminModalAdd } from './AdminModalAdd'
import { useUsuarios } from '~/hooks/useUsuarios'

export default function ModuloUser() {

  const headers = [
    { text: 'ID', className: 'text-center' },
    { text: 'Nombres', className: 'text-center' },
    { text: 'Apellidos', className: 'text-center' },
    { text: 'Teléfono', className: 'text-center' },
    { text: 'Email', className: 'text-center' },
    { text: 'Distrito', className: 'text-center' },
    { text: 'Dirección', className: 'text-center' },
    { text: 'Rol', className: 'text-center' },
    { text: 'Estado', className: 'text-center' },
    { text: 'Acciones', className: 'text-center' },
  ]

  const {usuarios, loadingUsuarios, refetchUsuarios} = useUsuarios()

  return (
    <div className="flex flex-col bg-background mx-auto my-10 container gap-4">
      <h1 className="text-3xl font-bold text-center">Panel de administración</h1>
      <p className="text-center">Desde este panel puedes gestionar los administradores.</p>
      <AdminModalAdd onSuccess={refetchUsuarios} />
      {loadingUsuarios ? (
        <div className="text-center py-8">Cargando administradores...</div>
      ) : (
        <Table headers={headers}>
          {usuarios.map((user) => (
            <tr key={user.id} className="[&>td]:h-12 [&>td]:px-4 [&>td]:py-1.5">
              <td className="text-center">
                <div className='text-center w-24 whitespace-nowrap overflow-hidden text-ellipsis'>
                  {user.id}
                </div>
              </td>
              <td className="text-center" width={160}>{user.nombre}</td>
              <td className="text-center" width={160}>{user.apellido}</td>
              <td className="text-center" width={160}>{user.telefono}</td>
              <td className="text-center" width={160}>{user.email}</td>
              <td className="text-center" width={160}>{user.distritoNombre}</td>
              <td className="text-center" width={160}>{user.direccion}</td>
              <td className="text-center" width={160}>{user.rol}</td>
              <td className="">
                <ChipStatus status={user.estado === 'activo' ? 1 : 0} />
              </td>
              <td className="">
                <div className="flex items-center justify-center text-2xl gap-4">
                  <AdminModalActions user={user} onSuccess={refetchUsuarios} />
                </div>
              </td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  )
}
