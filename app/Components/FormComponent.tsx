import type { FieldError, Merge } from 'react-hook-form'
import { MdError } from 'react-icons/md'

interface ContainerInput {
  label: string;
  children: React.ReactNode;
  color?: string;
}

export function ContainerInput({ label,children, color }: ContainerInput) {
  return (
    <div className="w-full">
      <label htmlFor={label.toLowerCase.toString()} className={'block text-sm/6 font-medium' + (color ? ' text-red-500 font-bold' : ' text-foreground')}>
        {label}
      </label>
      <div
        className={`drop-shadow-xs flex items-center rounded-md bg-secondary  outline-1 -outline-offset-1 outline-background has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 ${color ? color : 'has-[input:focus-within]:outline-primary-1'}`}>
        {children}
        {color ? <MdError className='absolute text-red-500 inline-block mx-2 right-0' />   : ''}
      </div>
    </div>
  )
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string | FieldError | Merge<FieldError, FieldError> | null
}

export function InputField({ label, error = null, ...props }: InputFieldProps) {
  return (
    <div className="flex flex-col">
      <ContainerInput label={label} color={error ? 'has-[input:focus-within]:outline-red-500 outline-red-500' : ''}>
        <input
          {...props} // Pasa todos los atributos adicionales al input
          className={`h-11 pl-3 w-full ${error ? 'text-red-500' : ''}`}
        />
      </ContainerInput>
      <p className='text-red-500 text-xs font-medium mt-1'>{error ? (typeof error === 'string' ? error : String(error.message)) : ''}</p>
    </div>
  )
}