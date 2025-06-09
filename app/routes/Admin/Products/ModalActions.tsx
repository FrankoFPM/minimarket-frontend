import { addToast, Alert, Button, Input, InputOtp, useDisclosure } from '@heroui/react'
import { useEffect, useState } from 'react'
import { TbEdit, TbEye, TbTrash } from 'react-icons/tb'
import { useCategorias, useProveedores } from '~/hooks/useCatalogos'
import { deleteProducto, getProductoById, updateProducto } from '~/services/productosService'
import type { Producto } from '~/Types/Producto'
import { ModalBase } from '../Components/ModalBase'
import { InputField, SelectInput } from '~/Components/FormComponent'
import { Controller, useForm } from 'react-hook-form'

interface ModalActionsProps {
  producto: Producto;
  onSuccess: () => void;
}

export function ModalActions({ producto, onSuccess }: ModalActionsProps) {
  const editModal = useDisclosure()
  const viewModal = useDisclosure()
  const deleteModal = useDisclosure()
  const [product, setProduct] = useState<Producto | null>(null)
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<FormData>()

  interface FormData {
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    idCategoria?: number;
    idProveedor?: number;
    foto?: FileList;
  }

  useEffect(() => {
    if ((editModal.isOpen || viewModal.isOpen) && producto.idProducto) {
      getProductoById(producto.idProducto).then((data) => {
        setProduct(data)
      }).catch((error) => {
        console.error('Error al obtener el producto:', error)
        addToast({
          title: 'Error',
          description: 'No se pudo obtener el producto.',
          color: 'danger',
          shouldShowTimeoutProgress: true,
        })
      })
    }
  }, [editModal.isOpen, viewModal.isOpen, producto.idProducto])

  useEffect(() => {
    if (editModal.isOpen && product) {
      reset({
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: product.precio,
        stock: product.stock,
        idCategoria: product.idCategoria,
        idProveedor: product.idProveedor,
      })
    }
  }, [editModal.isOpen, product, reset])

  const onSubmit = async (data: FormData) => {
    if (!product) return
    console.log('Datos del formulario:', data)
    console.log('ID del producto a actualizar:', product.idCategoria)
    const fotoParaEnviar = data.foto && data.foto.length > 0
      ? data.foto[0].name // o el archivo, según tu backend
      : product?.foto // usa el anterior si no hay nuevo
    try {
      await updateProducto(product.idProducto, {
        ...data,
        estado: product.estado,
        foto: fotoParaEnviar,
      })
      addToast({
        title: 'Éxito',
        description: 'Producto actualizado exitosamente.',
        color: 'success',
        shouldShowTimeoutProgress: true,
      })
      editModal.onClose()
      onSuccess()
    } catch (error) {
      addToast({
        title: 'Error',
        description: 'No se pudo actualizar el producto.',
        color: 'danger',
        shouldShowTimeoutProgress: true,
      })
      console.error('Error al actualizar el producto:', error)
      editModal.onClose()
    }
  }

  const handleDelete = async () => {
    try {
      await deleteProducto(producto.idProducto)
      addToast({
        title: 'Éxito',
        description: 'Producto eliminado exitosamente.',
        color: 'success',
        shouldShowTimeoutProgress: true,
      })
      deleteModal.onClose()
      onSuccess()
    } catch (error) {
      addToast({
        title: 'Error',
        description: 'No se pudo eliminar el producto.',
        color: 'danger',
        shouldShowTimeoutProgress: true,
      })
      console.error('Error al eliminar el producto:', error)
      deleteModal.onClose()
    }
  }

  const { categorias, loadingCategorias } = useCategorias()
  const { proveedores, loadingProveedores } = useProveedores()

  // Genera un código OTP aleatorio de 4 dígitos al abrir el modal
  const [otpCode, setOtpCode] = useState('')
  const [otpInput, setOtpInput] = useState('')
  const [canDelete, setCanDelete] = useState(false)
  useEffect(() => {
    if (deleteModal.isOpen) {
      const random = Math.floor(1000 + Math.random() * 9000).toString()
      setOtpCode(random)
      setOtpInput('') // Limpiar input al abrir modal
      setCanDelete(false)
    }
  }, [deleteModal.isOpen])

  useEffect(() => {
    setCanDelete(otpInput === otpCode)
  }, [otpInput, otpCode])

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
            <Button color="danger" onPress={() => { editModal.onClose(); reset() }}>
              Cerrar
            </Button>
            <Button color="success" type="submit" form="edit-product-form">
              Guardar
            </Button>
          </>
        }
      >
        <form id="edit-product-form" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Nombre"
            type="text"
            placeholder="Ingrese el nombre del producto"
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
          <InputField
            label="Precio"
            type="number"
            placeholder="Ingrese el precio"
            {...register('precio', { required: 'El precio es obligatorio', valueAsNumber: true })}
            error={errors.precio?.message}
            className='rounded-md'
            step={0.2}
          />
          <InputField
            label="Stock"
            type="number"
            placeholder="Ingrese el stock"
            {...register('stock', { required: 'El stock es obligatorio', valueAsNumber: true })}
            error={errors.stock?.message}
            className='rounded-md'
          />
          {/* Puedes agregar select para categoría y proveedor si tienes los datos */}
          <SelectInput
            label="Categoría"
            error={errors.idCategoria?.message}
            {...register('idCategoria', {
              required: 'La categoría es obligatoria',
              validate: value => value !== undefined && value !== null && value !== 0 || 'Debe seleccionar una categoría',
              valueAsNumber: true
            })}
            className='rounded-md'
          >
            <option value="">Seleccione una categoría</option>
            {loadingCategorias ? (
              <option disabled>Cargando categorías...</option>
            ) : (
              categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))
            )}
          </SelectInput>
          <SelectInput
            label="Proveedor"
            error={errors.idProveedor?.message}
            {...register('idProveedor', {
              required: 'El proveedor es obligatorio',
              validate: value => value !== undefined && value !== null && value !== 0 || 'Debe seleccionar un proveedor',
              valueAsNumber: true
            })}
            className='rounded-md'
          >
            <option value="">Seleccione un proveedor</option>
            {loadingProveedores ? (
              <option disabled>Cargando proveedores...</option>
            ) : (
              proveedores.map((prov) => (
                <option key={prov.id} value={prov.id}>{prov.nombre}</option>
              ))
            )}
          </SelectInput>
          <Controller
            control={control}
            name="foto"
            render={({ field: { onChange, onBlur, ref, value }, fieldState: { invalid, error } }) => (
              <>
                <Input
                  ref={ref}
                  type="file"
                  accept="image/*"
                  isInvalid={invalid}
                  errorMessage={error?.message}
                  label="Foto del producto"
                  description="Suba una imagen del producto (máximo 2MB)"
                  className="mt-4"
                  variant="bordered"
                  color="success"
                  onBlur={onBlur}
                  // HeroUI Input para archivos: onChange recibe el evento, así que debes extraer el archivo
                  onChange={e => onChange(e.target.files)}
                />
                {(!value || value.length === 0) && product?.foto && (
                  <Alert color='warning' title={'Ya se encuentra un archivo'}
                    description={`Archivo actual: ${product.foto}`}
                  />
                )}
                {value && value.length > 0 && (
                  <Alert color='success' title={'Archivo seleccionado'}
                    description={`Archivo: ${value[0].name}`}
                  />
                )}
                {/**mostrar mensaje si no hay ningun archivo */}
                {(!value || value.length === 0) && !product?.foto && (
                  <Alert color='danger' title={'No se ha seleccionado ningún archivo'} />
                )}

              </>

            )}
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
        {product ? (
          <div className="flex flex-col gap-4">
            <p><strong>Código:</strong> {product.idProducto}</p>
            <p><strong>Nombre:</strong> {product.nombre}</p>
            <p><strong>Categoría:</strong> {product.categoriaNombre}</p>
            <p><strong>Descripción:</strong> {product.descripcion}</p>
            <p><strong>Precio:</strong> S/.{product.precio}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            <p><strong>Proveedor:</strong> {product.proveedorNombre}</p>
            <p><strong>Estado:</strong> {product.estado}</p>
            <p><strong>Foto:</strong> {product.foto}</p>
            <p><strong>Fecha de creación:</strong>
              {producto.createdAt
                ? new Date(producto.createdAt).toLocaleDateString()
                : 'Sin fecha'}
            </p>
            <p><strong>Fecha de actualización:</strong>
              {producto.updatedAt
                ? new Date(producto.updatedAt).toLocaleDateString()
                : 'Sin fecha'}
            </p>
          </div>
        ) : (
          <div>Cargando...</div>
        )}
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
            <Button color="success" onPress={handleDelete} isDisabled={!canDelete}>
              Eliminar
            </Button>
          </>
        }
      >
        <p className='text-center'>¿Estás seguro de que deseas eliminar el producto con nombre <strong>{producto.nombre}</strong>?</p>
        <InputOtp
          length={4}
          value={otpInput}
          onValueChange={setOtpInput}
          isInvalid={otpInput.length === 4 && otpInput !== otpCode}
          errorMessage={
            otpInput.length === 4 && otpInput !== otpCode
              ? (
                <span>
          Código incorrecto.<br />
          El código es: <span className="font-mono text-lg text-primary-500 tracking-widest">{otpCode}</span>
                </span>
              )
              : undefined
          }
          description={
            <span>
              Para confirmar, escribe el siguiente código:<br />
              <span className="font-mono text-lg text-primary-500 tracking-widest">{otpCode}</span>
            </span>
          }
          color="success"
          variant="bordered"
          className="mx-auto"
          classNames={{
            base: 'flex flex-col items-center justify-center w-full',
            wrapper: 'flex justify-center gap-2',
            segmentWrapper: 'flex justify-center gap-2',
            segment: [
              'relative',
              'h-12',
              'w-12',
              'border-y',
              'border-r',
              'first:rounded-l-md',
              'first:border-l',
              'last:rounded-r-md',
              'border-default-200',
              'data-[active=true]:border',
              'data-[active=true]:z-20',
              'data-[active=true]:ring-2',
              'data-[active=true]:ring-offset-2',
              'data-[active=true]:ring-offset-background',
              'data-[active=true]:ring-primary-1',
              'text-xl',
              'text-center'
            ],
            description: 'text-center text-base text-gray-700 font-medium mt-2',
            errorMessage: 'text-center',
          }}
        />
      </ModalBase>
    </>
  )
}