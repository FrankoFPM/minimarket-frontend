import { Button, useDisclosure } from '@heroui/react'
import { TbEdit, TbEye, TbTrash } from 'react-icons/tb'
import { InputField } from '~/Components/FormComponent'
import { ChipStatus, Table } from '../Components/Table'
import { ModalBase } from '../Components/ModalBase'

export default function ModuloSuppliers() {

  const headers = [
    { text:'ID', className: 'text-center' },
    { text:'Nombre de proovedor', className: 'text-left' },
    { text:'Nombre de producto', className: 'text-left' },
    { text:'Fecha de ingreso', className: 'text-left' },
    { text:'Cantidad total', className: 'text-left' },
    { text:'Precio unitario', className: 'text-left' },
    { text:'Estado', className: 'text-center' },
    { text:'Acciones', className: 'text-center' },
  ]

  return (
    <div className="flex flex-col bg-background mx-auto my-10 container gap-4">
      <h1 className="text-3xl font-bold text-center">Panel de administración</h1>
      <p className="text-center">Desde este panel puedes gestionar los proovedores.</p>
      <ModalAdd />
      <Table headers={headers}>

        <tr className="[&>td]:h-12 [&>td]:px-4 [&>td]:py-1.5">
          <td className="text-center" width={160}>IN0012</td>
          <td className="text-center" width={160}>Proovedor xyz</td>
          <td className="text-center" width={160}>Manzana</td>
          <td className="text-center" width={160}>10/03/25</td>
          <td className="text-center" width={160}>100</td>
          <td className="text-center" width={160}>S/ 1.50</td>
          <td className="">
            <ChipStatus status={1} />
          </td>
          <td className="">
            <div className="flex items-center justify-center text-2xl gap-4">
              <ModalActions idSupplier='1' />
            </div>
          </td>
        </tr>
      </ Table>
    </div>
  )
}

interface ModalActions {
  idSupplier: string;
}

function ModalActions({idSupplier}: ModalActions){
  const editModal = useDisclosure()
  const viewModal = useDisclosure()
  const deleteModal = useDisclosure()

  //fetch product data by idProduc if needed
  // const fetchProductData = async (id: string) => {
  idSupplier = idSupplier || '1' // Example id, replace with actual data

  return (
    <>
      <TbEye className="text-blue-400 drop-shadow-xs cursor-pointer" onClick={viewModal.onOpen} />
      <TbEdit className="text-amber-400 drop-shadow-xs cursor-pointer" onClick={editModal.onOpen} />
      <TbTrash className="text-red-600 drop-shadow-xs cursor-pointer" onClick={deleteModal.onOpen} />
      {/* Edit Modal */}
      <ModalBase
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
        title="Editar producto"
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
          <input type="hidden" value={idSupplier} />
          <InputField
            label="ID"
            name="suppliersID"
            type="text"
            placeholder="Ingrese el codigo de inventario"
          />
          <InputField
            label="Nombre del proovedor"
            name="salesName"
            type="text"
            placeholder="Ingrese el nombre del proovedor"
            value={''} // Example value, replace with actual data
          />
          <InputField
            label="Nombre del producto"
            name="salesName"
            type="text"
            placeholder="Ingrese el nombre del producto"
            value={''} // Example value, replace with actual data
          />
          <InputField
            label="Fecha de ingreso"
            name="suppliersDateEntry"
            type="text"
            placeholder="Ingrese la fecha de ingreso"
          />
          <InputField
            label="Cantidad total"
            name="inventoryDateExpiration"
            type="text"
            placeholder="Ingrese la fecha de vencimiento"
          />
          <InputField
            label="Precio total"
            name="suppliersUnitPrice"
            type="text"
            placeholder="Ingrese el precio de venta"
          />
        </form>
      </ModalBase>
      {/* View Modal */}
      <ModalBase
        isOpen={viewModal.isOpen}
        onClose={viewModal.onClose}
        title="Ver proovedor"
        footer={
          <Button color="danger" onPress={viewModal.onClose}>
            Cerrar
          </Button>
        }
      >
        <div className="flex flex-col gap-4">
          <p><strong>Código:</strong> {idSupplier}</p>
          <p><strong>Nombre del proovedor:</strong> Proovedor xyz</p>
          <p><strong>Nombre del producto:</strong> manzana </p>
          <p><strong>Fecha de ingreso:</strong>10/03/25</p>
          <p><strong>Cantidad total:</strong>100</p>
          <p><strong>Precio total:</strong>S/.1.50 </p>
          <p><strong>Estado:</strong> Activo</p>
        </div>
      </ModalBase>

      {/* Delete Modal */}
      <ModalBase
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        title="Eliminar proovedor"
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
        <p>¿Estás seguro de que deseas eliminar el proovedor del ID {idSupplier}?</p>
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
        Agregar nuevo proovedor
      </Button>

      <ModalBase
        isOpen={addModal.isOpen}
        onClose={addModal.onClose}
        title="Agregar proovedor"
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
            label="ID"
            name="suppliersID"
            type="text"
            placeholder="Ingrese el codigo de inventario"
          />
          <InputField
            label="Nombre del proovedor"
            name="salesName"
            type="text"
            placeholder="Ingrese el nombre del proovedor"
            value={''} // Example value, replace with actual data
          />
          <InputField
            label="Nombre del producto"
            name="salesName"
            type="text"
            placeholder="Ingrese el nombre del producto"
            value={''} // Example value, replace with actual data
          />
          <InputField
            label="Fecha de ingreso"
            name="suppliersDateEntry"
            type="text"
            placeholder="Ingrese la fecha de ingreso"
          />
          <InputField
            label="Cantidad total"
            name="inventoryDateExpiration"
            type="text"
            placeholder="Ingrese la cantidad total"
          />
          <InputField
            label="Precio total"
            name="suppliersUnitPrice"
            type="text"
            placeholder="Ingrese el precio total"
          />
        </form>
      </ModalBase>
    </>
  )
}