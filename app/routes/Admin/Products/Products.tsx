import { Button, useDisclosure } from '@heroui/react'
import { TbEdit, TbEye, TbTrash } from 'react-icons/tb'
import { InputField } from '~/Components/FormComponent'
import { ChipStatus, Table } from '../Components/Table'
import { ModalBase } from '../Components/ModalBase'

export default function ModuloProducto() {

  const headers = [
    { text: 'ID', className: 'text-center' },
    { text:'Producto', className: 'text-center' },
    { text:'Descripción', className: 'text-center' },
    { text:'Stock', className: 'text-center' },
    { text:'Precio', className: 'text-center' },
    { text:'Categoría', className: 'text-center' },
    { text: 'Fecha de modificacion', className: 'text-left' },
    { text: 'Estado', className: 'text-center' },
    { text: 'Acciones', className: 'text-center' },
  ]

  return (
    <div className="flex flex-col bg-background mx-auto my-10 container gap-4">
      <h1 className="text-3xl font-bold text-center">Bienvenido al panel de administración</h1>
      <p className="text-center">Aquí puedes gestionar todos los aspectos de tu tienda.</p>
      <ModalAdd />
      <Table headers={headers}>

        <tr className="[&>td]:h-12 [&>td]:px-4 [&>td]:py-1.5">
          <td className="text-center" width={160}>1</td>
          <td>Manzana</td>
          <td>abcdef</td>
          <td>30</td>
          <td>S/.0.50</td>
          <td>10/03/25</td>
          <td className="">
            <ChipStatus status={1} />
          </td>
          <td className="">
            <div className="flex items-center justify-center text-2xl gap-4">
              <ModalActions idProduc='5' />
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
              Guardar cambios
            </Button>
          </>
        }
      >
        <form action="">
          <input type="hidden" value={idProduc} />
          <InputField
            label="Id del producto"
            name="productId"
            type="text"
            placeholder="Ingrese el nombre del producto"
          />
          <InputField
            label="Nombre del producto"
            name="productName"
            type="text"
            placeholder="Ingrese el nombre del producto"
            value={'Manzana'} // Example value, replace with actual data
          />
          <InputField
            label="Descripción del producto"
            name="productDate"
            type="text"
            placeholder="Ingrese el nombre del producto"
          />
          <InputField
            label="Stock de producto"
            name="productDate"
            type="text"
            placeholder="Ingrese el nombre del producto"
          />
          <InputField
            label="Precio de producto"
            name="productDate"
            type="text"
            placeholder="Ingrese el nombre del producto"
          />
          <InputField
            label="Categoría de producto"
            name="productDate"
            type="text"
            placeholder="Ingrese el nombre del producto"
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
          <p><strong>ID:</strong> {idProduc}</p>
          <p><strong>Nombre:</strong> Manzana</p>
          <p><strong>Descripción:</strong> abcdefg </p>
          <p><strong>Precio:</strong> S/0.50 </p>
          <p><strong>Stock:</strong> 20 </p>
          <p><strong>Categoría:</strong> Fruta </p>
          <p><strong>Fecha de modificación:</strong>10/03/25</p>
          <p><strong>Estado:</strong> Activo</p>
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
        <p>¿Estás seguro de que deseas eliminar el producto con ID {idProduc}?</p>
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
        className="w-fit mx-auto"
        onPress={addModal.onOpen}
      >
        Agregar producto
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
            label="ID del producto"
            name="productName"
            type="text"
            placeholder="Ingrese el nombre del producto"
          />
          <InputField
            label="Nombre del producto"
            name="productName"
            type="text"
            placeholder="Ingrese el nombre del producto"
          />
          <InputField
            label="Descripción del producto"
            name="productDescription"
            type="text"
            placeholder="Ingrese una descripción del producto"
          />
          <InputField
            label="Precio del producto"
            name="productPrice"
            type="number"
            placeholder="Ingrese el precio del producto"
          />
          <InputField
            label="Cantidad en stock del producto"
            name="productStock"
            type="number"
            placeholder="Ingrese la cantidad disponible en stock"
          />
          <InputField
            label="Categoría del producto"
            name="productCategory"
            type="text"
            placeholder="Ingrese la categoría del producto"
          />
        </form>
      </ModalBase>
    </>
  )
}