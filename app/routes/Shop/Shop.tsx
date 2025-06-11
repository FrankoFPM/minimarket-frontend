import { CarruselJS } from './components/Carrusel'
import { ListCategorias, ListProducts } from './Products/ListProducts'

export default function Shop() {
  return (
    <div className="flex flex-col bg-background mx-auto my-10 container gap-4 min-h-screen">
      <CarruselJS />
      <div className='flex flex-row gap-4'>
        <ListCategorias />
        <div className="w-full h-full text-primary-1 p-4">
          <h2 className='text-foreground text-2xl font-bold'>Nuestros productos</h2>
          <p className='text-foreground'>Explora nuestra amplia gama de productos frescos y de calidad.</p>
          <ListProducts />
        </div>
      </div>
    </div>
  )
}