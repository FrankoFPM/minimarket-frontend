import { useEffect, useState, type JSX } from 'react'
import { CardProduct } from '../components/Cards'
import type { Producto } from '~/Types/Producto'
import { getProductos } from '~/services/productosService'
import { useCategorias } from '~/hooks/useCatalogos'
import { AiOutlineEllipsis } from 'react-icons/ai'
import { FaAppleAlt, FaCheese, FaSoap, FaTooth } from 'react-icons/fa'
import { MdLocalDrink, MdLocalGroceryStore } from 'react-icons/md'
import { GiBreadSlice, GiCarrot, GiMeat } from 'react-icons/gi'

export function ListProducts() {
  const [products, setProducts] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = () => {
    setLoading(true)
    getProductos()
      .then((data) => setProducts(data))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="col-span-full text-center py-10 text-primary-1">
        Cargando productos...
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {products.map((producto) => (
        <CardProduct
          key={producto.idProducto}
          name={producto.nombre}
          price={producto.precio}
          image={'/images/' + producto.foto}
          stars={5}
          marca={producto.proveedorNombre || 'Sin marca'}
          discount={0}
          src={`/producto/${producto.idProducto}`}
        />
      ))}
    </div>
  )
}

export function ListCategorias() {
  const { categorias, loadingCategorias } = useCategorias()

  // Mapeo de id de categoría a ícono
  const iconMap: Record<number, JSX.Element> = {
    1: <FaAppleAlt size={20} />,
    2: <GiCarrot size={20} />,
    3: <FaCheese size={20} />,
    4: <GiMeat size={20} />,
    5: <GiBreadSlice size={20} />,
    6: <MdLocalGroceryStore size={20} />,
    7: <MdLocalDrink size={20} />,
    8: <FaSoap size={20} />,
    9: <FaTooth size={20} />,
    10: <AiOutlineEllipsis size={20} />,
  }

  return (
    <div className="hidden md:flex flex-col p-4 w-[25rem] h-fit bg-secondary rounded-lg overflow-hidden sticky top-32">
      <h2 className="text-primary-1 font-semibold text-xl">Categorias</h2>
      <ul className="flex flex-col gap-2 mt-4">
        {loadingCategorias ? (
          <li className="text-center text-sm text-gray-500">Cargando categorías...</li>
        ) : (
          categorias.map((cat) => (
            <li
              key={cat.id}
              className="group transition-colors flex items-center gap-2 p-2 rounded-md hover:bg-primary-1 hover:text-secondary cursor-pointer"
            >
              <span className="transition-colors text-primary-1 group-hover:text-secondary">
                {iconMap[cat.id] || <AiOutlineEllipsis size={20} />}
              </span>
              <label
                htmlFor={`cat-${cat.id}`}
                className="transition-colors text-sm font-semibold text-foreground group-hover:text-secondary cursor-pointer select-none"
              >
                {cat.nombre}
              </label>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}