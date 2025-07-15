import { useEffect, useState, type JSX } from 'react'
import { CardProduct } from '../components/Cards'
import { ProductListSkeleton, CategorySkeleton } from '../components/Skeletons'
import { ProductStats } from '../components/ProductStats'
import type { Producto } from '~/Types/Producto'
import { getProductos } from '~/services/productosService'
import { useCategorias } from '~/hooks/useCatalogos'
import { AiOutlineEllipsis } from 'react-icons/ai'
import { FaAppleAlt, FaCheese, FaSoap, FaTooth } from 'react-icons/fa'
import { MdLocalDrink, MdLocalGroceryStore } from 'react-icons/md'
import { GiBreadSlice, GiCarrot, GiMeat } from 'react-icons/gi'

interface ListProductsProps {
  selectedCategory?: number | null
  showStats?: boolean
}

export function ListProducts({ selectedCategory, showStats = false }: ListProductsProps) {
  const [products, setProducts] = useState<Producto[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = () => {
    setLoading(true)
    getProductos()
      .then((data) => {
        setProducts(data)
        setFilteredProducts(data)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Filtrar productos cuando cambia la categoría seleccionada
  useEffect(() => {
    if (selectedCategory === null || selectedCategory === undefined) {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter(product => product.idCategoria === selectedCategory)
      setFilteredProducts(filtered)
    }
  }, [selectedCategory, products])

  if (loading) {
    return <ProductListSkeleton />
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="col-span-full text-center py-10">
        <div className="flex flex-col items-center justify-center gap-4 text-foreground/50">
          <MdLocalGroceryStore size={48} />
          <p>No hay productos disponibles en esta categoría</p>
          {selectedCategory && (
            <p className="text-sm">Intenta seleccionar otra categoría</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      {showStats && (
        <ProductStats
          totalProducts={products.length}
          filteredCount={filteredProducts.length}
        />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {filteredProducts.map((producto) => (
          <CardProduct
            key={producto.idProducto}
            name={producto.nombre}
            price={producto.precio}
            image={'/images/products/' + producto.foto}
            stars={5}
            marca={producto.proveedorNombre || 'Sin marca'}
            // TODO: Activar descuentos cuando el backend esté listo
            // discount={producto.descuento || 0}
            src={`/producto/${producto.idProducto}`}
          />
        ))}
      </div>
    </>
  )
}

interface ListCategoriasProps {
  selectedCategory: number | null
  onCategoryChange: (categoryId: number | null) => void
}

export function ListCategorias({ selectedCategory, onCategoryChange }: ListCategoriasProps) {
  const { categorias, loadingCategorias } = useCategorias()

  // Mapeo de nombre de categoría a ícono
  const iconNameMap: Record<string, JSX.Element> = {
    'Abarrotes': <FaAppleAlt size={20} />,
    'Frutas y Verduras': <GiCarrot size={20} />,
    'Lácteos': <FaCheese size={20} />,
    'Carnes': <GiMeat size={20} />,
    'Panadería': <GiBreadSlice size={20} />,
    'Snacks y Galletas': <MdLocalGroceryStore size={20} />,
    'Bebidas': <MdLocalDrink size={20} />,
    'Limpieza': <FaSoap size={20} />,
    'Cuidado Personal': <FaTooth size={20} />,
    // Puedes agregar más mapeos aquí si tienes más categorías
  }

  const handleCategoryClick = (categoryId: number | null) => {
    onCategoryChange(categoryId)
  }

  return (
    <div className="hidden lg:flex flex-col p-4 lg:p-6 w-full lg:w-[28rem] h-fit bg-secondary rounded-lg lg:rounded-xl overflow-hidden sticky top-4 lg:top-32 border border-gray-200/20 shadow-sm">
      <h2 className="text-primary-1 font-bold text-lg lg:text-xl mb-4 lg:mb-6">Categorías</h2>

      {/* Opción para mostrar todos los productos */}
      <button
        onClick={() => handleCategoryClick(null)}
        className={`group transition-all duration-300 flex items-center gap-3 p-3 lg:p-4 rounded-xl mb-2 ${
          selectedCategory === null
            ? 'bg-primary-1 text-secondary shadow-lg transform scale-[1.02]'
            : 'hover:bg-primary-1/10 hover:text-primary-1 hover:shadow-md'
        }`}
      >
        <span className={`transition-colors ${
          selectedCategory === null ? 'text-secondary' : 'text-primary-1'
        }`}>
          <MdLocalGroceryStore size={20} />
        </span>
        <label className={`transition-colors text-sm lg:text-base font-semibold cursor-pointer select-none ${
          selectedCategory === null ? 'text-secondary' : 'text-foreground group-hover:text-primary-1'
        }`}>
          Todos los productos
        </label>
      </button>

      <ul className="flex flex-col gap-1">
        {loadingCategorias ? (
          <CategorySkeleton />
        ) : (
          categorias.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => handleCategoryClick(cat.id)}
                className={`group transition-all duration-300 flex items-center gap-3 p-3 lg:p-4 rounded-xl w-full text-left ${
                  selectedCategory === cat.id
                    ? 'bg-primary-1 text-secondary shadow-lg transform scale-[1.02]'
                    : 'hover:bg-primary-1/10 hover:text-primary-1 hover:shadow-md'
                }`}
              >
                <span className={`transition-colors ${
                  selectedCategory === cat.id ? 'text-secondary' : 'text-primary-1'
                }`}>
                  {iconNameMap[cat.nombre] || <AiOutlineEllipsis size={20} />}
                </span>
                <label className={`transition-colors text-sm lg:text-base font-semibold cursor-pointer select-none ${
                  selectedCategory === cat.id ? 'text-secondary' : 'text-foreground group-hover:text-primary-1'
                }`}>
                  {cat.nombre}
                </label>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}