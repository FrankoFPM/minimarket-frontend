import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

// Exporta la configuración de rutas para la aplicación
export default [
  // Define la ruta principal (index) que apunta al archivo 'home.tsx'
  //index('routes/home.tsx'),

  // Define la ruta para la página de inicio de sesión (login)
  route('login', 'routes/Login/login.tsx'), // Esta es la página de inicio de sesión

  // Define la ruta para la página de registro (register)
  route('register', 'routes/Login/register.tsx'), // Esta es la página de registro

  // Define la ruta para la página de nosotros (nosotros)
  route('nosotros', 'routes/Nosotros/nosotros.tsx'), // Esta es la página de registro

  // Ejemplo comentado de cómo usar un layout para agrupar rutas relacionadas
  // layout('routes/Login/layout.tsx', [
  //   index('routes/Login/index.tsx'), // Ruta principal dentro del layout
  //   route('login', 'routes/Login/login.tsx'), // Ruta de inicio de sesión dentro del layout
  //   route('register', 'routes/Login/register.tsx'), // Ruta de registro dentro del layout
  // ])
  layout('routes/Shop/Layout.tsx', [
    index('routes/Shop/index.tsx'), // Ruta principal dentro del layout de la tienda
    route('producto/:id', 'routes/Shop/Products/product.tsx'), // Ruta de producto dentro del layout de la tienda
    route('carrito', 'routes/Shop/Carrito.tsx'), // Ruta de producto dentro del layout de la tienda
    route('terminos', 'routes/Nosotros/Terminos.tsx'), // Ruta de producto dentro del layout de la tienda
    route('politicas', 'routes/Nosotros/PoliticaPrivacidad.tsx'), // Ruta de producto dentro del layout de la tienda
    route('contacto', 'routes/Nosotros/Contacto.tsx')
  ]),

  layout('routes/Admin/Layout.tsx', [
    route('dashboard','routes/Admin/index.tsx'), // Ruta principal dentro del layout de administración
  ]),

  route('test', 'test/appTest.tsx'), // Ruta de prueba

  // Ejemplo de uso de prefix para agrupar rutas relacionadas con usuarios
  //...prefix('users', [
  //  index('routes/Users/index.tsx'), // Ruta principal: '/users'
  //  route('create', 'routes/Users/create.tsx'), // Ruta: '/users/create'
  //  route('edit', 'routes/Users/edit.tsx'), // Ruta: '/users/edit'
  //  route('profile', 'routes/Users/profile.tsx'), // Ruta: '/users/profile'
  //]),
] satisfies RouteConfig