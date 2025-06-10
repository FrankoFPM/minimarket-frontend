import { addToast, Button, Input, useDisclosure } from '@heroui/react'
import { Controller, useForm } from 'react-hook-form'
import { InputField, SelectInput } from '~/Components/FormComponent'
import { useCategorias, useProveedores } from '~/hooks/useCatalogos'
import { createProducto } from '~/services/productosService'
import { ModalBase } from '../Components/ModalBase'

export function ModalAdd({ onSuccess }: { onSuccess: () => void }) {
  const addModal = useDisclosure()
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<FormData>()
  const { categorias, loadingCategorias } = useCategorias()
  const { proveedores, loadingProveedores } = useProveedores()
  interface FormData {
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    idCategoria: number;
    idProveedor: number;
    foto?: FileList;
  }

  const onSubmit = async (data: FormData) => {
    try {
      await createProducto({
        ...data,
        estado: 'activo',
        foto: data.foto ? data.foto[0].name : '', // Asegúrate de manejar la foto correctamente
        idCategoria: data.idCategoria || undefined, // Asegúrate de que estos campos sean opcionales si no los usas
        idProveedor: data.idProveedor || undefined,
      })
      addToast({
        title: 'Éxito',
        description: 'Producto creado exitosamente.',
        color: 'success',
        shouldShowTimeoutProgress: true,
      })
      addModal.onClose()
      reset()
      onSuccess()
    } catch (error) {
      addToast({
        title: 'Error',
        description: 'No se pudo crear el producto.',
        color: 'danger',
        shouldShowTimeoutProgress: true,
      })
      console.error('Error al crear el producto:', error)
      addModal.onClose()
    }
  }

  return (
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
            <Button color="danger" onPress={() => { addModal.onClose(); reset() }}>
              Cerrar
            </Button>
            <Button color="success" type="submit" form="add-product-form">
              Guardar producto
            </Button>
          </>
        }
      >
        <form id="add-product-form" onSubmit={handleSubmit(onSubmit)}>
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
            render={({ field: { onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
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
            )}
            rules={{ required: 'La imagen es obligatoria' }}
          />
        </form>
      </ModalBase>
    </>
  )
}