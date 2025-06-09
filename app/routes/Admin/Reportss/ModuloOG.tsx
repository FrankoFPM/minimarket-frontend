import { Button, useDisclosure } from '@heroui/react'
import { TbEdit, TbEye, TbTrash } from 'react-icons/tb'
import { InputField } from '~/Components/FormComponent'
import { ChipStatus, Table } from '../Components/Table'
import { ModalBase } from '../Components/ModalBase'

export default function ModuloSuppliersOG() {

  const headers = [
    { text:'#', className: 'text-center' },
    { text:'ID de reporte', className: 'text-center' },
    { text:'Productos vendidos', className: 'text-left' },
    { text:'Fecha de venta', className: 'text-left' },
    { text:'Precio de venta', className: 'text-left' },
    { text:'Estado', className: 'text-center' },
    { text:'Acciones', className: 'text-center' },
  ]

  return (
    <div className="flex flex-col bg-background mx-auto my-10 container gap-4">
      <h1 className="text-3xl font-bold text-center">Panel de administración</h1>
      <p className="text-center">Desde este panel puedes gestionar los reportes.</p>
      <ModalAdd />
      <Table headers={headers}>

        <tr className="[&>td]:h-12 [&>td]:px-4 [&>td]:py-1.5">
          <td className="text-center" width={160}>1</td>
          <td className="text-center" width={160}>R910</td>
          <td className="text-center" width={160}>Manzana</td>
          <td className="text-center" width={160}>10/03/25</td>
          <td className="text-center" width={160}>S/ 1.50</td>
          <td className="">
            <ChipStatus status={1} />
          </td>
          <td className="">
            <div className="flex items-center justify-center text-2xl gap-4">
              <ModalActions idReport='1' />
            </div>
          </td>
        </tr>
      </ Table>
    </div>
  )
}

interface ModalActions {
  idReport: string;
}

function ModalActions({idReport}: ModalActions){
  const editModal = useDisclosure()
  const viewModal = useDisclosure()
  const deleteModal = useDisclosure()

  //fetch product data by idProduc if needed
  // const fetchProductData = async (id: string) => {
  idReport = idReport || '1' // Example id, replace with actual data

  return (
    <>
      <TbEye className="text-blue-400 drop-shadow-xs cursor-pointer" onClick={viewModal.onOpen} />
      <TbEdit className="text-amber-400 drop-shadow-xs cursor-pointer" onClick={editModal.onOpen} />
      <TbTrash className="text-red-600 drop-shadow-xs cursor-pointer" onClick={deleteModal.onOpen} />
      {/* Edit Modal */}
      <ModalBase
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
        title="Editar reporte"
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
          <input type="hidden" value={idReport} />
          <InputField
            label="ID de reporte"
            name="idReport"
            type="text"
            placeholder="Ingrese el ID de reporte"
            value={''} // Example value, replace with actual data
          /><InputField
            label="Nombre del producto vendido"
            name="productName"
            type="text"
            placeholder="Ingrese el nombre del producto vendido"
            value={''} // Example value, replace with actual data
          />
          <InputField
            label="Fecha de venta"
            name="suppliersDateEntry"
            type="text"
            placeholder="Ingrese la fecha de venta"
          />
          <InputField
            label="Precio de venta"
            name="suppliersPriceSale"
            type="text"
            placeholder="Ingrese el precio de venta"
          />
          <InputField
            label="Cantidad total"
            name="Quantity"
            type="text"
            placeholder="Ingrese la cantidad total"
          />
        </form>
      </ModalBase>
      {/* View Modal */}
      <ModalBase
        isOpen={viewModal.isOpen}
        onClose={viewModal.onClose}
        title="Ver reporte"
        footer={
          <Button color="danger" onPress={viewModal.onClose}>
            Cerrar
          </Button>
        }
      >
        <div className="flex flex-col gap-4">
          <p><strong>ID de reporte:</strong> {idReport}</p>
          <p><strong>Productos vendidos:</strong> Proovedor xyz</p>
          <p><strong>Fecha de venta: </strong> manzana </p>
          <p><strong>Precio de venta:</strong>S/.1.50 </p>
        </div>
      </ModalBase>

      {/* Delete Modal */}
      <ModalBase
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        title="Eliminar reporte"
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
        <p>¿Estás seguro de que deseas eliminar el proovedor del ID {idReport}?</p>
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
        Agregar nuevo reporte
      </Button>

      <ModalBase
        isOpen={addModal.isOpen}
        onClose={addModal.onClose}
        title="Agregar reporte"
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
            label="ID de reporte"
            name="idReport"
            type="text"
            placeholder="Ingrese el ID de reporte"
            value={''} // Example value, replace with actual data
          /><InputField
            label="Nombre del producto vendido"
            name="productName"
            type="text"
            placeholder="Ingrese el nombre del producto vendido"
            value={''} // Example value, replace with actual data
          />
          <InputField
            label="Fecha de venta"
            name="suppliersDateEntry"
            type="text"
            placeholder="Ingrese la fecha de venta"
          />
          <InputField
            label="Precio de venta"
            name="suppliersPriceSale"
            type="text"
            placeholder="Ingrese el precio de venta"
          />
          <InputField
            label="Cantidad total"
            name="Quantity"
            type="text"
            placeholder="Ingrese la cantidad total"
          />
        </form>
      </ModalBase>
    </>
  )
}