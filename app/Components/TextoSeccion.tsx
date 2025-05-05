import React from 'react'

interface Props {
    titulo: string;
    contenido: string;
  }

const TextoSeccion: React.FC<Props> = ({ titulo, contenido }) => {
  return (
    <section className="mb-8 p-4 border-l-4 border-green-600 bg-green-50 rounded-md shadow-xl">
      <h1 className="text-2xl font-bold text-green-700 mb-2">{titulo}</h1>
      <p className="text-base text-gray-700 leading-relaxed">{contenido}</p>
    </section>
  )
}

export default TextoSeccion