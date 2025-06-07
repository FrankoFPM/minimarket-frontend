import { Button, useDisclosure } from '@heroui/react'
import { TbEdit, TbEye, TbTrash } from 'react-icons/tb'
import { InputField } from '~/Components/FormComponent'
import { ChipStatus, Table } from '../Components/Table'
import { ModalBase } from '../Components/ModalBase'

export default function ModuloProduct() {

  const headers = [
    { text:'Código', className: 'text-center' },
    { text:'Nombre de producto', className: 'text-center' },
    { text:'Categoría', className: 'text-center' },
    { text:'Descripción', className: 'text-center' },
    { text:'Stock actual', className: 'text-center' },
    { text:'Precio de venta', className: 'text-center' },
    { text:'Precio de compra', className: 'text-center' },
    { text:'Fecha de modificacion', className: 'text-center' },
    { text:'Estado', className: 'text-center' },
    { text:'Acciones', className: 'text-center' },
  ]

  return (
    <div className="flex flex-col bg-background mx-auto my-10 container gap-4">
      <h1 className="text-3xl font-bold text-center">Panel de administración</h1>
      <p className="text-center">Desde este panel puedes gestionar los productos.</p>
      <ModalAdd />
      <Table headers={headers}>

        <tr className="[&>td]:h-12 [&>td]:px-4 [&>td]:py-1.5">
          <td className="text-center" width={160}>U101</td>
          <td className="text-center" width={160}>Manzana</td>
          <td className="text-center" width={160}>Fruta</td>
          <td className="text-center" width={160}>abcdef</td>
          <td className="text-center" width={160}>30</td>
          <td className="text-center" width={160}>S/.0.50</td>
          <td className="text-center" width={160}>S/.0.80</td>
          <td className="text-center" width={160}>10/03/25</td>
          <td className="">
            <ChipStatus status={1} />
          </td>
          <td className="">
            <div className="flex items-center justify-center text-2xl gap-4">
              <ModalActions idProduc='1' />
            </div>
          </td>
        </tr>
      </ Table>
    </div>
  )
}

interface ModalActions {
  idProduc: string;
}

function ModalActions({idProduc}: ModalActions){
  const editModal = useDisclosure()
  const viewModal = useDisclosure()
  const deleteModal = useDisclosure()

  //fetch product data by idProduc if needed
  // const fetchProductData = async (id: string) => {
  idProduc = idProduc || '1' // Example id, replace with actual data

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
          <input type="hidden" value={idProduc} />
          <InputField
            label="Código"
            name="productId"
            type="text"
            placeholder="Ingrese el ID del producto"
          />
          <InputField
            label="Nombre"
            name="productName"
            type="text"
            placeholder="Ingrese el nombre del producto"
            value={'Manzana'} // Example value, replace with actual data
          />
          <InputField
            label="Categoría de producto"
            name="productDate"
            type="text"
            placeholder="Ingrese la categoría del producto"
          />
          <InputField
            label="Descripción"
            name="productDate"
            type="text"
            placeholder="Ingrese la descripción del producto"
          />
          <InputField
            label="Stock actual"
            name="productDate"
            type="text"
            placeholder="Ingrese el stock actual del producto"
          />
          <InputField
            label="Precio de venta"
            name="productDate"
            type="text"
            placeholder="Ingrese el precio de venta del producto"
          />
          <InputField
            label="Precio de compra"
            name="productDate"
            type="text"
            placeholder="Ingrese el precio de compra del producto"
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
          <p><strong>Código:</strong> {idProduc}</p>
          <p><strong>Nombre:</strong> Manzana</p>
          <p><strong>Categoría:</strong> Fruta </p>
          <p><strong>Descripción:</strong> abcdefg </p>
          <p><strong>Precio:</strong> S/0.50 </p>
          <p><strong>Stock:</strong> 20 </p>
          <p><strong>Fecha de modificación:</strong>10/03/25</p>
        </div>
      </ModalBase>

      {/* Delete Modal */}
      <ModalBase
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        title="Eliminar producto"
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
        <p>¿Estás seguro de que deseas eliminar el producto del ID {idProduc}?</p>
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
        Agregar nuevo producto
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
            Guardar producto
            </Button>
          </>
        }
      >
        <form action="">
          <InputField
            label="Código"
            name="productName"
            type="text"
            placeholder="Ingrese el ID del producto"
          />
          <InputField
            label="Nombre"
            name="productName"
            type="text"
            placeholder="Ingrese el nombre del producto"
          />
          <InputField
            label="Categoría del producto"
            name="productCategory"
            type="text"
            placeholder="Ingrese la categoría del producto"
          />
          <InputField
            label="Descripción"
            name="productDescription"
            type="text"
            placeholder="Ingrese una descripción del producto"
          />
          <InputField
            label="Precio de venta"
            name="productPrice"
            type="number"
            placeholder="Ingrese el precio del producto"
          />
          <InputField
            label="Precio de compra"
            name="productPrice"
            type="number"
            placeholder="Ingrese el precio de compra del producto"
          />
          <InputField
            label="Cantidad en stock actual"
            name="productStock"
            type="number"
            placeholder="Ingrese la cantidad disponible del stock actual"
          />
        </form>
      </ModalBase>
    </>
  )
}