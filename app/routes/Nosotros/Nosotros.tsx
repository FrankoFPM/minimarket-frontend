import TextoSeccion from '../../Components/TextoSeccion'
import ImageCarrusel from '../../Components/Carrusel'

const imagenes = [
  '/images/banner1minimark.jpg',
  '/images/banner2minimark.webp',
  '/images/banner3minimark.jpg',
]

const Nosotros = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section con Carrusel */}
      <div className="relative">
        <ImageCarrusel images={imagenes} />

        {/* Overlay con título */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-20 z-30">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              Minimarket La Caserita
            </h1>
            <p className="text-xl md:text-2xl opacity-90 font-light">
              Tu tienda de confianza en Carabayllo
            </p>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="relative -mt-16 z-40">
        <div className="max-w-5xl mx-auto px-4 py-16">
          {/* Introducción */}
          <div className="text-center mb-16">
            <div className="inline-block bg-green-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
              Conócenos
            </div>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
              Más que un minimarket, somos familia
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Desde 2019, hemos sido parte integral de la comunidad de Carabayllo,
              ofreciendo productos de calidad y un servicio excepcional a todas las familias.
            </p>
          </div>

          {/* Secciones de contenido */}
          <div className="space-y-6">
            <TextoSeccion
              titulo="¿Quiénes somos?"
              contenido='El minimarket "La Caserita" es un negocio ubicado en el distrito de Carabayllo, por el Km. 24 cerca de la urbanización de Torre Blanca, cuenta con 5 años de funcionamiento el cual surgió en una época de pandemia, donde las oportunidades laborales eran muy estrechas. La necesidad del entorno de contar con un lugar donde realizar sus compras cotidianas y productos de primera necesidad, surge la idea de crear este negocio, el cual desde un principio dio buenos resultados, ganando la confianza de sus clientes hasta hoy. Sin embargo, surge la necesidad de aprovechar las tecnologías de la información para mejorar el proceso del negocio abarcar más la preferencia de las personas.'
            />

            <div className="grid md:grid-cols-2 gap-6">
              <TextoSeccion
                titulo="Misión"
                contenido="Buscamos brindar a las familias producto de primera necesidad, alimentos frescos y artículos esenciales, siempre comprometidos con la calidad, el buen servicio y la mejora constante para satisfacer las necesidades del hogar."
              />
              <TextoSeccion
                titulo="Visión"
                contenido="Convertirnos en el minimarket de referencia de nuestra urbanización y zonas cercanas, reconocidos por la variedad de productos, la excelencia en el servicio y nuestro compromiso con el bienestar y la comodidad de las familias."
              />
            </div>

            <TextoSeccion
              titulo="Valores"
              contenido="Nuestro principal valor comienza con el cliente, cumplir con sus necesidades y brindar productos de calidad a sus familias."
            />
          </div>

          {/* Estadísticas */}
          <div className="mt-20 bg-gradient-to-r from-green-500 to-green-600 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold text-center mb-12">Nuestros Logros</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">5+</div>
                <div className="text-lg opacity-90">Años de experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">1000+</div>
                <div className="text-lg opacity-90">Clientes satisfechos</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">24/7</div>
                <div className="text-lg opacity-90">Atención disponible</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                ¿Listo para una experiencia de compra excepcional?
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Descubre nuestra amplia variedad de productos y experimenta
                el servicio que nos ha convertido en la primera opción de Carabayllo.
              </p>
              <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Explorar Productos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nosotros