import { addToast, Button, useDisclosure } from '@heroui/react'
import { TbEdit, TbEye, TbTrash } from 'react-icons/tb'
import { InputField } from '~/Components/FormComponent'
import { ChipStatus, Table } from '../Components/Table'
import { ModalBase } from '../Components/ModalBase'
import { useEffect, useState } from 'react'
import { createProveedor, getProveedores, softDeleteProveedor, updateProveedor } from '~/services/proveedorService'
import { useForm } from 'react-hook-form'

interface Proveedor {
  id: number,
  nombre: string,
  contacto: string,
  telefono: string,
  direccion: string,
  email: string,
  estado: number,
  createdAt?: string,
  updatedAt?: string
}
interface ProveedorApi {
  id: number,
  nombre: string,
  contacto: string,
  telefono: string,
  direccion: string,
  email: string,
  estado: string, // estado puede ser 'activo' o 'inactivo'
  createdAt: string,
  updatedAt: string
}

export default function ModuloSuppliers() {

  const headers = [
    { text:'ID', className: 'text-center' },
    { text:'Nombre de proovedor', className: 'text-left' },
    { text:'Representante', className: 'text-left' },
    { text:'Teléfono', className: 'text-left' },
    { text:'Dirección', className: 'text-left' },
    { text:'Email', className: 'text-left' },
    { text:'Estado', className: 'text-center' },
    { text:'Acciones', className: 'text-center' },
  ]

  const [suppliers, setSuppliers] = useState<Proveedor[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchSuppliers = async () => {
    setLoading(true)
    getProveedores()
      .then((data: ProveedorApi[]) => {
        const formattedData = data.map((supplier) => ({
          id: supplier.id,
          nombre: supplier.nombre,
          contacto: supplier.contacto,
          telefono: supplier.telefono,
          direccion: supplier.direccion,
          email: supplier.email,
          estado: supplier.estado === 'activo' ? 1 : 0, // Convertir estado a número
          createdAt: supplier.createdAt,
          updatedAt: supplier.updatedAt
        }))
        setSuppliers(formattedData)
      })
      .catch((error) => {
        addToast({
          title: 'Error al cargar proveedores',
          description: error instanceof Error ? error.message : 'Error desconocido',
          color: 'danger'
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchSuppliers()
  }, [])

  return (
    <div className="flex flex-col bg-background mx-auto my-10 container gap-4">
      <h1 className="text-3xl font-bold text-center">Panel de administración</h1>
      <p className="text-center">Desde este panel puedes gestionar los proovedores.</p>
      <ModalAdd onSuccess={fetchSuppliers} />
      {
        loading ? (
          <div className="text-center py-8">Cargando proveedores...</div>
        ) : (
          <Table headers={headers}>
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className="[&>td]:h-12 [&>td]:px-4 [&>td]:py-1.5">
                <td className="text-center" width={160}>{supplier.id}</td>
                <td className="text-left" width={160}>{supplier.nombre}</td>
                <td className="text-left" width={160}>{supplier.contacto}</td>
                <td className="text-left" width={160}>{supplier.telefono}</td>
                <td className="text-left" width={160}>{supplier.direccion}</td>
                <td className="text-left" width={160}>{supplier.email}</td>
                <td className="">
                  <ChipStatus status={supplier.estado} />
                </td>
                <td className="">
                  <div className="flex items-center justify-center text-2xl gap-4">
                    <ModalActions supplier={supplier} OnSuccess={fetchSuppliers} />
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        )
      }
    </div>
  )
}

interface ModalActions {
  supplier: Proveedor;
  OnSuccess: () => void;
}

function ModalActions({supplier, OnSuccess}: ModalActions){
  const editModal = useDisclosure()
  const viewModal = useDisclosure()
  const deleteModal = useDisclosure()

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

  interface FormData {
    nombre: string;
    contacto: string; //nombre del representante
    telefono: string;
    direccion: string;
    email: string;
  }

  const onSubmit = async (data: FormData) => {
    console.log('Datos del formulario:', data)
    if (data.nombre && data.contacto && data.telefono && data.direccion && data.email) {
      try {
        // Aquí puedes llamar a tu servicio para actualizar el proveedor
        const updateSupplier = await updateProveedor(supplier.id, {
          nombre: data.nombre,
          contacto: data.contacto,
          telefono: data.telefono,
          direccion: data.direccion,
          email: data.email,
          estado: supplier.estado === 1 ? 'activo' : 'inactivo'
        })

        console.log('Proveedor actualizado:', updateSupplier)
        // await updateProveedor(supplier.id, data);
        addToast({
          title: 'Proveedor actualizado',
          description: 'El proveedor se ha actualizado correctamente.',
          color: 'success'
        })
        OnSuccess()
        editModal.onClose()
      } catch (error) {
        addToast({
          title: 'Error al actualizar proveedor',
          description: error instanceof Error ? error.message : 'Error desconocido',
          color: 'danger'
        })
      }
    }
    else {
      addToast({
        title: 'Error',
        description: 'Por favor, completa todos los campos requeridos.',
        color: 'danger'
      })
    }
  }

  const handleDelete = async () => {
    await softDeleteProveedor(supplier.id)
    addToast({
      title: 'Proveedor eliminado',
      description: 'El proveedor se ha eliminado correctamente.',
      color: 'success'
    })
    OnSuccess()
    deleteModal.onClose()
  }

  useEffect(() => {
    if (editModal.isOpen) {
      reset({
        nombre: supplier.nombre,
        contacto: supplier.contacto,
        telefono: supplier.telefono,
        direccion: supplier.direccion,
        email: supplier.email
      })
    }
  }, [editModal.isOpen, supplier, reset])

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
              type='submit'
              form='editSupplierForm'
            >
              Guardar
            </Button>
          </>
        }
      >
        <form id="editSupplierForm" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Nombre del proovedor"
            type="text"
            placeholder="Ingrese el nombre del proovedor"
            {...register('nombre', { required: 'El nombre del proovedor es requerido' })}
            error={errors.nombre?.message}
            className='rounded-md'
          />
          <InputField
            label="Contacto"
            type="text"
            placeholder="Ingrese el nombre del contacto/representante"
            {...register('contacto', { required: 'El contacto es requerido' })}
            error={errors.contacto?.message}
            className='rounded-md'
          />
          <InputField
            label="Teléfono"
            type="text"
            placeholder="Ingrese el número de teléfono"
            {...register('telefono', { required: 'El teléfono es requerido' })}
            error={errors.telefono?.message}
            className='rounded-md'
          />
          <InputField
            label="Dirección"
            type="text"
            placeholder="Ingrese la dirección del proovedor"
            {...register('direccion', { required: 'La dirección es requerida' })}
            error={errors.direccion?.message}
            className='rounded-md'
          />
          <InputField
            label="Email"
            type="email"
            placeholder="Ingrese el email del proovedor"
            {...register('email', { required: 'El email es requerido' })}
            error={errors.email?.message}
            className='rounded-md'
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
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <tbody>
              <tr>
                <td className="font-semibold py-2 px-4 text-gray-700">ID:</td>
                <td className="py-2 px-4">{supplier.id}</td>
              </tr>
              <tr>
                <td className="font-semibold py-2 px-4 text-gray-700">Nombre del proveedor:</td>
                <td className="py-2 px-4">{supplier.nombre}</td>
              </tr>
              <tr>
                <td className="font-semibold py-2 px-4 text-gray-700">Contacto:</td>
                <td className="py-2 px-4">{supplier.contacto}</td>
              </tr>
              <tr>
                <td className="font-semibold py-2 px-4 text-gray-700">Teléfono:</td>
                <td className="py-2 px-4">{supplier.telefono}</td>
              </tr>
              <tr>
                <td className="font-semibold py-2 px-4 text-gray-700">Dirección:</td>
                <td className="py-2 px-4">{supplier.direccion}</td>
              </tr>
              <tr>
                <td className="font-semibold py-2 px-4 text-gray-700">Email:</td>
                <td className="py-2 px-4">{supplier.email}</td>
              </tr>
              <tr>
                <td className="font-semibold py-2 px-4 text-gray-700">Estado:</td>
                <td className="py-2 px-4">{supplier.estado === 1 ? 'Activo' : 'Inactivo'}</td>
              </tr>
              <tr>
                <td className="font-semibold py-2 px-4 text-gray-700">Fecha de creación:</td>
                <td className="py-2 px-4">
                  {supplier.createdAt
                    ? new Date(supplier.createdAt).toLocaleDateString()
                    : 'Sin fecha'}
                </td>
              </tr>
              <tr>
                <td className="font-semibold py-2 px-4 text-gray-700">Fecha de actualización:</td>
                <td className="py-2 px-4">
                  {supplier.updatedAt
                    ? new Date(supplier.updatedAt).toLocaleDateString()
                    : 'Sin fecha'}
                </td>
              </tr>
            </tbody>
          </table>
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
            <Button color="success" onPress={handleDelete}>
              Eliminar
            </Button>
          </>
        }
      >
        <p>¿Estás seguro de que deseas eliminar el proovedor <strong>{supplier.nombre}</strong>?</p>
        <p>Esta acción no se puede deshacer.</p>
      </ModalBase>

    </>
  )
}

function ModalAdd({ onSuccess }: { onSuccess: () => void }){
  const addModal = useDisclosure()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

  interface FormData {
    nombre: string;
    contacto: string; //nombre del representante
    telefono: string;
    direccion: string;
    email: string;
  }

  const onSubmit = async (data: FormData) => {
    console.log('Datos del formulario:', data)
    if (data.nombre && data.contacto && data.telefono && data.direccion && data.email) {
      try {
        // Aquí puedes llamar a tu servicio para crear el proveedor
        const newSupplier = await createProveedor({
          nombre: data.nombre,
          contacto: data.contacto,
          telefono: data.telefono,
          direccion: data.direccion,
          email: data.email,
          estado: 'activo' // Por defecto, el nuevo proveedor estará activo
        })
        console.log('Proveedor creado:', newSupplier)
        addToast({
          title: 'Proveedor creado',
          description: 'El proveedor se ha creado correctamente.',
          color: 'success'
        })
        onSuccess()
        reset() // Limpiar el formulario después de crear el proveedor
        addModal.onClose()
      } catch (error) {
        addToast({
          title: 'Error al crear proveedor',
          description: error instanceof Error ? error.message : 'Error desconocido',
          color: 'danger'
        })
      }
    }
    else {
      addToast({
        title: 'Error',
        description: 'Por favor, completa todos los campos requeridos.',
        color: 'danger'
      })
    }
  }

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
            <Button
              color="success"
              type='submit'
              form='addSupplierForm'
            >
            Guardar
            </Button>
          </>
        }
      >
        <form id="addSupplierForm" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Nombre del proovedor"
            type="text"
            placeholder="Ingrese el nombre del proovedor"
            {...register('nombre', { required: 'El nombre del proovedor es requerido' })}
            error={errors.nombre?.message}
            className='rounded-md'
          />
          <InputField
            label="Contacto"
            type="text"
            placeholder="Ingrese el nombre del contacto/representante"
            {...register('contacto', { required: 'El contacto es requerido' })}
            error={errors.contacto?.message}
            className='rounded-md'
          />
          <InputField
            label="Teléfono"
            type="text"
            placeholder="Ingrese el número de teléfono"
            {...register('telefono', { required: 'El teléfono es requerido' })}
            error={errors.telefono?.message}
            className='rounded-md'
          />
          <InputField
            label="Dirección"
            type="text"
            placeholder="Ingrese la dirección del proovedor"
            {...register('direccion', { required: 'La dirección es requerida' })}
            error={errors.direccion?.message}
            className='rounded-md'
          />
          <InputField
            label="Email"
            type="email"
            placeholder="Ingrese el email del proovedor"
            {...register('email', { required: 'El email es requerido' })}
            error={errors.email?.message}
            className='rounded-md'
          />
        </form>
      </ModalBase>
    </>
  )
}