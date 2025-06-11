import { Button, Card, CardFooter, CardHeader, Divider, Image } from '@heroui/react'

export default function ModuloSuppliers() {

  const downloadExcel = async (endpoint: string, filename: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080/api'}/excel/${endpoint}`, {
      method: 'GET',
    })
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    link.parentNode?.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  const downloadPDF = async (endpoint: string, filename: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080/api'}/pdf/${endpoint}`, {
      method: 'GET',
    })
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    link.parentNode?.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  const reports = [
    {
      title: 'Productos',
      endpoint: 'productos',
      filename: 'productos.xlsx',
      img: 'https://ix-marketing.imgix.net/bg-remove_before.png?auto=format,compress&w=1946',
      description: 'Descarga el reporte de todos los productos.',
    },
    {
      title: 'Proveedores',
      endpoint: 'proveedores',
      filename: 'proveedores.xlsx',
      img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Descarga el reporte de proveedores.',
    },
    {
      title: 'Clientes',
      endpoint: 'usuarios/clientes',
      filename: 'usuarios_clientes.xlsx',
      img: 'https://images.unsplash.com/photo-1628102491629-778571d893a3?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Descarga el reporte de usuarios clientes.',
    },
    {
      title: 'Personal',
      endpoint: 'usuarios/personal',
      filename: 'usuarios_personal.xlsx',
      img: 'https://plus.unsplash.com/premium_photo-1722945652527-d8d7ba9fd0d5?q=80&w=1870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Descarga el reporte de usuarios personal.',
    },
  ]

  const pdfReports = [
    {
      title: 'Productos',
      endpoint: 'productos',
      filename: 'productos.pdf',
      img: 'https://ix-marketing.imgix.net/bg-remove_before.png?auto=format,compress&w=1946',
      description: 'Descarga el reporte de todos los productos.',
    },
    {
      title: 'Proveedores',
      endpoint: 'proveedores',
      filename: 'proveedores.pdf',
      img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Descarga el reporte de proveedores.',
    },
    {
      title: 'Clientes',
      endpoint: 'usuarios/clientes',
      filename: 'usuarios_clientes.pdf',
      img: 'https://images.unsplash.com/photo-1628102491629-778571d893a3?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Descarga el reporte de usuarios clientes.',
    },
    {
      title: 'Personal',
      endpoint: 'usuarios/personal',
      filename: 'usuarios_personal.pdf',
      img: 'https://plus.unsplash.com/premium_photo-1722945652527-d8d7ba9fd0d5?q=80&w=1870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Descarga el reporte de usuarios personal.',
    },
  ]

  return (
    <div className="flex flex-col bg-background mx-auto my-10 container gap-4">
      <h1 className="text-3xl font-bold text-center">Panel de administración</h1>
      <p className="text-center">Desde este panel puedes gestionar los reportes.</p>
      
      {/* Sección de reportes Excel */}
      <div className='bg-secondary p-4 rounded-2xl mt-5'>
        <h3 className='text-xl font-semibold'>Reportes en Excel disponibles</h3>
        <Divider className='my-2 bg-primary-1' />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {reports.map((report) => (
            <Card key={report.title} isFooterBlurred className="w-full h-[340px]">
              <CardHeader className="absolute z-10 top-1 flex-col items-start w-full">
                <div className="bg-black/60 px-3 py-2 rounded-md">
                  <h4 className="text-white font-medium text-2xl">{report.title}</h4>
                </div>
              </CardHeader>
              <Image
                removeWrapper
                alt={`Imagen de ${report.title}`}
                className="z-0 w-full h-full object-cover"
                src={report.img}
              />
              <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 flex-col items-center w-full">
                <p className="text-black text-tiny mb-2">{report.description}</p>
                <Button
                  className="w-full py-4 text-lg font-bold"
                  color="success"
                  radius="md"
                  size="lg"
                  onPress={() => downloadExcel(report.endpoint, report.filename)}
                >
                  Descargar Excel
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Sección de reportes PDF */}
      <div className='bg-secondary p-4 rounded-2xl mt-5'>
        <h3 className='text-xl font-semibold'>Reportes en PDF disponibles</h3>
        <Divider className='my-2 bg-primary-1' />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {pdfReports.map((report) => (
            <Card key={`pdf-${report.title}`} isFooterBlurred className="w-full h-[340px]">
              <CardHeader className="absolute z-10 top-1 flex-col items-start w-full">
                <div className="bg-black/60 px-3 py-2 rounded-md">
                  <h4 className="text-white font-medium text-2xl">{report.title}</h4>
                </div>
              </CardHeader>
              <Image
                removeWrapper
                alt={`Imagen de ${report.title}`}
                className="z-0 w-full h-full object-cover"
                src={report.img}
              />
              <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 flex-col items-center w-full">
                <p className="text-black text-tiny mb-2">{report.description}</p>
                <Button
                  className="w-full py-4 text-lg font-bold"
                  color="danger"
                  radius="md"
                  size="lg"
                  onPress={() => downloadPDF(report.endpoint, report.filename)}
                >
                  Descargar PDF
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

    </div>
  )
}