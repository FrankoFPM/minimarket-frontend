import TextoSeccion from '../../Components/TextoSeccion'

const Nosotros = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-#2596be">
      <div className="max-w-4xl w-full px-4 py-8">
        <TextoSeccion
          titulo="¿Quiénes somos?"
          contenido="El minimarket “La Caserita” es un negocio ubicado en el distrito de Carabayllo, por el Km. 24 cerca de la urbanización de Torre Blanca, cuenta con 5 años de funcionamiento el cual surgió en una época de pandemia, donde las oportunidades laborales eran muy estrechas. La necesidad del entorno de contar con un lugar donde realizar sus compras cotidianas y productos de primera necesidad, surge la idea de crear este negocio, el cual desde un principio dio buenos resultados, ganando la confianza de sus clientes hasta hoy. Sin embargo, surge la necesidad de aprovechar las tecnologías de la información para mejorar el proceso del negocio abarcar más la preferencia de las personas."
        />
        <TextoSeccion
          titulo="Misión"
          contenido="Buscamos brindar a las familias producto de primera necesidad, alimentos frescos y artículos esenciales, siempre comprometidos con la calidad, el buen servicio y la mejora constante para satisfacer las necesidades del hogar."
        />
        <TextoSeccion
          titulo="Visión"
          contenido="Convertirnos en el minimarket de referencia de nuestra urbanización y zonas cercanas, reconocidos por la variedad de productos, la excelencia en el servicio y nuestro compromiso con el bienestar y la comodidad de las familias."
        />
        <TextoSeccion
          titulo="Valores"
          contenido="Nuestro principal valor comienza con el cliente, cumplir con sus necesidades y brindar productos de calidad a sus familias."
        />
      </div>
    </div>
  )
}

export default Nosotros