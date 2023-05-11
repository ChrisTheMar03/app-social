import React, { useContext, useEffect } from 'react'
import '../perfil.css'
import {MdOutlineDateRange,MdPerson} from 'react-icons/md'
import { UsuarioContext } from '../context/UsuarioProvider'
import {useNavigate} from 'react-router-dom'
import { PublicacionContext } from '../context/PublicacionProvider'
import utils from '../utils/utils.js'

const Perfil = () => {
  
  const user = useContext(UsuarioContext)
  const publicaciones = useContext(PublicacionContext)
  const userId = parseInt(localStorage.getItem("user-data"))

  const navigate = useNavigate()

  function cerrarSesion(){
    localStorage.removeItem("user-data")
    navigate("/")
  }

  function handleClickViewImage(e){
  //   if(e.target.className=="perfil-img-content"){
  //     const ancho = e.target.childNodes[0].width
  //   }else{
  //     console.log(e.target.width)
  //   }
  }

  return (
    <div className='perfil'>
      <div className="perfil-container">
        <div className="perfil-header">
          <div className="perfil-img-content" onClick={ handleClickViewImage }>
            <img className='perfil-img' src={user.imagen} alt="" />
          </div>
        </div>
        <div className='perfil-body'>
          <p className='perfil-nombre'>{user.nombre}</p>
          <p className='perfil-data'>{user.correo}</p>
          <div className='perfil-desc'>
            <span> <MdOutlineDateRange  /> Nacio {user.fechaNacimiento && utils.cortadorFecha(user.fechaNacimiento)}</span>
            <span> <MdPerson/> {user.sexo}</span>
          </div>
          <div className='perfil-sesion'>
            <button type='button' onClick={ cerrarSesion } >Cerrar Sesion</button>
          </div>
        </div>
        <div className="perfil-publicaciones">

        </div>

      </div>
    </div>
  )
}

export default Perfil