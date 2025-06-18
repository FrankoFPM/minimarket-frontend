import { Divider } from '@heroui/react'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { auth } from '~/firebase/firebaseConfig'

interface Props {
    nombre: string;
    descripcion: string;
    precio: number;
    precioAnterior?: number;
    imagen: string;
    fecha: string;
    numeroPedido: number;
    codigoProducto: string;
}

const CardProducto = ({
  nombre,
  descripcion,
  precio,
  precioAnterior,
  imagen,
  fecha,
  numeroPedido,
  codigoProducto,
}: Props) => {
  const navigate = useNavigate()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login')
      }
    })
    return () => unsubscribe()
  }, [navigate])
  return (
    <div className="border border-primary-1 rounded-lg p-6 bg-secondary shadow-md">
      <div className="flex justify-between items-center text-sm text-(--foreground)">
        <span className="font-bold text-2xl text-primary-1">Finalizado</span>
        <div className="text-right">
          <p className="font-medium">{fecha}</p>
          <p className="text-xs">
                        Nº de pedido:{' '}
            <span className="underline cursor-pointer">{numeroPedido}</span>
          </p>
          <button className="text-blue-600 text-xs hover:underline mt-1">
                        Detalles del pedido
          </button>
        </div>
      </div>

      <Divider className="my-4 bg-primary-1" />

      <div className="text-sm text-(--foreground) mb-3">
        <span className="font-semibold flex items-center gap-2">
                    🛒 Minimarket la Caserita
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={imagen}
          alt="Producto"
          className="w-28 h-32 object-cover border border-primary-1 rounded-md shadow"
        />

        <div className="flex-1 text-(--foreground)">
          <p className="font-extrabold text-lg mb-1 text-center sm:text-left">
            {nombre}
          </p>
          <p className="mb-1 text-center sm:text-left">{descripcion}</p>
          <p className="text-xs text-gray-500 font-bold mb-2 text-center sm:text-left">
            {codigoProducto}
          </p>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <p className="text-base font-semibold text-primary-1">
                            PEN {precio}
              <span className="text-sm font-normal ml-1">x1</span>
            </p>
            {precioAnterior && (
              <span className="line-through text-gray-400 text-sm">
                                PEN {precioAnterior}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button className="bg-primary-1 text-white px-4 py-1 text-sm rounded-full hover:bg-primary-2 transition">
                        Añadir a la cesta
          </button>
          <button className="border border-primary-1 text-(--foreground) px-4 py-1 text-sm rounded-full hover:bg-[#e74c3c] hover:text-white transition">
                        Borrar
          </button>
        </div>
      </div>
    </div>
  )
}
const Pedidos = () => {
  return (
    <section className="container mx-auto my-8 px-4 flex flex-col gap-7">
      <CardProducto
        nombre="Manzana"
        descripcion="Fruta fresca, jugosa y natural, ideal para una alimentación saludable en cualquier momento del día."
        precio={8.5}
        precioAnterior={12}
        imagen="/images/products/apple.webp"
        fecha="Pedido efectuado el 30 abr. 2025"
        numeroPedido={8200054}
        codigoProducto="P-01"
      />

      <CardProducto
        nombre="Frugos del Valle"
        descripcion="Bebida refrescante elaborada con jugo de fruta, perfecta para acompañar tus comidas o disfrutar como snack"
        precio={7}
        imagen="/images/products/frugos.webp"
        fecha="Pedido efectuado el 30 abr. 2025"
        numeroPedido={8200054}
        codigoProducto="P-02"
      />

      <CardProducto
        nombre="Galleta Oreo"
        descripcion="Oreo Clásica, galleta con relleno cremoso, perfecta para compartir"
        precio={2.5}
        imagen="/images/products/frugos.webp"
        fecha="Pedido efectuado el 30 abr. 2025"
        numeroPedido={8200054}
        codigoProducto="P-03"
      />
    </section>
  )
}

export default Pedidos