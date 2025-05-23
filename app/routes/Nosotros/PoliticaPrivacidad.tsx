export default function PoliticaPrivacidad() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-primary-1 mb-6">Política de Privacidad</h1>
      <p className="text-foreground/75 mb-6">
        En <strong>Minimarket</strong>, valoramos y respetamos tu privacidad. Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos tu información personal cuando visitas nuestro sitio web o haces uso de nuestros servicios.
      </p>

      {/* 1. Información recopilada */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">1. Información que recopilamos</h2>
        <p className="text-foreground/75">
          Podemos recopilar diferentes tipos de información, entre ellos:
          <ul className="list-disc list-inside mt-2">
            <li><strong>Datos personales:</strong> nombre, dirección de correo electrónico, número de teléfono, dirección de envío, entre otros, que proporcionas al crear una cuenta o realizar una compra.</li>
            <li><strong>Datos de navegación:</strong> dirección IP, tipo de navegador, páginas visitadas y tiempo de navegación en el sitio.</li>
            <li><strong>Cookies y tecnologías similares:</strong> para mejorar tu experiencia de usuario y ofrecer contenido personalizado.</li>
          </ul>
        </p>
      </section>

      {/* 2. Finalidad del uso */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">2. ¿Para qué utilizamos tu información?</h2>
        <p className="text-foreground/75">
          Utilizamos la información recopilada para:
          <ul className="list-disc list-inside mt-2">
            <li>Procesar y entregar tus pedidos correctamente.</li>
            <li>Gestionar tu cuenta y ofrecer soporte al cliente.</li>
            <li>Enviar notificaciones relacionadas con tus compras o cambios en nuestros servicios.</li>
            <li>Mejorar el funcionamiento de nuestro sitio y personalizar tu experiencia de navegación.</li>
            <li>Cumplir con obligaciones legales o regulatorias vigentes.</li>
          </ul>
        </p>
      </section>

      {/* 3. Compartir información */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">3. Compartición de información con terceros</h2>
        <p className="text-foreground/75">
          Minimarket no vende ni alquila tus datos personales a terceros. Solo compartimos tu información con:
          <ul className="list-disc list-inside mt-2">
            <li>Proveedores de servicios necesarios para procesar pagos, entregas o atención al cliente.</li>
            <li>Autoridades legales, en caso de requerimiento judicial o cumplimiento normativo.</li>
          </ul>
        </p>
      </section>

      {/* 4. Seguridad de la información */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">4. Seguridad de tu información</h2>
        <p className="text-foreground/75">
          Implementamos medidas técnicas y organizativas adecuadas para proteger tu información contra accesos no autorizados, pérdidas o alteraciones. No obstante, ningún sistema es 100% seguro, por lo que también recomendamos a los usuarios mantener la confidencialidad de sus credenciales.
        </p>
      </section>

      {/* 5. Tus derechos */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">5. Tus derechos como usuario</h2>
        <p className="text-foreground/75">
          De acuerdo con las leyes de protección de datos, tienes derecho a:
          <ul className="list-disc list-inside mt-2">
            <li>Acceder a tus datos personales almacenados.</li>
            <li>Solicitar la rectificación o eliminación de tus datos.</li>
            <li>Oponerte al tratamiento de tus datos con fines publicitarios.</li>
            <li>Revocar tu consentimiento en cualquier momento.</li>
          </ul>
          Para ejercer cualquiera de estos derechos, puedes escribirnos al correo de contacto oficial o usar el formulario del sitio.
        </p>
      </section>

      {/* 6. Uso de cookies */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">6. Uso de Cookies</h2>
        <p className="text-foreground/75">
          Nuestro sitio utiliza cookies para recopilar información estadística, recordar tus preferencias y mejorar tu experiencia. Puedes configurar tu navegador para rechazar el uso de cookies, aunque esto podría afectar el funcionamiento del sitio.
        </p>
      </section>

      {/* 7. Cambios en la política */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">7. Modificaciones a esta política</h2>
        <p className="text-foreground/75">
          Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Cualquier cambio será notificado en esta misma página y tendrá vigencia desde su fecha de publicación. Te recomendamos revisarla periódicamente.
        </p>
      </section>

      {/* 8. Contacto */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">8. Contacto</h2>
        <p className="text-foreground/75">
          Para cualquier duda, comentario o solicitud relacionada con esta Política de Privacidad, puedes escribirnos a través del <a href="/contacto" className="text-primary underline">formulario de contacto</a> o enviarnos un correo electrónico a nuestra dirección oficial.
        </p>
      </section>

      <p className="text-sm text-gray-500 mt-6">
        Última actualización: 12 de mayo de 2025
      </p>
    </div>
  )
}
