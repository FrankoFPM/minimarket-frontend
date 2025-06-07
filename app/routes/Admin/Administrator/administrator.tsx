import { Button, useDisclosure } from '@heroui/react'
import { TbEdit, TbEye, TbTrash } from 'react-icons/tb'
import { InputField } from '~/Components/FormComponent'
import { ChipStatus, Table } from '../Components/Table'
import { ModalBase } from '../Components/ModalBase'

export default function ModuloUser() {

  const headers = [
    { text: 'DNI', className: 'text-center' },
    { text: 'Código del administrador', className: 'text-center' },
    { text:'Nombres', className: 'text-center' },
    { text:'Apellidos', className: 'text-center' },
    { text:'Rol', className: 'text-center' },
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
      <p className="text-center">Desde este panel puedes gestionar los administradores.</p>
      <ModalAdd />
      <Table headers={headers}>

        <tr className="[&>td]:h-12 [&>td]:px-4 [&>td]:py-1.5">
          <td className="text-center" width={160}>78348727</td>
          <td className="text-center" width={160}>A200</td>
          <td className="text-center" width={160}>Juan</td>
          <td className="text-center" width={160}>Perez Perez</td>
          <td className="text-center" width={160}>Empleado</td>
          <td className="text-center" width={160}>999999992</td>
          <td className="text-center" width={160}>juan200@gmail.com</td>
          <td className="text-center" width={160}>xyqadnj</td>
          <td className="text-center" width={160}>10/03/25</td>
          <td className="">
            <ChipStatus status={1} />
          </td>
          <td className="">
            <div className="flex items-center justify-center text-2xl gap-4">
              <ModalActions dniAdmin=' ' />
            </div>
          </td>
        </tr>
      </ Table>
    </div>
  )
}

interface ModalActions {
  dniAdmin: string;
}

function ModalActions({dniAdmin}: ModalActions){
  const editModal = useDisclosure()
  const viewModal = useDisclosure()
  const deleteModal = useDisclosure()

  //fetch product data by idProduc if needed
  // const fetchProductData = async (id: string) => {
  dniAdmin = dniAdmin || '1' // Example id, replace with actual data

  return (
    <>
      <TbEye className="text-blue-400 drop-shadow-xs cursor-pointer" onClick={viewModal.onOpen} />
      <TbEdit className="text-amber-400 drop-shadow-xs cursor-pointer" onClick={editModal.onOpen} />
      <TbTrash className="text-red-600 drop-shadow-xs cursor-pointer" onClick={deleteModal.onOpen} />
      {/* Edit Modal */}
      <ModalBase
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
        title="Editar administrador"
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
          <input type="hidden" value={dniAdmin} />
          <InputField
            label="DNI"
            name="adminDni"
            type="text"
            placeholder="Ingrese el DNI del administrador"
          />
          <InputField
            label="Nombres"
            name="adminNombre"
            type="text"
            placeholder="Ingrese los nombres del administrador"
            value={''} // Example value, replace with actual data
          />
          <InputField
            label="Apellidos"
            name="adminLastName"
            type="text"
            placeholder="Ingrese los apellidos del administrador"
            value={''} // Example value, replace with actual data
          />
          <InputField
            label="Rol"
            name="adminRol"
            type="text"
            placeholder="Ingrese los apellidos del administrador"
            value={''} // Example value, replace with actual data
          />
          <InputField
            label="Teléfono"
            name="adminNumber"
            type="text"
            placeholder="Ingrese el telefono del administrador"
          />
          <InputField
            label="Email"
            name="adminEmail"
            type="text"
            placeholder="Ingrese el email del administrador"
          />
          <InputField
            label="Contraseña"
            name="adminPassword"
            type="text"
            placeholder="Ingrese la contraseña del administrador"
          />
          <InputField
            label="Fecha de modificación"
            name="adminDateModificate"
            type="text"
            placeholder="Ingrese la contraseña del administrador"
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
          <p><strong>DNI:</strong> {dniAdmin}</p>
          <p><strong>Código del administrador:</strong> {dniAdmin}</p>
          <p><strong>Nombres:</strong> Juan </p>
          <p><strong>Apellidos:</strong> Perez Perez </p>
          <p><strong>Rol:</strong> Perez Perez </p>
          <p><strong>Teléfono:</strong> 999999992 </p>
          <p><strong>Email:</strong> juan200@gmail.com </p>
          <p><strong>Contraseña:</strong> xyqadn </p>
          <p><strong>Fecha de modificación:</strong>16/04/25</p>
          <p><strong>Estado:</strong> Activo</p>
        </div>
      </ModalBase>

      {/* Delete Modal */}
      <ModalBase
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        title="Eliminar administrador"
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
        <p>¿Estás seguro de que deseas eliminar el administrador del DNI {dniAdmin}?</p>
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
        Agregar nuevo administrador
      </Button>

      <ModalBase
        isOpen={addModal.isOpen}
        onClose={addModal.onClose}
        title="Agregar administrador"
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
            name="adminDni"
            type="text"
            placeholder="Ingrese el DNI del administrador"
          />
          <InputField
            label="Nombres"
            name="adminNombre"
            type="text"
            placeholder="Ingrese los nombres del administrador"
            value={''} // Example value, replace with actual data
          />
          <InputField
            label="Apellidos"
            name="adminLastName"
            type="text"
            placeholder="Ingrese los apellidos del administrador"
            value={''} // Example value, replace with actual data
          />
          <InputField
            label="Rol"
            name="adminRol"
            type="text"
            placeholder="Ingrese los apellidos del administrador"
            value={''} // Example value, replace with actual data
          />
          <InputField
            label="Teléfono"
            name="adminNumber"
            type="text"
            placeholder="Ingrese el telefono del administrador"
          />
          <InputField
            label="Email"
            name="adminEmail"
            type="text"
            placeholder="Ingrese el email del administrador"
          />
          <InputField
            label="Contraseña"
            name="adminPassword"
            type="text"
            placeholder="Ingrese la contraseña del administrador"
          />
          <InputField
            label="Fecha de modificación"
            name="adminDateModificate"
            type="text"
            placeholder="Ingrese la contraseña del administrador"
          />
        </form>
      </ModalBase>
    </>
  )
}