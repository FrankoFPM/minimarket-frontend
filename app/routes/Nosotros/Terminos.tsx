export default function Terminos() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-primary-1 mb-6">
        Términos y Condiciones de Uso
      </h1>
      <p className="text-foreground/75 mb-6">
        Bienvenido a <strong>Minimarket</strong>. Al acceder y utilizar nuestro sitio web, aceptas cumplir con los presentes términos y condiciones. Este documento regula la relación entre los usuarios y nuestra plataforma. Te pedimos que leas detenidamente cada apartado antes de utilizar nuestros servicios.
      </p>

      {/* 1. Uso del sitio */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">1. Uso del Sitio Web</h2>
        <p className="text-foreground/75">
          El acceso a nuestro sitio web está destinado únicamente a personas mayores de edad o que cuenten con autorización de sus padres o tutores legales. El usuario se compromete a utilizar este sitio web de forma lícita, respetando en todo momento las normas de convivencia, la moral y el orden público.
          <br /><br />
          Queda estrictamente prohibido:
          <ul className="list-disc list-inside mt-2">
            <li>Utilizar el sitio para realizar actividades fraudulentas.</li>
            <li>Modificar, reproducir, distribuir o explotar comercialmente el contenido sin previa autorización escrita.</li>
            <li>Intentar obtener acceso no autorizado a otras cuentas, sistemas o redes.</li>
          </ul>
        </p>
      </section>

      {/* 2. Propiedad intelectual */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">2. Derechos de Propiedad Intelectual</h2>
        <p className="text-foreground/75">
          Todos los contenidos incluidos en este sitio web (textos, imágenes, logos, marcas, íconos, gráficos, bases de datos, software y su diseño) son propiedad exclusiva de Minimarket o de sus respectivos titulares y están protegidos por la legislación nacional e internacional de propiedad intelectual.
          <br /><br />
          Queda prohibido su uso, reproducción o distribución sin el consentimiento previo y por escrito de Minimarket.
        </p>
      </section>

      {/* 3. Políticas de compra */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">3. Condiciones de Compra</h2>
        <p className="text-foreground/75">
          Todas las compras realizadas en el sitio están sujetas a disponibilidad de stock. Minimarket se reserva el derecho de anular o rechazar cualquier pedido si se detecta un error en el precio, información incorrecta del producto o problemas logísticos.
          <br /><br />
          Una vez confirmado el pago, recibirás un correo electrónico con los detalles de tu compra. En caso de no disponibilidad de uno o más productos, nos comunicaremos para ofrecer alternativas o proceder con el reembolso correspondiente.
        </p>
      </section>

      {/* 4. Política de Devoluciones */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">4. Devoluciones y Reembolsos</h2>
        <p className="text-foreground/75">
          Los usuarios pueden solicitar la devolución de un producto dentro de los <strong>7 días calendario</strong> posteriores a la entrega. Para ello, el producto debe encontrarse en condiciones originales, sin señales de uso y con su empaque original.
          <br /><br />
          El reembolso se realizará utilizando el mismo método de pago original, dentro de un plazo estimado de 7 a 10 días hábiles desde la aprobación de la solicitud. No se aceptan devoluciones de productos perecederos o personalizados, salvo en casos de defecto de fábrica.
        </p>
      </section>

      {/* 5. Limitación de Responsabilidad */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">5. Limitación de Responsabilidad</h2>
        <p className="text-foreground/75">
          Minimarket no será responsable por:
          <ul className="list-disc list-inside mt-2">
            <li>Interrupciones del servicio causadas por mantenimiento o causas de fuerza mayor.</li>
            <li>Pérdidas o daños indirectos derivados del uso del sitio.</li>
            <li>Errores tipográficos o visuales involuntarios en el contenido de productos.</li>
          </ul>
          <br />
          La utilización de los productos adquiridos corre bajo responsabilidad del cliente. Recomendamos siempre leer las indicaciones del fabricante.
        </p>
      </section>

      {/* 6. Privacidad de Datos */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">6. Política de Privacidad</h2>
        <p className="text-foreground/75">
          Minimarket se compromete a proteger la privacidad de sus usuarios. Toda la información personal recopilada será tratada conforme a nuestra Política de Privacidad, la cual cumple con la normativa vigente sobre protección de datos personales.
          <br /><br />
          No compartimos ni vendemos tus datos a terceros. La información es utilizada exclusivamente para procesar pedidos, mejorar el servicio y mantenerte informado sobre novedades si así lo autorizas.
        </p>
      </section>

      {/* 7. Modificaciones de los Términos */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">7. Cambios en los Términos y Condiciones</h2>
        <p className="text-foreground/75">
          Nos reservamos el derecho de modificar estos términos en cualquier momento y sin previo aviso. Las modificaciones serán efectivas a partir de su publicación en el sitio web. Recomendamos revisar periódicamente este documento para mantenerse informado.
        </p>
      </section>

      {/* 8. Contacto */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">8. Contacto</h2>
        <p className="text-foreground/75">
          Si tienes dudas o consultas relacionadas con estos Términos y Condiciones, puedes contactarnos a través del <a href="/contacto" className="text-primary underline">formulario de contacto</a> o escribirnos directamente al correo electrónico oficial de atención al cliente.
        </p>
      </section>

      <p className="text-sm text-gray-500 mt-6">
        Última actualización: 12 de mayo de 2025
      </p>
    </div>
  )
}
