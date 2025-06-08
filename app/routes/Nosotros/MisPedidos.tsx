
// 💡 Componente interno, definido antes de Pedidos
interface Props {
    nombre: string;
    descripcion: string;
    precio: number;
    precioAnterior?: number;
    imagen: string;
    // NOTE: +3 props para completar datos de Pedidos
    fecha:string;
    numeroPedido:number;
    codigoProducto: string;
}

const CardProducto = ({ nombre, descripcion, precio, precioAnterior, imagen,fecha,numeroPedido,codigoProducto }: Props) => {
    return (
        <>
            {/* Caja Actual*/}
            <div className="border rounded-md p-4 bg-secondary">
                <div className="flex justify-between text-sm text-(--foreground) ">
                    <span className="font-bold w-50 sm:w-auto">Finalizado</span>
                    <div className="text-right">
                        <p>{fecha}</p>
                        <p className="text-xs">
                            Nº de pedido: <span className="underline cursor-pointer">{numeroPedido}</span>
                        </p>
                        <button className="text-blue-600 text-xs hover:underline mt-1">Detalles del pedido</button>
                    </div>
                </div>

                <hr className="my-3" />

                <div className="text-sm text-(--foreground) mb-2">
                    <span className="font-semibold">🛒 &gt;  Minimarket la Caserita</span> 
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <img
                        src={imagen}
                        alt="Producto"
                        className="w-25 h-30 object-cover border"
                    />

                    <div className="flex-1 text-(--foreground)">
                        <p className="flex justify-center sm:justify-start font-extrabold">
                            {nombre} 
                        </p>
                        <p>{descripcion}</p>
                        <p className="text-xs text-gray-500 mt-1 font-bold">{codigoProducto}</p>
                        <div className="flex justify-center sm:justify-start">
                            <p className="mt-1 text-base font-semibold">
                            PEN {precio} 
                            <span className="text-sm font-normal">x1</span>
                        </p>
                        </div>
                        
                    </div>

                    <div className="flex flex-col gap-2">
                        <button className="bg-primary-1 text-white px-4 py-1 text-sm rounded-full hover:bg-primary-2 ">
                            Añadir a la cesta
                        </button>
                        <button className="border text-(--foreground) px-4 py-1 text-sm rounded-full  hover:bg-[#e74c3c] hover:text-white">
                            Borrar
                        </button>
                    </div>
                </div>
            </div>
            
        </>
    );
};

// función principal
const Pedidos = () => {
    return (
        <>
            <section className="container h-fit my-5 px-20 grid gap-5 ">
                {/* Uso de componente definido más arriba */}
                <CardProducto
                    nombre="Manzana"
                    descripcion="Fruta fresca, jugosa y natural, ideal para una alimentación saludable en cualquier momento del día."
                    precio={8.5}
                    precioAnterior={2}
                    imagen="/images/apple.webp"
                    fecha="Pedido efectuado el 30 abr. 2025"
                    numeroPedido = {8200054}
                    codigoProducto="P-01"
                />

                <CardProducto
                    nombre="Frugos del Valle"
                    descripcion="Bebida refrescante elaborada con jugo de fruta, perfecta para acompañar tus comidas o disfrutar como snack"
                    precio={7}
                    imagen="/images/frugos.webp"
                    fecha="Pedido efectuado el 30 abr. 2025"
                    numeroPedido = {8200054}
                    codigoProducto="P-02"
                />

                <CardProducto
                    nombre="Galleta Oreo"
                    descripcion="Oreo Clásica,galleta con relleno cremoso, perfecta para compartir"
                    precio={2.5}
                    imagen="/images/oreo.webp"
                    fecha="Pedido efectuado el 30 abr. 2025"
                    numeroPedido = {8200054}
                    codigoProducto="P-03"
                />

            </section>
        </>
    );
};

export default Pedidos;
