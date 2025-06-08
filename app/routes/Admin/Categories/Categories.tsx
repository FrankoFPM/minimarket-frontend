import { addToast, Button, useDisclosure } from '@heroui/react'
import { TbEdit, TbEye, TbTrash } from 'react-icons/tb'
import { InputField } from '~/Components/FormComponent'
import { ChipStatus, Table } from '../Components/Table'
import { ModalBase } from '../Components/ModalBase'
import { createCategoria, getCategorias, softDeleteCategoria, updateCategoria } from '~/services/categoriaService'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface Category {
  id: number;
  nombre: string;
  descripcion: string;
  estado: number;
  createdAt?: string; // Opcional, puede que no se use en el frontend
  updatedAt?: string; // Opcional, puede que no se use en el frontend
}

interface CategoriaApi {
  id: number;
  nombre: string;
  descripcion: string;
  estado: string; // 'activo' o 'inactivo',
  createdAt: string;
  updatedAt: string;
}

interface ModalActionsProps {
  category: Category;
  onSuccess: () => void;
}

export default function ModuloCategories() {

  const headers = [
    { text:'ID', className: 'text-center' },
    { text:'Nombre', className: 'text-left' },
    { text:'Descripción', className: 'text-left' },
    { text:'Estado', className: 'text-center' },
    { text:'Acciones', className: 'text-center' },
  ]

  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCategorias = () => {
    setLoading(true)
    getCategorias()
      .then((data: CategoriaApi[]) => {
        setCategories(
          data.map((cat) => ({
            id: cat.id,
            nombre: cat.nombre,
            descripcion: cat.descripcion,
            estado: cat.estado === 'activo' ? 1 : 0,
            createdAt: cat.createdAt,
            updatedAt: cat.updatedAt,
          }))
        )
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchCategorias()
  }, [])

  return (
    <div className="flex flex-col bg-background mx-auto my-10 container gap-4">
      <h1 className="text-3xl font-bold text-center">Panel de categorías</h1>
      <p className="text-center">Desde este panel puedes gestionar las categorías de productos.</p>
      <ModalAdd onSuccess={fetchCategorias} />
      {loading ? (
        <div className="text-center py-8">Cargando categorías...</div>
      ) : (
        <Table headers={headers}>
          {categories.map((cat) => (
            <tr key={cat.id} className="[&>td]:h-12 [&>td]:px-4 [&>td]:py-1.5">
              <td className="text-center" width={100}>{cat.id}</td>
              <td className="text-left" width={200}>{cat.nombre}</td>
              <td className="text-left" width={300}>{cat.descripcion}</td>
              <td className="text-center" width={120}>
                <ChipStatus status={cat.estado} />
              </td>
              <td className="text-center">
                <div className="flex items-center justify-center text-2xl gap-4">
                  <ModalActions category={cat} onSuccess={fetchCategorias} />
                </div>
              </td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  )
}

function ModalActions({ category, onSuccess }: ModalActionsProps){
  const editModal = useDisclosure()
  const viewModal = useDisclosure()
  const deleteModal = useDisclosure()

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

  interface FormData {
    nombre: string;
    descripcion: string;
  }

  const onSubmit = async (data: FormData) => {
    console.log('Datos del formulario:', data)
    if (!data.nombre || !data.descripcion) {
      addToast({
        title: 'Error',
        description: 'Por favor, completa todos los campos.',
        color: 'danger',
        shouldShowTimeoutProgress: true,
      })
      return
    }

    try {
      // Aquí deberías llamar a la función de actualización de categoría
      // await updateCategoria(category.id, data)
      const updatedCategory = await updateCategoria(category.id, {
        nombre: data.nombre,
        descripcion: data.descripcion,
        estado: category.estado === 1 ? 'activo' : 'inactivo', // Mantener el estado actual
      })

      console.log('Categoría actualizada:', updatedCategory)
      addToast({
        title: 'Éxito',
        description: 'Categoría actualizada exitosamente.',
        color: 'success',
        shouldShowTimeoutProgress: true,
      })

      editModal.onClose()
      onSuccess()
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error al actualizar categoría:', error.message)
        addToast({
          title: 'Error',
          description: error.message,
          color: 'danger',
          shouldShowTimeoutProgress: true,
        })
      } else {
        console.error('Error desconocido:', error)
        addToast({
          title: 'Error',
          description: 'Ocurrió un error desconocido al actualizar la categoría.',
          color: 'danger',
          shouldShowTimeoutProgress: true,
        })
      }
      return
    }
  }

  const handleDelete = async () => {
    await softDeleteCategoria(category.id)
    addToast({
      title: 'Éxito',
      description: 'Categoría eliminada exitosamente.',
      color: 'success',
      shouldShowTimeoutProgress: true,
    })
    deleteModal.onClose()
    onSuccess()
  }

  useEffect(() => {
    if (editModal.isOpen) {
      reset({
        nombre: category.nombre,
        descripcion: category.descripcion,
      })
    }
  }, [editModal.isOpen, category, reset])

  return (
    <>
      <TbEye className="text-blue-400 drop-shadow-xs cursor-pointer" onClick={viewModal.onOpen} />
      <TbEdit className="text-amber-400 drop-shadow-xs cursor-pointer" onClick={editModal.onOpen} />
      <TbTrash className="text-red-600 drop-shadow-xs cursor-pointer" onClick={deleteModal.onOpen} />
      {/* Edit Modal */}
      <ModalBase
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
        title="Editar categoría"
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
              type="submit"
              form="edit-category-form"
            >
              Guardar
            </Button>
          </>
        }
      >
        <form id="edit-category-form" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Nombre"
            type="text"
            placeholder="Ingrese el nombre de la categoría"
            {...register('nombre', { required: 'El nombre es obligatorio' })}
            error={errors.nombre?.message}
            className='rounded-md'
          />
          <InputField
            label="Descripción"
            type="text"
            placeholder="Ingrese la descripción"
            {...register('descripcion', { required: 'La descripción es obligatoria' })}
            error={errors.descripcion?.message}
            className='rounded-md'
          />
        </form>
      </ModalBase>
      {/* View Modal */}
      <ModalBase
        isOpen={viewModal.isOpen}
        onClose={viewModal.onClose}
        title="Ver categoría"
        footer={
          <Button color="danger" onPress={viewModal.onClose}>
            Cerrar
          </Button>
        }
      >
        <div className="flex flex-col gap-4">
          <p><strong>ID:</strong> {category.id}</p>
          <p><strong>Nombre:</strong> {category.nombre}</p>
          <p><strong>Descripción:</strong> {category.descripcion}</p>
          <p><strong>Estado:</strong> {category.estado === 1 ? 'Activo' : 'Inactivo'}</p>
          <p><strong>Fecha de creación:</strong> {category.createdAt
            ? new Date(category.createdAt).toLocaleDateString()
            : 'Sin fecha'}</p>
          <p><strong>Fecha de actualización:</strong> {category.updatedAt
            ? new Date(category.updatedAt).toLocaleDateString()
            : 'Sin fecha'}</p>
        </div>
      </ModalBase>

      {/* Delete Modal */}
      <ModalBase
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        title="Eliminar categoría"
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
        <p>¿Estás seguro de que deseas eliminar la categoría <strong>{category.nombre}</strong>?</p>
      </ModalBase>
    </>
  )
}

function ModalAdd({ onSuccess }: { onSuccess: () => void }){
  const addModal = useDisclosure()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

  interface FormData {
    nombre: string;
    descripcion: string;
  }

  const onSubmit = async (data: FormData) => {
    console.log('Datos del formulario:', data)
    if (!data.nombre || !data.descripcion) {
      addToast({
        title: 'Error',
        description: 'Por favor, completa todos los campos.',
        color: 'danger',
        shouldShowTimeoutProgress: true,
      })
      return
    }

    try {
      const newCategory = await createCategoria({
        nombre: data.nombre,
        descripcion: data.descripcion,
        estado: 'activo', // o 'inactivo' según corresponda
      })

      console.log('Categoría creada:', newCategory)
      addToast({
        title: 'Éxito',
        description: 'Categoría creada exitosamente.',
        color: 'success',
        shouldShowTimeoutProgress: true,
      })

      addModal.onClose()
      reset() // Limpiar el formulario después de crear la categoría
      onSuccess()
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error al crear categoría:', error.message)
        addToast({
          title: 'Error',
          description: error.message,
          color: 'danger',
          shouldShowTimeoutProgress: true,
        })
      } else {
        console.error('Error desconocido:', error)
        addToast({
          title: 'Error',
          description: 'Ocurrió un error desconocido al crear la categoría.',
          color: 'danger',
          shouldShowTimeoutProgress: true,
        })
      }
      return
    }
  }

  return(
    <>
      <Button
        color="success"
        className="w-fit ml-auto"
        onPress={addModal.onOpen}
      >
        Agregar nueva categoría
      </Button>

      <ModalBase
        isOpen={addModal.isOpen}
        onClose={addModal.onClose}
        title="Agregar categoría"
        footer={
          <>
            <Button color="danger" onPress={addModal.onClose}>
              Cerrar
            </Button>
            <Button color="success" type='submit' form="add-category-form">
              Guardar
            </Button>
          </>
        }
      >
        <form id="add-category-form" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Nombre"
            type="text"
            placeholder="Ingrese el nombre de la categoría"
            {...register('nombre', { required: 'El nombre es obligatorio' })}
            error={errors.nombre?.message}
            className='rounded-md'
          />
          <InputField
            label="Descripción"
            type="text"
            placeholder="Ingrese la descripción"
            {...register('descripcion', { required: 'La descripción es obligatoria' })}
            error={errors.descripcion?.message}
            className='rounded-md'
          />
        </form>
      </ModalBase>
    </>
  )
}
