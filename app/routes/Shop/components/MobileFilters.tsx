import { useState, type JSX } from 'react'
import { FaAppleAlt, FaCheese, FaSoap, FaTooth, FaFilter, FaTimes } from 'react-icons/fa'
import { MdLocalDrink, MdLocalGroceryStore } from 'react-icons/md'
import { GiBreadSlice, GiCarrot, GiMeat } from 'react-icons/gi'
import { AiOutlineEllipsis } from 'react-icons/ai'
import { useCategorias } from '~/hooks/useCatalogos'

interface MobileFiltersProps {
  selectedCategory: number | null
  onCategoryChange: (categoryId: number | null) => void
}

export function MobileFilters({ selectedCategory, onCategoryChange }: MobileFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
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

  const handleCategoryClick = (categoryId: number | null) => {
    onCategoryChange(categoryId)
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile filter button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-1 text-secondary rounded-lg font-semibold"
        >
          <FaFilter size={16} />
          Filtrar por categoría
        </button>
      </div>

      {/* Mobile filter modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="fixed inset-x-0 bottom-0 bg-background rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">Filtrar por categoría</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* All products option */}
            <button
              onClick={() => handleCategoryClick(null)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 text-left transition-colors ${
                selectedCategory === null
                  ? 'bg-primary-1 text-secondary'
                  : 'bg-secondary hover:bg-primary-1/10'
              }`}
            >
              <MdLocalGroceryStore size={20} />
              <span className="font-semibold">Todos los productos</span>
            </button>

            {/* Category options */}
            {loadingCategorias ? (
              <div className="text-center py-4">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-1 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-gray-500">Cargando categorías...</span>
                </div>
              </div>
            ) : (
              categorias.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 text-left transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-primary-1 text-secondary'
                      : 'bg-secondary hover:bg-primary-1/10'
                  }`}
                >
                  {iconMap[cat.id] || <AiOutlineEllipsis size={20} />}
                  <span className="font-semibold">{cat.nombre}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </>
  )
}
