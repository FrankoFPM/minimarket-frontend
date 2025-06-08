import { Button, useDisclosure } from '@heroui/react'
import { TbEdit, TbEye, TbTrash } from 'react-icons/tb'
import { InputField } from '~/Components/FormComponent'
import { ChipStatus, Table } from '../Components/Table'
import { ModalBase } from '../Components/ModalBase'

export default function ModuloUser() {

  const headers = [
    { text: '#', className: 'text-center' },
    { text: 'DNI', className: 'text-center' },
    { text:'Nombres', className: 'text-center' },
    { text:'Apellidos', className: 'text-center' },
    { text:'Teléfono', className: 'text-center' },
    { text:'Email', className: 'text-center' },
    { text:'Contraseña', className: 'text-center' },
    { text: 'Fecha de modificacion', className: 'text-center' },
    { text: 'Estado', className: 'text-center' },
    { text: 'Acciones', className: 'text-center' },
  ]

  return (
    <div className="flex flex-col bg-background mx-auto my-10 container gap-4">
      <h1 className="text-3xl font-bold text-center">Panel de administración</h1>
      <p className="text-center">Desde este panel puedes gestionar los usuarios.</p>
      <ModalAdd />
      <Table headers={headers}>

        <tr className="[&>td]:h-12 [&>td]:px-4 [&>td]:py-1.5">
          <td className="text-center" width={160}>1</td>
          <td className="text-center" width={160}>7834872847</td>
          <td className="text-center" width={160}>Juan</td>
          <td className="text-center" width={160}>Perez Perez</td>
          <td className="text-center" width={160}>999999992</td>
          <td className="text-center" width={160}>juan200@gmail.com</td>
          <td className="text-center" width={160}>xyqadnj</td>
          <td className="text-center" width={160}>10/03/25</td>
          <td className="">
            <ChipStatus status={1} />
          </td>
          <td className="">
            <div className="flex items-center justify-center text-2xl gap-4">
              <ModalActions dniUser='1' />
            </div>
          </td>
        </tr>
      </ Table>
    </div>
  )
}

interface ModalActions {
  dniUser: string;
}

function ModalActions({dniUser}: ModalActions){
  const editModal = useDisclosure()
  const viewModal = useDisclosure()
  const deleteModal = useDisclosure()

  //fetch product data by idProduc if needed
  // const fetchProductData = async (id: string) => {
  dniUser = dniUser || '1' // Example id, replace with actual data

  return (
    <>
      <TbEye className="text-blue-400 drop-shadow-xs cursor-pointer" onClick={viewModal.onOpen} />
      <TbEdit className="text-amber-400 drop-shadow-xs cursor-pointer" onClick={editModal.onOpen} />
      <TbTrash className="text-red-600 drop-shadow-xs cursor-pointer" onClick={deleteModal.onOpen} />
      {/* Edit Modal */}
      <ModalBase
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
        title="Editar usuario"
        footer={
          <>
            <Button
              color="danger"
              onPress={editModal.onClose}
            >
              Cerrar
            </Button>
            <Button
              color="success"
              onPress={editModal.onClose}
            >
              Guardar
            </Button>
          </>
        }
      >
        <form action="">
          <input type="hidden" value={dniUser} />
          <InputField
            label="DNI"
            name="userDni"
            type="text"
            placeholder="Ingrese el DNI del usuario"
          />
          <InputField
            label="Nombres"
            name="userName"
            type="text"
            placeholder="Ingrese los nombres del usuario"
            value={'Juan'} // Example value, replace with actual data
          />
          <InputField
            label="Apellidos"
            name="userLastName"
            type="text"
            placeholder="Ingrese los apellidos del usuario"
            value={'Perez Perez'} // Example value, replace with actual data
          />
          <InputField
            label="Teléfono"
            name="userNumber"
            type="text"
            placeholder="Ingrese el telefono del usuario"
          />
          <InputField
            label="Email"
            name="userEmail"
            type="text"
            placeholder="Ingrese el email del usuario"
          />
          <InputField
            label="Contraseña"
            name="userPassword"
            type="text"
            placeholder="Ingrese la contraseña del usuario"
          />
        </form>
      </ModalBase>
      {/* View Modal */}
      <ModalBase
        isOpen={viewModal.isOpen}
        onClose={viewModal.onClose}
        title="Ver usuario"
        footer={
          <Button color="danger" onPress={viewModal.onClose}>
            Cerrar
          </Button>
        }
      >
        <div className="flex flex-col gap-4">
          <p><strong>ID</strong>1</p>
          <p><strong>DNI:</strong> {dniUser}</p>
          <p><strong>Nombres:</strong> Juan </p>
          <p><strong>Apellidos:</strong> Perez Perez </p>
          <p><strong>Teléfono:</strong> 999999992 </p>
          <p><strong>Email:</strong> juan200@gmail.com </p>
          <p><strong>Contraseña:</strong> xyqadn </p>
          <p><strong>Fecha de modificación:</strong>10/03/25</p>
          <p><strong>Estado:</strong> Activo</p>
        </div>
      </ModalBase>

      {/* Delete Modal */}
      <ModalBase
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        title="Eliminar usuario"
        footer={
          <>
            <Button color="danger" onPress={deleteModal.onClose}>
              Cancelar
            </Button>
            <Button color="success" onPress={deleteModal.onClose}>
              Eliminar
            </Button>
          </>
        }
      >
        <p>¿Estás seguro de que deseas eliminar el usuario del DNI {dniUser}?</p>
      </ModalBase>

    </>
  )
}

function ModalAdd(){
  const addModal = useDisclosure()
  return(
    <>
      <Button
        color="success"
        className="w-fit ml-auto"
        onPress={addModal.onOpen}
      >
        Agregar nuevo usuario
      </Button>

      <ModalBase
        isOpen={addModal.isOpen}
        onClose={addModal.onClose}
        title="Agregar usuario"
        footer={
          <>
            <Button color="danger" onPress={addModal.onClose}>
            Cerrar
            </Button>
            <Button color="success" onPress={addModal.onClose}>
            Guardar
            </Button>
          </>
        }
      >
        <form action="">
          <InputField
            label="DNI"
            name="userDni"
            type="text"
            placeholder="Ingrese el DNI del usuario"
          />
          <InputField
            label="Nombres"
            name="usertName"
            type="text"
            placeholder="Ingrese los nombres del usuario"
            value={'Manzana'} // Example value, replace with actual data
          />
          <InputField
            label="Apellidos"
            name="userLastName"
            type="text"
            placeholder="Ingrese los apellidos del usuario"
            value={'Manzana'} // Example value, replace with actual data
          />
          <InputField
            label="Teléfono"
            name="userNumber"
            type="text"
            placeholder="Ingrese el telefono del usuario"
          />
          <InputField
            label="Email"
            name="userEmail"
            type="text"
            placeholder="Ingrese el email del usuario"
          />
          <InputField
            label="Contraseña"
            name="userPassword"
            type="text"
            placeholder="Ingrese la contraseña del usuario"
          />
        </form>
      </ModalBase>
    </>
  )
}