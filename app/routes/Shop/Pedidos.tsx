export default function Pedidos() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
      <p className="text-gray-600 mb-6">Aquí puedes ver el estado de tus pedidos.</p>
      {/* Aquí puedes agregar más contenido relacionado con los pedidos */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">No hay pedidos disponibles en este momento.</p>
      </div>
    </div>
  )
}