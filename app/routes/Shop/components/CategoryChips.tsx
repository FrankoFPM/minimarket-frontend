import { type JSX } from 'react'
import { FaAppleAlt, FaCheese, FaSoap, FaTooth } from 'react-icons/fa'
import { MdLocalDrink, MdLocalGroceryStore } from 'react-icons/md'
import { GiBreadSlice, GiCarrot, GiMeat } from 'react-icons/gi'
import { AiOutlineEllipsis } from 'react-icons/ai'
import { useCategorias } from '~/hooks/useCatalogos'

interface CategoryChipsProps {
  selectedCategory: number | null
  onCategoryChange: (categoryId: number | null) => void
}

export function CategoryChips({ selectedCategory, onCategoryChange }: CategoryChipsProps) {
  const { categorias, loadingCategorias } = useCategorias()

  // Mapeo de id de categoría a ícono
  const iconMap: Record<number, JSX.Element> = {
    1: <FaAppleAlt size={16} />,
    2: <GiCarrot size={16} />,
    3: <FaCheese size={16} />,
    4: <GiMeat size={16} />,
    5: <GiBreadSlice size={16} />,
    6: <MdLocalGroceryStore size={16} />,
    7: <MdLocalDrink size={16} />,
    8: <FaSoap size={16} />,
    9: <FaTooth size={16} />,
    10: <AiOutlineEllipsis size={16} />,
  }

  if (loadingCategorias) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex-shrink-0 h-10 w-24 bg-gray-200 rounded-full animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onCategoryChange(null)}
        className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
          selectedCategory === null
            ? 'bg-primary-1 text-secondary shadow-lg'
            : 'bg-secondary text-foreground hover:bg-primary-1/10 border border-gray-200'
        }`}
      >
        <MdLocalGroceryStore size={16} />
        Todos
      </button>
      {categorias.slice(0, 5).map((categoria) => (
        <button
          key={categoria.id}
          onClick={() => onCategoryChange(categoria.id)}
          className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
            selectedCategory === categoria.id
              ? 'bg-primary-1 text-secondary shadow-lg'
              : 'bg-secondary text-foreground hover:bg-primary-1/10 border border-gray-200'
          }`}
        >
          {iconMap[categoria.id] || <AiOutlineEllipsis size={16} />}
          <span className="whitespace-nowrap">{categoria.nombre}</span>
        </button>
      ))}
    </div>
  )
}
