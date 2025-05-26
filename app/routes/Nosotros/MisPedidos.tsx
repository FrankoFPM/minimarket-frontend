
// 💡 Componente interno, definido antes de Pedidos
interface Props {
    nombre: string;
    marca: string;
    precio: number;
    precioAnterior?: number;
    imagen: string;
}

const CardProducto = ({ nombre, marca, precio, precioAnterior, imagen }: Props) => {
    return (
        <div className='min-h-[500px] flex flex-col justify-center items-stretch px-20'>
            <picture className="h-fit flex justify-center items-center">
                <img alt={nombre} className="w-auto h-full object-cover rounded-md bg-secondary" src={imagen} />
            </picture>

            <div className="p-4">
                <p className="text-foreground/50 font-bold">{marca}</p>
                <h3 className="text-primary-1 font-semibold text-lg">{nombre}</h3>

                <div className="flex flex-row justify-start items-center gap-3">
                    <p className="text-primary-1 font-bold text-xl">S/.{precio}</p>
                    {precioAnterior && (
                        <p className="text-gray-500 text-sm line-through">S/.{precioAnterior}</p>
                    )}
                </div>

                <div className="flex items-center mt-2">
                    {Array(5).fill(0).map((_, i) => (
                        <span key={i} className="text-yellow-500">★</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

// función principal
const Pedidos = () => {
    return (
        <>
            <section className="container my-6 h-fit mx-auto grid grid-cols-3 gap-10">
                {/* Uso de componente definido más arriba */}
                <CardProducto
                    nombre="Manzana"
                    marca="Marca 1"
                    precio={1}
                    precioAnterior={2}
                    imagen="/images/apple.webp"
                />

                <CardProducto
                    nombre="Frugos"
                    marca="Marca 2"
                    precio={7}
                    imagen="/images/frugos.webp"
                />

                <CardProducto
                    nombre="Galleta Oreo"
                    marca="Oreo"
                    precio={3}
                    imagen="/images/oreo.webp"
                />

            </section>

            {/* Apartado adicional */}
            <section className="container w-100 h-fit mx-auto flex justify-center">
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl shadow-sm">
                    <h4 className="text-blue-800 font-semibold text-lg mb-2">Productos Agregados</h4>
                    <ul className="list-disc list-inside text-sm text-blue-700">
                        <li>Manzana x2</li>
                        <li>Frugos x1</li>
                        <li>Galleta Oreo x1</li>
                    </ul>
                </div>
            </section>
        </>
    );
};

export default Pedidos;


