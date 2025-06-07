import { Button, useDisclosure } from '@heroui/react'
import { TbEdit, TbEye, TbTrash } from 'react-icons/tb'
import { InputField } from '~/Components/FormComponent'
import { ChipStatus, Table } from '../Components/Table'
import { ModalBase } from '../Components/ModalBase'

export default function ModuloSales() {

  const headers = [
    { text:'Codigo de venta', className: 'text-center' },
    { text:'Codigo de empleado', className: 'text-center' },
    { text:'Empleado', className: 'text-center' }, //
    { text:'ID del Producto', className: 'text-center' },
    { text:'Nombre del Producto', className: 'text-center' },
    { text:'Cantidad', className: 'text-center' }, //
    { text:'Precio de venta', className: 'text-center' },
    { text:'Fecha de modificacion', className: 'text-center' },
    { text:'Estado', className: 'text-center' },
    { text:'Acciones', className: 'text-center' },
  ]

  return (
    <div className="flex flex-col bg-background mx-auto my-10 container gap-4">
      <h1 className="text-3xl font-bold text-center">Panel de administración</h1>
      <p className="text-center">Desde este panel puedes gestionar las ventas.</p>
      <ModalAdd />
      <Table headers={headers}>

        <tr className="[&>td]:h-12 [&>td]:px-4 [&>td]:py-1.5">
          <td className="text-center" width={160}>U101</td>
          <td className="text-center" width={160}>E300</td>
          <td className="text-center" width={160}>Juan Perez</td>
          <td className="text-center" width={160}>P102</td>
          <td className="text-center" width={160}>Arroz Costeño 1kg</td>
          <td className="text-center" width={160}>2</td>
          <td className="text-center" width={160}>S/ 3.50</td>
          <td className="text-center" width={160}>10/03/25</td>
          <td className="">
            <ChipStatus status={1} />
          </td>
          <td className="">
            <div className="flex items-center justify-center text-2xl gap-4">
              <ModalActions codSales='1' />
            </div>
          </td>
        </tr>
      </ Table>
    </div>
  )
}

interface ModalActions {
  codSales: string;
}

function ModalActions({codSales}: ModalActions){
  const editModal = useDisclosure()
  const viewModal = useDisclosure()
  const deleteModal = useDisclosure()

  //fetch product data by idProduc if needed
  // const fetchProductData = async (id: string) => {
  codSales = codSales || '1' // Example id, replace with actual data

  return (
    <>
      <TbEye className="text-blue-400 drop-shadow-xs cursor-pointer" onClick={viewModal.onOpen} />
      <TbEdit className="text-amber-400 drop-shadow-xs cursor-pointer" onClick={editModal.onOpen} />
      <TbTrash className="text-red-600 drop-shadow-xs cursor-pointer" onClick={deleteModal.onOpen} />
      {/* Edit Modal */}
      <ModalBase
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
        title="Editar venta"
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
          <input type="hidden" value={codSales} />
          <InputField
            label="Codigo de venta"
            name="salesCod"
            type="text"
            placeholder="Ingrese el codigo del producto"
          />
          <InputField
            label="Codigo de empleado"
            name="salesCod"
            type="text"
            placeholder="Ingrese el codigo del empleado"
          />
          <InputField
            label="Nombre del empleado"
            name="salesName"
            type="text"
            placeholder="Ingrese el nombre del empleado"
            value={'Manzana'} // Example value, replace with actual data
          />
          <InputField
            label="ID del producto"
            name="salesId"
            type="text"
            placeholder="Ingrese la descripción del producto"
          />
          <InputField
            label="Cantidad"
            name="salesCantidad"
            type="text"
            placeholder="Ingrese la cantidad del producto"
          />
          <InputField
            label="Precio de venta del producto"
            name="salesPrice"
            type="text"
            placeholder="Ingrese el precio del producto"
          />
        </form>
      </ModalBase>
      {/* View Modal */}
      <ModalBase
        isOpen={viewModal.isOpen}
        onClose={viewModal.onClose}
        title="Ver producto"
        footer={
          <Button color="danger" onPress={viewModal.onClose}>
            Cerrar
          </Button>
        }
      >
        <div className="flex flex-col gap-4">
          <p><strong>Código de venta:</strong> {codSales}</p>
          <p><strong>Código de empleado:</strong> {codSales}</p>
          <p><strong>Empleado:</strong> Manzana</p>
          <p><strong>ID del producto:</strong> abcdefg </p>
          <p><strong>Nombre del producto:</strong> abcdefg </p>
          <p><strong>Cantidad:</strong> 1</p>
          <p><strong>Precio de venta:</strong> S/3.50 </p>
          <p><strong>Cantidad:</strong> 20 </p>
          <p><strong>Fecha de modificación:</strong>10/03/25</p>
          <p><strong>Estado:</strong> Activo</p>
        </div>
      </ModalBase>

      {/* Delete Modal */}
      <ModalBase
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        title="Eliminar venta"
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
        <p>¿Estás seguro de que deseas eliminar la venta del codigo {codSales}?</p>
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
        Agregar nueva venta
      </Button>

      <ModalBase
        isOpen={addModal.isOpen}
        onClose={addModal.onClose}
        title="Agregar ventas"
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
            label="Codigo de venta"
            name="salesCod"
            type="text"
            placeholder="Ingrese el codigo del producto"
          />
          <InputField
            label="Codigo de empleado"
            name="salesCod"
            type="text"
            placeholder="Ingrese el codigo del empleado"
          />
          <InputField
            label="Nombre del empleado"
            name="salesName"
            type="text"
            placeholder="Ingrese el nombre del empleado"
            value={'Manzana'} // Example value, replace with actual data
          />
          <InputField
            label="ID del producto"
            name="salesId"
            type="text"
            placeholder="Ingrese la descripción del producto"
          />
          <InputField
            label="Cantidad"
            name="salesCantidad"
            type="text"
            placeholder="Ingrese la cantidad del producto"
          />
          <InputField
            label="Precio de venta del producto"
            name="salesPrice"
            type="text"
            placeholder="Ingrese el precio del producto"
          />
        </form>
      </ModalBase>
    </>
  )
}