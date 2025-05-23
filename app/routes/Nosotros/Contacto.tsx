import { InputField } from '~/Components/FormComponent'
import { useForm } from 'react-hook-form'

export default function Contacto() {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  interface FormData {
    email: string;
    names: string;
    mensaje: string;
  }

  const onSubmit = (data:FormData) => {
    console.log('Datos enviados:', data)
    const { email, names, mensaje } = data
    if(!email || !names || !mensaje) {
      return
    }

    // Aquí puedes manejar el envío del formulario, como enviar los datos a un servidor o realizar alguna acción adicional.
    alert('Formulario enviado con éxito')
  }

  return(
    <section className="
    container
    my-6 h-fit mx-auto
    grid grid-cols-2 gap-20
    ">
      <div className='min-h-[500px] flex flex-col justify-center items-stretch px-20'>
        <h1 className="text-3xl font-bold text-center">Contacto</h1>
        <p className="text-center">Si tienes alguna pregunta o comentario, no dudes en ponerte en contacto con nosotros.</p>
        <form className="flex flex-col items-center mt-4 gap-5" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            type="email"
            placeholder="example@example.com"
            className='rounded-md'
            {...register('email', {
              required: 'Este campo es obligatorio',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Formato de correo electrónico inválido'
              }
            })}
            error={errors.email?.message}
          />
          <InputField
            type="text"
            placeholder="Nombres y apellidos"
            className='rounded-md'
            {...register('names', {
              required: 'Este campo es obligatorio',
              minLength: {
                value: 3,
                message: 'El nombre debe tener al menos 3 caracteres'
              }
            })}
            error={errors.names?.message}
          />
          <textarea placeholder="Mensaje" className="border-2 border-gray-300 p-2 mb-4 w-full h-32"
            {...register('mensaje', {
              required: 'Este campo es obligatorio',
              minLength: {
                value: 10,
                message: 'El mensaje debe tener al menos 10 caracteres'
              }
            })}
          ></textarea>
          {/*TODO: Cambiar a un componente InputField */}
          {errors.mensaje && <span className="text-red-500">{errors.mensaje.message}</span>}
          <button type="submit" className="btn-success">Enviar</button>
        </form>
      </div>
      <div className='px-20'>
        <iframe
          title="Ubicación en Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4686.007326530308!2d-77.07277228863234!3d-11.9528898882277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105d1d877f532d7%3A0x8db19fe8e1f40feb!2sUniversidad%20Tecnol%C3%B3gica%20del%20Per%C3%BA!5e1!3m2!1ses!2sus!4v1746998533318!5m2!1ses!2sus"
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  )
}