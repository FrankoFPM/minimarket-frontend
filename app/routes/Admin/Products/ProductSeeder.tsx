import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Progress,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  Textarea,
  addToast
} from '@heroui/react'
import { useProveedores } from '~/hooks/useCatalogos'
import { useCategorias } from '~/hooks/useCatalogos'
import { createProducto } from '~/services/productosService'
import { createCategoria } from '~/services/categoriaService'
import type { Producto } from '~/services/productosService'

interface ProductTemplate {
  name: string
  description: string
  price: number
  stock: number
  category: string
  image: string
  brand?: string
}

interface CategoryTemplate {
  name: string
  description: string
  icon: string
  products: ProductTemplate[]
}

interface ProductSeederProps {
  onBack?: () => void
}

const ProductSeeder: React.FC<ProductSeederProps> = ({ onBack }) => {
  const [isSeeding, setIsSeeding] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentCategory, setCurrentCategory] = useState('')
  const [seedResults, setSeedResults] = useState<{ success: number, errors: string[] }>({ success: 0, errors: [] })
  const [selectedProvider, setSelectedProvider] = useState<string>('')
  const [customProduct, setCustomProduct] = useState<Partial<ProductTemplate>>({})
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { proveedores } = useProveedores()
  const { categorias } = useCategorias()

  // Datos de prueba organizados por categorías
  const seedData: CategoryTemplate[] = [
    {
      name: 'Abarrotes',
      description: 'Productos básicos de despensa y alimentación',
      icon: '1',
      products: [
        { name: 'Arroz Costeño 1kg', description: 'Arroz premium de grano largo', price: 4.50, stock: 50, category: 'abarrotes', image: 'abarrotes_arroz-costeño.webp' },
        { name: 'Aceite Primor 1L', description: 'Aceite vegetal puro', price: 8.90, stock: 30, category: 'abarrotes', image: 'abarrotes_aceite.webp' },
        { name: 'Fideos Don Vittorio 500g', description: 'Pasta italiana premium', price: 2.50, stock: 45, category: 'abarrotes', image: 'abarrotes_fideos-donvittorio.webp' },
        { name: 'Sopa Ajinomen', description: 'Sopa instantánea Ajinomen', price: 1.80, stock: 60, category: 'abarrotes', image: 'abarrotes_sopa-ajinomen.webp' }
      ]
    },
    {
      name: 'Bebidas',
      description: 'Bebidas refrescantes y nutritivas',
      icon: '7',
      products: [
        { name: 'Coca Cola 500ml', description: 'Bebida gaseosa clásica', price: 2.50, stock: 80, category: 'bebidas', image: 'bebidas_gaseosa-cocacola.webp', brand: 'Coca Cola' },
        { name: 'Agua San Luis 625ml', description: 'Agua mineral sin gas', price: 1.20, stock: 100, category: 'bebidas', image: 'bebidas_agua.webp', brand: 'San Luis' },
        { name: 'Jugo Frugos Naranja 1L', description: 'Jugo natural de naranja', price: 4.80, stock: 35, category: 'bebidas', image: 'bebidas_frugos.webp', brand: 'Frugos' },
        { name: 'Gaseosa Inka Kola 500ml', description: 'Gaseosa peruana tradicional', price: 2.80, stock: 50, category: 'bebidas', image: 'bebidas_gaseosa-inkakola.webp', brand: 'Inka Kola' },
        { name: 'Gaseosa Pepsi 500ml', description: 'Bebida gaseosa Pepsi', price: 2.50, stock: 40, category: 'bebidas', image: 'bebidas_gaseosa-pepsi.webp', brand: 'Pepsi' }
      ]
    },
    {
      name: 'Carnes',
      description: 'Carnes frescas y productos cárnicos',
      icon: '4',
      products: [
        { name: 'Pollo Entero', description: 'Pollo fresco de granja', price: 12.00, stock: 15, category: 'carnes', image: 'carnes_pollo.webp' },
        { name: 'Hamburguesa', description: 'Hamburguesa de carne', price: 5.00, stock: 20, category: 'carnes', image: 'carnes_hamburguesa.webp' },
        { name: 'Hot Dog', description: 'Hot dog clásico', price: 3.50, stock: 25, category: 'carnes', image: 'carnes_hotdog.webp' }
      ]
    },
    {
      name: 'Lácteos',
      description: 'Productos lácteos y derivados',
      icon: '3',
      products: [
        { name: 'Leche Gloria 1L', description: 'Leche entera pasteurizada', price: 3.80, stock: 45, category: 'lacteos', image: 'lacteos_leche-gloria.webp', brand: 'Gloria' },
        { name: 'Queso Fresco 500g', description: 'Queso fresco artesanal', price: 8.00, stock: 25, category: 'lacteos', image: 'lacteos_queso.webp' },
        { name: 'Mantequilla Gloria 200g', description: 'Mantequilla sin sal', price: 5.20, stock: 35, category: 'lacteos', image: 'lacteos_mantequilla.webp', brand: 'Gloria' }
      ]
    },
    {
      name: 'Panadería',
      description: 'Productos de panadería y repostería',
      icon: '5',
      products: [
        { name: 'Tostadas Bimbo', description: 'Tostadas para desayuno', price: 3.50, stock: 25, category: 'panaderia', image: 'panaderia_tostadas.webp', brand: 'Bimbo' },
        { name: 'Bimbo Pan', description: 'Pan Bimbo clásico', price: 4.00, stock: 30, category: 'panaderia', image: 'panaderia_bimbo.webp', brand: 'Bimbo' },
        { name: 'Bimbolete', description: 'Bizcocho Bimbolete', price: 2.80, stock: 20, category: 'panaderia', image: 'panaderia_bimbolete.webp', brand: 'Bimbo' }
      ]
    },
    {
      name: 'Limpieza',
      description: 'Productos de limpieza e higiene del hogar',
      icon: '8',
      products: [
        { name: 'Detergente Ariel 1kg', description: 'Detergente en polvo concentrado', price: 12.50, stock: 30, category: 'limpieza', image: 'limpieza_detergente.webp', brand: 'Ariel' },
        { name: 'Jabón Bolivar 3 pack', description: 'Jabón antibacterial', price: 4.80, stock: 40, category: 'limpieza', image: 'limpieza_jabon-bolivar.webp', brand: 'Bolivar' },
        { name: 'Poet Limpiador', description: 'Limpiador líquido Poet', price: 8.20, stock: 25, category: 'limpieza', image: 'limpieza_poet.webp', brand: 'Poet' }
      ]
    },
    {
      name: 'Frutas y Verduras',
      description: 'Frutas y verduras frescas',
      icon: '2',
      products: [
        { name: 'Manzana', description: 'Manzana roja fresca', price: 1.20, stock: 60, category: 'frutas', image: 'apple.webp' },
        { name: 'Naranja', description: 'Naranja jugosa', price: 1.00, stock: 50, category: 'frutas', image: 'frutas_naranja.webp' },
        { name: 'Lechuga', description: 'Lechuga fresca', price: 2.00, stock: 30, category: 'verduras', image: 'verduras_lechuga.webp' },
        { name: 'Papa', description: 'Papa amarilla', price: 1.50, stock: 80, category: 'verduras', image: 'verduras_papa.webp' },
        { name: 'Tomate', description: 'Tomate fresco', price: 1.30, stock: 70, category: 'verduras', image: 'verduras_tomate.webp' },
        { name: 'Zanahoria', description: 'Zanahoria fresca', price: 1.10, stock: 65, category: 'verduras', image: 'verduras_zanahoria.webp' }
      ]
    },
    {
      name: 'Snacks y Galletas',
      description: 'Snacks y galletas para todos los gustos',
      icon: '6',
      products: [
        { name: 'Galleta Animalitos', description: 'Galletas de animalitos', price: 2.00, stock: 40, category: 'snacks', image: 'snacks_galleta-animalitos.webp' },
        { name: 'Galleta Casino', description: 'Galleta Casino clásica', price: 2.20, stock: 35, category: 'snacks', image: 'snacks_galleta-casino.webp' },
        { name: 'Galleta Field Soda', description: 'Galleta Field Soda', price: 2.50, stock: 30, category: 'snacks', image: 'snacks_galleta-field-soda.jpg' },
        { name: 'Galleta Morocha', description: 'Galleta Morocha', price: 2.30, stock: 25, category: 'snacks', image: 'snacks_galleta-morocha.webp' },
        { name: 'Galleta Oreo', description: 'Galleta Oreo', price: 2.80, stock: 20, category: 'snacks', image: 'snacks_galleta-oreo.webp' }
      ]
    },
    {
      name: 'Cuidado Personal',
      description: 'Productos para el cuidado personal',
      icon: '9',
      products: [
        { name: 'Cepillo Dental', description: 'Cepillo dental suave', price: 3.00, stock: 40, category: 'personal', image: 'personal_cepillo.webp' },
        { name: 'Colgate Pasta', description: 'Pasta dental Colgate', price: 5.00, stock: 35, category: 'personal', image: 'personal_colgate.webp' },
        { name: 'Jabón de Tocador', description: 'Jabón de tocador', price: 2.50, stock: 50, category: 'personal', image: 'personal_jabon.webp' },
        { name: 'Shampoo Hombre', description: 'Shampoo para hombre', price: 7.00, stock: 20, category: 'personal', image: 'personal_shampoo-hombre.webp' },
        { name: 'Shampoo Mujer', description: 'Shampoo para mujer', price: 7.00, stock: 20, category: 'personal', image: 'personal_shampoo-mujer.webp' }
      ]
    }
  ]

  // Calcular total de productos
  const totalProducts = seedData.reduce((sum, category) => sum + category.products.length, 0)

  // Función para crear categorías faltantes o mapear a existentes
  const createMissingCategories = async () => {
    const createdCategories = []

    for (const categoryData of seedData) {
      // Verificar si la categoría ya existe
      const existingCategory = categorias.find(cat =>
        cat.nombre.toLowerCase() === categoryData.name.toLowerCase()
      )

      if (!existingCategory) {
        try {
          // Crear categoría con los campos mínimos requeridos
          const newCategory = await createCategoria({
            nombre: categoryData.name,
            descripcion: categoryData.description,
            estado: 'ACTIVO'
          })
          createdCategories.push(newCategory)

          addToast({
            title: 'Categoría creada',
            description: `Categoría "${categoryData.name}" creada exitosamente`,
            color: 'success'
          })
        } catch (error) {
          console.error(`Error creating category ${categoryData.name}:`, error)
          // Mostrar error más detallado
          const errorMessage = error instanceof Error ? error.message : String(error)
          console.error(`Error al crear categoría ${categoryData.name}:`, errorMessage)
          addToast({
            title: 'Error al crear categoría',
            description: `${categoryData.name}: No se pudo crear, se intentará usar categoría existente`,
            color: 'warning'
          })
        }
      }
    }

    // Si se crearon categorías, esperar un poco para que se actualice la lista
    if (createdCategories.length > 0) {
      await new Promise(resolve => setTimeout(resolve, 3000))
    }

    return createdCategories
  }

  // Función para mapear categorías de productos a categorías existentes
  const mapToExistingCategory = (categoryName: string) => {
    // Mapeo directo por nombre
    let categoria = categorias.find(cat =>
      cat.nombre.toLowerCase() === categoryName.toLowerCase()
    )

    if (!categoria) {
      // Mapeo por palabras clave para categorías existentes
      const mappings: Record<string, string[]> = {
        'abarrotes': ['panes', 'q'], // Podría ir a PAnes o Q
        'bebidas': ['bebidas', 'colas'], // Ya existe Bebidas
        'carnes': ['panes'], // Podría ir a PAnes como productos alimenticios
        'lácteos': ['panes'], // Podría ir a PAnes como productos alimenticios
        'panadería': ['panes'], // Mapeo directo a PAnes
        'limpieza': ['q'] // Podría ir a Q como categoría general
      }

      const categoryKey = categoryName.toLowerCase()
      const possibleCategories = mappings[categoryKey] || []

      for (const possibleName of possibleCategories) {
        categoria = categorias.find(cat =>
          cat.nombre.toLowerCase().includes(possibleName)
        )
        if (categoria) break
      }
    }

    // Si aún no encuentra, usar la primera categoría disponible
    if (!categoria) {
      categoria = categorias.find(cat => cat.id > 0) // Usar cualquier categoría válida
    }

    return categoria
  }

  const handleSeedDatabase = async () => {
    if (!selectedProvider) {
      addToast({
        title: 'Error',
        description: 'Por favor selecciona un proveedor antes de continuar.',
        color: 'danger'
      })
      return
    }

    setIsSeeding(true)
    setProgress(0)
    setSeedResults({ success: 0, errors: [] })

    let processedCount = 0
    let successCount = 0
    const errors: string[] = []

    try {
      // Paso 0: Insertar todas las categorías del seed si no existen
      setCurrentCategory('Insertando categorías...')
      for (const categoryData of seedData) {
        const exists = categorias.some(cat => cat.nombre.toLowerCase() === categoryData.name.toLowerCase())
        if (!exists) {
          try {
            await createCategoria({
              nombre: categoryData.name,
              descripcion: categoryData.description,
              estado: 'activo'
            })
            addToast({
              title: 'Categoría creada',
              description: `Categoría "${categoryData.name}" creada exitosamente`,
              color: 'success'
            })
          } catch (error) {
            console.error(`Error creando categoría ${categoryData.name}:`, error)
            errors.push(`Error al crear categoría ${categoryData.name}: ${error}`)
          }
        }
      }

      // Paso 1: Crear categorías faltantes (flujo original, puede quedar para mapeos adicionales)
      setCurrentCategory('Verificando categorías...')
      await createMissingCategories()

      // Recargar categorías para obtener las nuevas
      // Nota: Idealmente aquí deberías recargar las categorías, pero como no tenemos una función para eso,
      // vamos a esperar un poco para que se actualicen
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Paso 2: Crear productos
      for (const categoryData of seedData) {
        setCurrentCategory(categoryData.name)

        // Primero intentar buscar la categoría correspondiente por nombre exacto
        let categoria = categorias.find(cat =>
          cat.nombre.toLowerCase() === categoryData.name.toLowerCase()
        )

        // Si no se encuentra, usar la función de mapeo
        if (!categoria) {
          categoria = mapToExistingCategory(categoryData.name)
        }

        if (!categoria) {
          errors.push(`No se pudo mapear la categoría: ${categoryData.name}`)
          continue
        }

        // Mostrar información sobre el mapeo usado
        if (categoria.nombre.toLowerCase() !== categoryData.name.toLowerCase()) {
          addToast({
            title: 'Categoría mapeada',
            description: `Productos de "${categoryData.name}" se crearán en "${categoria.nombre}"`,
            color: 'primary'
          })
        }

        // Procesar productos de la categoría
        for (const productTemplate of categoryData.products) {
          try {
            const newProduct: Omit<Producto, 'idProducto' | 'createdAt' | 'updatedAt' | 'categoriaNombre' | 'proveedorNombre'> = {
              nombre: productTemplate.name,
              descripcion: productTemplate.description,
              precio: productTemplate.price,
              stock: productTemplate.stock,
              foto: `${productTemplate.image}`,
              estado: 'ACTIVO',
              idCategoria: categoria.id,
              idProveedor: parseInt(selectedProvider)
            }

            await createProducto(newProduct)
            successCount++

            addToast({
              title: 'Producto creado',
              description: `${productTemplate.name} agregado exitosamente`,
              color: 'success'
            })
          } catch (error) {
            console.error(`Error creating product ${productTemplate.name}:`, error)
            errors.push(`Error al crear ${productTemplate.name}: ${error}`)
          }

          processedCount++
          setProgress((processedCount / totalProducts) * 100)

          // Pequeña pausa para evitar sobrecarga
          await new Promise(resolve => setTimeout(resolve, 100))
        }
      }

      setSeedResults({ success: successCount, errors })

      addToast({
        title: '¡Proceso completado!',
        description: `Se crearon ${successCount} productos exitosamente.`,
        color: 'success'
      })

    } catch (error) {
      console.error('Error in seeding process:', error)
      addToast({
        title: 'Error en el proceso',
        description: 'Hubo un problema durante la creación de productos.',
        color: 'danger'
      })
    } finally {
      setIsSeeding(false)
      setCurrentCategory('')
    }
  }

  const handleCreateCustomProduct = async () => {
    if (!customProduct.name || !customProduct.price || !selectedProvider) {
      addToast({
        title: 'Error',
        description: 'Complete todos los campos requeridos.',
        color: 'danger'
      })
      return
    }

    try {
      const categoria = categorias.find(cat => cat.id === parseInt(customProduct.category || ''))
      if (!categoria) {
        addToast({
          title: 'Error',
          description: 'Seleccione una categoría válida.',
          color: 'danger'
        })
        return
      }

      const newProduct: Omit<Producto, 'idProducto' | 'createdAt' | 'updatedAt' | 'categoriaNombre' | 'proveedorNombre'> = {
        nombre: customProduct.name,
        descripcion: customProduct.description || '',
        precio: customProduct.price,
        stock: customProduct.stock || 0,
        foto: customProduct.image || 'default.png',
        estado: 'ACTIVO',
        idCategoria: categoria.id,
        idProveedor: parseInt(selectedProvider)
      }

      await createProducto(newProduct)

      addToast({
        title: 'Producto creado',
        description: `${customProduct.name} se creó exitosamente`,
        color: 'success'
      })

      setCustomProduct({})
      onClose()
    } catch (error) {
      console.error('Error creating custom product:', error)
      addToast({
        title: 'Error',
        description: 'No se pudo crear el producto.',
        color: 'danger'
      })
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Sistema de Inserción de Productos</h1>
          <p className="text-gray-600">Crea productos de prueba con datos organizados por categorías</p>
        </div>
        {onBack && (
          <Button
            color="default"
            variant="bordered"
            onPress={onBack}
          >
            ← Volver
          </Button>
        )}
      </div>

      {/* Configuración inicial */}
      <Card className="mb-6">
        <CardHeader>
          <h3 className="text-xl font-semibold">Configuración</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">ℹ️ Información importante</h4>
              <div className="text-sm text-blue-700 space-y-2">
                <p>
                  Este proceso intentará crear las categorías faltantes automáticamente.
                  Si no es posible crearlas, los productos se mapearán a categorías existentes.
                </p>
                <p>
                  <strong>Mapeo de categorías:</strong> Los productos se asignarán a las categorías más apropiadas de tu sistema actual.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">📋 Categorías actuales en el sistema</h4>
              <div className="flex flex-wrap gap-2">
                {categorias.map((cat, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border">
                    <span className="text-xs font-medium">{cat.nombre}</span>
                    <span className="text-xs text-gray-500">ID: {cat.id}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Proveedor"
                placeholder="Selecciona un proveedor"
                selectedKeys={selectedProvider ? [selectedProvider] : []}
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0]
                  setSelectedProvider(selectedKey ? String(selectedKey) : '')
                }}
              >
                {proveedores.map((proveedor) => (
                  <SelectItem key={proveedor.id}>
                    {proveedor.nombre}
                  </SelectItem>
                ))}
              </Select>

              <div className="flex gap-2">
                <Button
                  color="primary"
                  onPress={handleSeedDatabase}
                  isDisabled={!selectedProvider || isSeeding}
                  isLoading={isSeeding}
                  className="flex-1"
                >
                  {isSeeding ? 'Insertando...' : 'Insertar Datos de Prueba'}
                </Button>
                <Button
                  color="secondary"
                  variant="bordered"
                  onPress={onOpen}
                  isDisabled={!selectedProvider}
                >
                  Producto Personalizado
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Progreso */}
      {isSeeding && (
        <Card className="mb-6">
          <CardBody>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Progreso general</span>
                <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} color="primary" className="w-full" />
              {currentCategory && (
                <p className="text-sm text-gray-600">
                  Procesando categoría: <span className="font-medium">{currentCategory}</span>
                </p>
              )}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Resultados */}
      {seedResults.success > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-xl font-semibold">Resultados</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Chip color="success" variant="flat">
                  {seedResults.success} productos creados
                </Chip>
                {seedResults.errors.length > 0 && (
                  <Chip color="danger" variant="flat">
                    {seedResults.errors.length} errores
                  </Chip>
                )}
              </div>

              {seedResults.errors.length > 0 && (
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-red-800 mb-2">Errores encontrados:</p>
                  <ul className="text-sm text-red-700 space-y-1">
                    {seedResults.errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Preview de categorías */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Vista Previa - Datos de Prueba</h3>
        </CardHeader>
        <CardBody>
          <div className="mb-4 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">📂 Mapeo de categorías</h4>
            <p className="text-sm text-gray-600 mb-3">
              Se intentará crear las siguientes categorías, o se mapearán a categorías existentes:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {seedData.map((category, index) => {
                const existingCategory = categorias.find(cat =>
                  cat.nombre.toLowerCase() === category.name.toLowerCase()
                )
                const mappedCategory = existingCategory || mapToExistingCategory(category.name)

                return (
                  <div key={index} className="flex items-center justify-between bg-white p-3 rounded border">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-xs">{category.icon}</span>
                      </div>
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">→</span>
                      <span className="text-xs font-medium text-green-600">
                        {mappedCategory ? mappedCategory.nombre : 'Sin mapear'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="space-y-4">
            {seedData.map((category, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">{category.icon}</span>
                  </div>
                  <h4 className="text-lg font-semibold">{category.name}</h4>
                  <Chip size="sm" variant="flat">
                    {category.products.length} productos
                  </Chip>
                </div>

                <p className="text-sm text-gray-600 mb-3">{category.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {category.products.map((product: ProductTemplate, productIndex: number) => (
                    <div key={productIndex} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-sm">{product.name}</h5>
                        <span className="text-primary font-bold text-sm">S/. {product.price}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Stock: {product.stock}</span>
                        {product.brand && (
                          <Chip size="sm" variant="dot" color="secondary">
                            {product.brand}
                          </Chip>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Modal para producto personalizado */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>
            <h3 className="text-xl font-semibold">Crear Producto Personalizado</h3>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nombre del producto"
                  placeholder="Ej: Arroz Premium 1kg"
                  value={customProduct.name || ''}
                  onChange={(e) => setCustomProduct({...customProduct, name: e.target.value})}
                />
                <Input
                  label="Precio"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={customProduct.price?.toString() || ''}
                  onChange={(e) => setCustomProduct({...customProduct, price: parseFloat(e.target.value)})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Stock"
                  type="number"
                  placeholder="0"
                  value={customProduct.stock?.toString() || ''}
                  onChange={(e) => setCustomProduct({...customProduct, stock: parseInt(e.target.value)})}
                />
                <Select
                  label="Categoría"
                  placeholder="Selecciona categoría"
                  selectedKeys={customProduct.category ? [customProduct.category] : []}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0]
                    setCustomProduct({...customProduct, category: selectedKey ? String(selectedKey) : ''})
                  }}
                >
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria.id}>
                      {categoria.nombre}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <Textarea
                label="Descripción"
                placeholder="Descripción del producto..."
                value={customProduct.description || ''}
                onChange={(e) => setCustomProduct({...customProduct, description: e.target.value})}
              />

              <Input
                label="URL de imagen"
                placeholder="producto.png"
                value={customProduct.image || ''}
                onChange={(e) => setCustomProduct({...customProduct, image: e.target.value})}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancelar
            </Button>
            <Button color="primary" onPress={handleCreateCustomProduct}>
              Crear Producto
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ProductSeeder
