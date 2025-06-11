import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'

import type { Route } from './+types/root'
import './app.css'
import { HeroUIProvider } from '@heroui/system'
import { ToastProvider } from '@heroui/react'

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  // Leer la cookie del tema en el servidor
  const theme =
    typeof document === 'undefined'
      ? 'light' // Valor predeterminado en el servidor
      : document.cookie
        .split('; ')
        .find((row) => row.startsWith('theme='))
        ?.split('=')[1] || 'light'
  return (
    <html lang="en" className={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Minimarket La Caserita</title>
        <Meta />
        <Links />
        {/* Script para ajustar el tema después de la carga */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = document.cookie
                  .split('; ')
                  .find((row) => row.startsWith('theme='))
                  ?.split('=')[1];
                if (savedTheme) {
                  document.documentElement.classList.add(savedTheme);
                  document.documentElement.classList.remove(savedTheme === 'dark' ? 'light' : 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className='bg-background'>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <HeroUIProvider>
      <ToastProvider placement='top-center' />
      <Outlet />
    </HeroUIProvider>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
