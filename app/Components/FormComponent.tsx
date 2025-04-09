import { MdError } from 'react-icons/md'

interface ContainerInput {
  label: string;
  children: React.ReactNode;
  color?: string;
}

export function ContainerInput({ label,children, color }: ContainerInput) {
  return (
    <div className="w-full">
      <label htmlFor={label.toLowerCase.toString()} className="block text-sm/6 font-medium text-foreground">
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