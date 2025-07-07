import { useState } from 'react'
import { CarruselJS } from './components/Carrusel'
import { ListCategorias, ListProducts } from './Products/ListProducts'
import { MobileFilters } from './components/MobileFilters'
import { Breadcrumbs } from './components/Breadcrumbs'

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId)
  }

  return (
    <div className="flex flex-col bg-background mx-auto my-4 lg:my-10 container gap-4 min-h-screen px-4 lg:px-0">
      <Breadcrumbs items={[{ label: 'Productos', active: true }]} />
      <CarruselJS />
      <div className='flex flex-col lg:flex-row gap-4 lg:gap-6'>
        <div className="lg:flex-shrink-0">
          <ListCategorias
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <div className="flex-1 text-primary-1 p-2 lg:p-4">
          <div className="mb-4 lg:mb-6">
            <h2 className='text-foreground text-xl lg:text-2xl font-bold'>
              {selectedCategory
                ? 'Productos filtrados'
                : 'Nuestros productos'
              }
            </h2>
            <p className='text-foreground/70 text-sm lg:text-base'>
              {selectedCategory
                ? 'Productos de la categoría seleccionada.'
                : 'Explora nuestra amplia gama de productos frescos y de calidad.'
              }
            </p>
          </div>
          <MobileFilters
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
          <ListProducts selectedCategory={selectedCategory} showStats={true} />
        </div>
      </div>
    </div>
  )
}