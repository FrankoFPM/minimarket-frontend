import { Home } from 'lucide-react'
import { Link } from 'react-router'

export default function unauthorizedLayout() {
    return (
        <>
            <div
                className="flex flex-col justify-end items-center h-[80vh] bg-contain bg-center bg-no-repeat bg-white"
                style={{ backgroundImage: "url('public/images/error404.jpg')" }}
            >
                <p className="text-[--foreground] text-2xl mb-4">
                    Opss, No Tienes Acceso a Esta Pagina
                </p>

            </div>

            <div className='flex flex-col justify-end items-center bg-white'>
                <Link to="/">
                    <button className="px-6 py-3 my-5 bg-blue-500 hover:bg-blue-700 text-white rounded-full flex items-center gap-2 transition-transform duration-300 hover:-translate-y-1">
                        <Home size={25} />
                        Volver al inicio
                    </button>
                </Link>
            </div>
        </>
    )
}