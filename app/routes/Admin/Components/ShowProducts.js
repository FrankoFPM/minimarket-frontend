import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import widthReactContent from 'sweetaletr2-react-content'
import { show_alerta } from '../functions'

const ShowProducts = () => {
  const url = 'http://api-products.run'
  const [products,setProducts] = useState([])
  const [id,setId] = useState('')
  const [name,setName] = useState('')
  const [description,setDescription] = useState('')
  const [price,setPrice] = useState('')
  const [operation,setdOperation] = useState('1')
  const [title,setTittle] = useState('')

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    const respuesta = await axios.get(url)
    setProducts(respuesta.data)
  }
  const openModal =(op,id,name,description,price)=>{
    setId('')
    setName('')
    setDescription('')
    setPrice('')
    setdOperation(op)
    if( op === 1){
        setTittle('Registrar Producto')
    }else if( op === 2){
        setTittle('Editar Producto');
        setId(id)
        setName(name)
        setDescription(description)
        setPrice(price)
    }  
    window.setTimeout(function(){
        document.getElementById('nombre').focus()
    },500)

    const validar = () => {
        var parametros;
        var metodo;
        if(name.trim() === ''){
            show_alerta('Escribe el nombre del producto', 'warning');
        } else if(name.trim() === ''){
            show_alerta('Escribe la descri`pción del producto', 'warning');
        } else if(name.trim() === ''){
            show_alerta('Escribe el precio del producto', 'warning');
        } else 
            if(operation === 1){
            parametros = {name:name.trim(),description: description.trim(),price:price}
            metodo= 'POST'
            } else {
            parametros = {id:id,name:name.trim(),description: description.trim(),price:price}
            metodo= 'PUT'
            }
            enviarSolicitud(metodo,parametros)
    
        }
    const enviarSolicitud = async(metodo,parametros) =>{
        await axios ({method:metodo, url:url, data:parametros}).then(function(respuesta){
            var tipo = respuesta.data[0]
            var msj = respuesta.data[1]
            show_alerta(msj,tipo);
            if(tipo == 'success'){
                document.getElementaryById('btnCerrar').click()
                getProducts();
            }
        })
        .catch(function(error){
            show_alerta('Error de solicitud', 'error');
            console.log(error);
        })
    }

    const deleteProduct=(id,name) =>{
        const MySwal = widthReactContent(Swal);
        MySwal.fire({
            title: '¿Seguro de desea eliminar el producto '+name+'?',
            icon: 'question', text: 'No se podrá dar marcha atrás.',
            showCancelBUtton:true, confirmButtonText:'Si,eliminar', cancelButtonText:'Cancelar'
        }) .then((result)=>{
            if(result.isConfirmed){
                setId(id);
                enviarSolicitud('DELETE',{id:id});
            }else {
                show_alerta('El poducto no fue eliminado.', 'info');
            }
            }
        )
    }


  return (
    <div className='App'>
      <div className='container fluid'>
        <div className='row at-3'>
          <div className='col-md-4 offset-4'>
            <div className='offset-md-4'>
              <button onClick={()=> openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='modalProducts'></button>
              <i className='fa solid fa-circle-plus'></i> Añadir
            </div>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-12 col-lg-8 offset-lg-12'>
            <div className='table table-bordered'>
              <thread><tr><th>Producto</th><th>Descripción</th><th>Precio</th></tr></thread>
              <tbody className='table-group-divider'>
                {products.map( (product,i)=>(
                  <tr key={product.id}>
                    <td>{(i+1)}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                    <td>${new Intl.NumberFormat('es-mx'.format(product.price))}</td>
                    <td>
                      <button onclick={() => openModal(product,id,product.name, product.description, product.price)} 
                      className='btn btn-warning' data-bs-toggle='modal' data-bs-target='modalProducts'>
                        <i className='fa-solid fa-edit'></i>
                      </button>
                        &nbsp;
                      <button onclick={() => deleteProduct(product,id,product.name)} className='btn btn-danger'>
                        <i className='fa-solid fa-trash'></i>
                      </button>
                    </td>
                  </tr>
                ))
                }
              </tbody>
            </div>
            <div id='nodalProducts' className='modal fade' aria-hidden='true'>
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <label className='h5'>{title}</label>
                    <label className=''></label>
                    <buton type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></buton>
                  </div>
                  <div className='modal-body'>
                    <input type='hidden' id='id'></input>
                    <div className='input-group mb-3'>
                      <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                      <input type='text' id='nombre' className='form-control' placeholder='Nombre' value={name}
                        onChange={(e)=> setName(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                      <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                      <input type='text' id='descripcion' className='form-control' placeholder='Descripcion' value={description}
                        onChange={(e)=> setDescription(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                      <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                      <input type='text' id='precio' className='form-control' placeholder='Precio' value={price}
                        onChange={(e)=> setPrice(e.target.value)}></input>
                    </div>
                    <div className='d-grid col-6 mx-auto'>
                      <button onclick={() =>validar()} className='btn btn-succes'>
                        <i className='fa-solid fa-floppy-disk'></i>Guardar
                      </button>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dimiss='modal'>Cerrar</button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ShowProducts