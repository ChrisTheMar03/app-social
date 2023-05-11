import React, { useRef, useState } from 'react'
import '../registro.css'
import { MdPerson,MdOutlineDateRange,MdOutlineEmail,MdLockOutline } from 'react-icons/md'
import {useNavigate} from 'react-router-dom'


const URL = "http://localhost:3001/api/v1/usuario/verimail"

const Registro = () => {
  const navigate = useNavigate()

  const refCorreo = useRef()

  const [isEmailValid,setIsEmailValid]=useState(1)
  const [valor,setValor]= useState({
    nombre:'',
    apellido:'',
    fechaNacimiento:'',
    sexo:'',
    correo:'',
    contrasena:'',
    imagen:null
  })

  const handleChange=(e)=>{
    const {name,value} = e.target
    setValor({...valor,[name]:value})
  }

  const handleImageChange=(e)=>{
    const imagen = e.target.files[0]
    setValor({...valor,imagen})
  }

  const handleSubmit=async (e)=>{
    e.preventDefault()
    const {nombre,apellido,fechaNacimiento,sexo,correo,contrasena,imagen} = valor
        const formdata = new FormData()
        formdata.append("imguser",imagen)
        formdata.append("nombre",nombre)
        formdata.append("apellido",apellido)
        formdata.append("fechaNacimiento",fechaNacimiento)
        formdata.append("sexo",sexo)
        formdata.append("correo",correo)
        formdata.append("contrasena",contrasena)

    if(nombre.trim().length>0 && apellido.trim().length>0 
      && fechaNacimiento.trim().length>0 && sexo.trim().length>0 
      && correo.trim().length>0 && contrasena.trim().length>0 
      && imagen)
      {
        const response = await fetch("http://localhost:3001/api/v1/usuario/crear",{
          method:"POST",
          body:formdata
        })
        
        if(response.ok){
          const res = await response.json();
          navigate("/")
        }
      }
  }

  function handleBlur(e){
    const correo = e.target.value
    if(correo){
      requestVerifyEmail(correo)
    }
  }

  async function requestVerifyEmail(correo){
    const response = await fetch(URL,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({correo:correo})
    })
    if(response.ok){
      const res = await response.json()
      const [{cantidad}] = res
      setIsEmailValid(cantidad);
      // console.log(isEmailValid);
      if(isEmailValid==1){
        refCorreo.current.classList.add("mostrar-error")
      }else{
        refCorreo.current.classList.remove("mostrar-error")
      }
      
    }
  }

  return (
    <div className='registro'>
      <div className="registro-container">
        <h1 className='registro-titulo'>Registrese con sus datos</h1>
        <form className='form' onSubmit={ handleSubmit } >
          <div className='form-nombre'>
            <label htmlFor="nombre"><MdPerson className='icon'/> </label>
            <input type="text" name='nombre' autoFocus id='nombre' onChange={ handleChange } placeholder='Nombre' />
          </div>
          <div className='form-apellido'>
            <label htmlFor="apellido"><MdPerson className='icon'/></label>
            <input type="text" name='apellido' id='apellido' onChange={ handleChange } placeholder='Apellido' />
          </div>
          <div className='form-nacimiento'>
            <label htmlFor="nacimiento"><MdOutlineDateRange className='icon' /></label>
            <input type="date" id='nacimiento' name='fechaNacimiento' onChange={ handleChange }/>
          </div>
          <div className='form-sexo'>
            <label htmlFor="m">Masculino</label>
            <input type="radio" name='sexo' id='m' value={"M"} onChange={ handleChange } />
            <label htmlFor="f">Femenino</label>
            <input type="radio" name='sexo' id='f' value={"F"} onChange={ handleChange } />
          </div>
          <div className='form-correo' ref={ refCorreo }>
            <label htmlFor="correo"> <MdOutlineEmail className='icon'/> </label>
            <input type="email" name='correo' onBlur={ handleBlur }  required id='correo' onChange={ handleChange } placeholder='Correo' />
          </div>
          <div className='form-contrasena'>
            <label htmlFor="contrasena"><MdLockOutline className='icon'/> </label>
            <input type="password" name='contrasena' id='contrasena' onChange={ handleChange } placeholder='Contraseña' />
          </div>
          <div className='form-imagen'>
            <label htmlFor="imagen"></label>
            <input type="file" name='imagen' id='imagen' onChange={handleImageChange} />
          </div>
          <div className="form-btn">
            <button type='submit'>Registrar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Registro   