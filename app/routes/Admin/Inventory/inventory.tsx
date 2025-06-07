import { Button, useDisclosure } from '@heroui/react'
import { TbEdit, TbEye, TbTrash } from 'react-icons/tb'
import { InputField } from '~/Components/FormComponent'
import { ChipStatus, Table } from '../Components/Table'
import { ModalBase } from '../Components/ModalBase'

export default function ModuloInventory() {

  const headers = [
    { text:'Codigo', className: 'text-center' },
    { text:'Nombre del Proovedor', className: 'text-left' },
    { text:'Nombre del producto', className: 'text-left' },
    { text:'Stock máximo', className: 'text-left' },
    { text:'Stock mínimo', className: 'text-left' },
    { text:'Precio costo', className: 'text-left' },
    { text:'Fecha de Ingreso', className: 'text-left' },
    { text:'Fecha de Vencimiento', className: 'text-left' },
    { text:'Estado', className: 'text-center' },
    { text:'Acciones', className: 'text-center' },
  ]

  return (
    <div className="flex flex-col bg-background mx-auto my-10 container gap-4">
      <h1 className="text-3xl font-bold text-center">Panel de administración</h1>
      <p className="text-center">Desde este panel puedes gestionar el inventario.</p>
      <ModalAdd />
      <Table headers={headers}>

        <tr className="[&>td]:h-12 [&>td]:px-4 [&>td]:py-1.5">
          <td className="text-center" width={160}>IN0012</td>
          <td className="text-center" width={160}>Proovedor xyz</td>
          <td className="text-center" width={160}>Manzana</td>
          <td className="text-center" width={160}>60</td>
          <td className="text-center" width={160}>20</td>
          <td className="text-center" width={160}>S/ 1.50</td>
          <td className="text-center" width={160}>01/01/2025</td>
          <td className="text-center" width={160}>01/01/2026</td>
          <td className="">
            <ChipStatus status={1} />
          </td>
          <td className="">
            <div className="flex items-center justify-center text-2xl gap-4">
              <ModalActions codInventory='1' />
            </div>
          </td>
        </tr>
      </ Table>
    </div>
  )
}

interface ModalActions {
  codInventory: string;
}

function ModalActions({codInventory}: ModalActions){
  const editModal = useDisclosure()
  const viewModal = useDisclosure()
  const deleteModal = useDisclosure()

  //fetch product data by idProduc if needed
  // const fetchProductData = async (id: string) => {
  codInventory = codInventory || '1' // Example id, replace with actual data

  return (
    <>
      <TbEye className="text-blue-400 drop-shadow-xs cursor-pointer" onClick={viewModal.onOpen} />
      <TbEdit className="text-amber-400 drop-shadow-xs cursor-pointer" onClick={editModal.onOpen} />
      <TbTrash className="text-red-600 drop-shadow-xs cursor-pointer" onClick={deleteModal.onOpen} />
      {/* Edit Modal */}
      <ModalBase
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
        title="Editar inventario"
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
          <input type="hidden" value={codInventory} />
          <InputField
            label="Codigo"
            name="inventoryCod"
            type="text"
            placeholder="Ingrese el codigo de inventario"
          />
          <InputField
            label="Nombre del proovedor"
            name="salesName"
            type="text"
            placeholder="Ingrese el nombre del proovedor"
            value={'Manzana'} // Example value, replace with actual data
          />
          <InputField
            label="Nombre del producto"
            name="salesName"
            type="text"
            placeholder="Ingrese el nombre del producto"
            value={'Manzana'} // Example value, replace with actual data
          />
          <InputField
            label="Stock máximo"
            name="inventoryStock"
            type="text"
            placeholder="Ingrese la descripción del producto"
          />
          <InputField
            label="Stock mínimo"
            name="inventoryStockMinumun"
            type="text"
            placeholder="Ingrese la descripción del producto"
          />
          <InputField
            label="Precio de costo"
            name="inventoryPriceCost"
            type="text"
            placeholder="Ingrese la cantidad del producto"
          />
          <InputField
            label="Precio de venta"
            name="inventoryPriceSell"
            type="text"
            placeholder="Ingrese el precio de venta"
          />
          <InputField
            label="Fecha de ingreso"
            name="inventoryDateEntry"
            type="text"
            placeholder="Ingrese la fecha de ingreso"
          />
          <InputField
            label="Fecha de vencimiento"
            name="inventoryDateExpiration"
            type="text"
            placeholder="Ingrese la fecha de vencimiento"
          />
        </form>
      </ModalBase>
      {/* View Modal */}
      <ModalBase
        isOpen={viewModal.isOpen}
        onClose={viewModal.onClose}
        title="Ver inventario"
        footer={
          <Button color="danger" onPress={viewModal.onClose}>
            Cerrar
          </Button>
        }
      >
        <div className="flex flex-col gap-4">
          <p><strong>Código:</strong> {codInventory}</p>
          <p><strong>Nombre del proovedor:</strong> Proovedor xyz</p>
          <p><strong>Nombre del producto:</strong> manzana </p>
          <p><strong>Stock máximo:</strong>20</p>
          <p><strong>Stock mínimo:</strong>10</p>
          <p><strong>Precio de costo:</strong>S/.1.50 </p>
          <p><strong>Fecha de ingreso:</strong>10/03/25</p>
          <p><strong>Fecha de vencimiento:</strong>10/03/26</p>
          <p><strong>Estado:</strong> Activo</p>
        </div>
      </ModalBase>

      {/* Delete Modal */}
      <ModalBase
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        title="Eliminar inventario"
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
        <p>¿Estás seguro de que deseas eliminar el inventario del código {codInventory}?</p>
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
        Agregar nuevo inventario
      </Button>

      <ModalBase
        isOpen={addModal.isOpen}
        onClose={addModal.onClose}
        title="Agregar producto"
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
            label="Codigo"
            name="inventoryCod"
            type="text"
            placeholder="Ingrese el codigo de inventario"
          />
          <InputField
            label="Nombre del proovedor"
            name="suppliersName"
            type="text"
            placeholder="Ingrese el nombre del proovedor"
            value={''} // Example value, replace with actual data
          />
          <InputField
            label="Nombre del producto"
            name="productName"
            type="text"
            placeholder="Ingrese el nombre del producto"
            value={''} // Example value, replace with actual data
          />
          <InputField
            label="Stock máximo"
            name="inventoryStock"
            type="text"
            placeholder="Ingrese la descripción del producto"
          />
          <InputField
            label="Stock mínimo"
            name="inventoryStockMinumun"
            type="text"
            placeholder="Ingrese la descripción del producto"
          />
          <InputField
            label="Precio de costo"
            name="inventoryPriceCost"
            type="text"
            placeholder="Ingrese la cantidad del producto"
          />
          <InputField
            label="Fecha de ingreso"
            name="inventoryDateEntry"
            type="text"
            placeholder="Ingrese la fecha de ingreso"
          />
          <InputField
            label="Fecha de vencimiento"
            name="inventoryDateExpiration"
            type="text"
            placeholder="Ingrese la fecha de vencimiento"
          />
        </form>
      </ModalBase>
    </>
  )
}