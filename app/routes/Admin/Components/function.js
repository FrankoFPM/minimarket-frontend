import Swal from 'sweetalert2'
import widthReactContent from 'sweetaletr2-react-content'

export function show_alerta(mensaje, icono, foco=''){
  onfocus(foco)
  const MySwal = widthReactContent(Swal)
  MySwal.fire({
    title:mensaje,
    icon:icono
  })

}

function onfocus(foco){
  if( foco !== ''){
    document.getElementById(foco).focus()
  }
}