import type { FieldError, Merge } from 'react-hook-form'
import { MdError } from 'react-icons/md'

interface ContainerInput {
  label?: string
  children: React.ReactNode
  color?: string
  className?: string
}

export function ContainerInput({ label,children, color, className }: ContainerInput) {
  return (
    <div className="w-full">
      {/*<label htmlFor={label.toLowerCase()} className={'block text-sm/6 font-medium' + (color ? ' text-red-500 font-bold' : ' text-foreground')}>*/}
      {
        label ? <label htmlFor={label.toLowerCase()} className={'block text-sm/6 font-medium' + (color ? ' text-red-500 font-bold' : ' text-foreground')}>{label}</label> : ''
      }
      <div
        className={`${className || ''} drop-shadow-sm flex items-center bg-secondary outline-1 -outline-offset-1 outline-primary-2 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 ${color ? color : 'has-[input:focus-within]:outline-primary-1'}`}>
        {children}
        {color ? <MdError className='absolute text-red-500 inline-block mx-2 right-0' />   : ''}
      </div>
    </div>
  )
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string | FieldError | Merge<FieldError, FieldError> | null
  beforeElement?: React.ReactNode
  afterElement?: React.ReactNode
  className?: string
}

export function InputField({ label, error = null, beforeElement, afterElement, className, ...props }: InputFieldProps) {
  return (
    <div className="flex flex-col w-full">
      <ContainerInput label={label} color={error ? 'has-[input:focus-within]:outline-red-500 outline-red-500' : ''} className={className}>
        {beforeElement}
        <input
          {...props} // Pasa todos los atributos adicionales al input
          className={`h-11 pl-3 w-full ${error ? 'text-red-500' : ''}`}
        />
        {afterElement}
      </ContainerInput>
      <p className='text-red-500 text-xs font-medium mt-1'>{error ? (typeof error === 'string' ? error : String(error.message)) : ''}</p>
    </div>
  )
}

interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string | FieldError | Merge<FieldError, FieldError> | null
  beforeElement?: React.ReactNode
  afterElement?: React.ReactNode
  className?: string
  children: React.ReactNode
}

export function SelectInput({ label, error = null, beforeElement, afterElement, className, children, ...props }: SelectInputProps) {
  return (
    <div className="flex flex-col w-full">
      <ContainerInput label={label} color={error ? 'has-[input:focus-within]:outline-red-500 outline-red-500' : ''} className={className}>
        {beforeElement}
        <select
          {...props}
          className={`h-11 pl-3 w-full bg-transparent ${error ? 'text-red-500' : ''}`}
        >
          {children}
        </select>
        {afterElement}
      </ContainerInput>
      <p className='text-red-500 text-xs font-medium mt-1'>{error ? (typeof error === 'string' ? error : String(error.message)) : ''}</p>
    </div>
  )
}