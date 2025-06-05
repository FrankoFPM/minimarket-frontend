'use client'
import { TbEdit, TbEye, TbTrash } from 'react-icons/tb'
import { Modaltest, type ModalTestRef } from './modal'
import { useRef } from 'react'

interface Header {
  text: string;
  className?: string;
}

interface TableProps {
  children: React.ReactNode;
  headers: Header[];
}

export function Table({ children, headers }: TableProps) {
  return (
    <div className="w-full bg-secondary p-4 rounded-2xl">
      <table className="table-auto w-full">
        <thead className="">
          <tr className="drop-shadow-sm [&>th]:first:text-center [&>th]:last:text-center [&>th]:first:rounded-l-lg [&>th]:last:rounded-r-lg [&>th]:bg-background [&>th]:text-foreground [&>th]:px-4 [&>th]:py-1.5 ">
            {headers.map((header, index) => (
              <th key={index} className={header.className}>{header.text}</th>
            ))}
          </tr>
          <tr className="h-1.5 -z-10"></tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  )

}

export function ChipStatus({ status }: { status: number }) {
  return <div className={`mx-auto w-20 text-center py-1 px-4 rounded-full text-xs font-semibold ${status == 1 ? 'bg-green-500/25 text-green-800 dark:text-green-500' : 'bg-red-500/25 text-red-800 dark:text-red-500'}`}>
    {status == 1 ? 'Activo' : 'Inactivo'}
  </div>
}

export function SkeletonTable({rows}: {rows?: number}){
  return(
    <div className="w-full bg-secondary p-4 rounded-2xl animate-pulse">
      <table className="table-auto w-full">
        <thead className="">
          <tr className="h-10 drop-shadow-sm [&>th]:first:rounded-l-lg [&>th]:last:rounded-r-lg [&>th]:bg-primary-1/25">
            {[...Array(5)].map((_, index) => (
              <th key={index} className="">&nbsp;</th>
            ))}
          </tr>
          <tr className="h-1.5 -z-10"></tr>
        </thead>
        <tbody>
          {[...Array(rows || 5)].map((_, index) => (
            <tr key={index} className="">
              {[...Array(5)].map((_, index) => (
                <td key={index} className="px-1 py-1">
                  <div className="h-7 bg-primary-1/25 rounded-2xl">
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ButtonsActions() {

  const modalRef = useRef<ModalTestRef>(null)

  function handleEdit() {
    console.log('Edit')
    modalRef.current?.openModal()
  }
  function handleView() {
    console.log('View')
  }
  function handleDelete() {
    console.log('Delete')
  }
  return <div className="flex items-center justify-center text-2xl gap-4">
    <TbEye className="text-blue-400 drop-shadow-xs cursor-pointer" onClick={handleView} />
    <TbEdit className="text-amber-400 drop-shadow-xs cursor-pointer" onClick={handleEdit} />
    <TbTrash className="text-red-600 drop-shadow-xs cursor-pointer" onClick={handleDelete} />
    <Modaltest ref={modalRef} />
  </div>

}