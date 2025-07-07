import React from 'react'

interface Props {
    titulo: string;
    contenido: string;
  }

const TextoSeccion: React.FC<Props> = ({ titulo, contenido }) => {
  return (
    <section className="group relative mb-8 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-600 overflow-hidden">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-1 h-16 bg-gradient-to-b from-green-400 to-green-600 rounded-full group-hover:h-20 transition-all duration-300"></div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-green-600 transition-colors duration-300">
            {titulo}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
            {contenido}
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </section>
  )
}

export default TextoSeccion