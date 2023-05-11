import React, { useState } from 'react'
import '../login.css'
import { MdPerson,MdLockOutline } from 'react-icons/md'
import { useEffect } from 'react'
import {useNavigate,Link} from 'react-router-dom'


const Login = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if(localStorage.getItem("user-data")!=null){
      navigate("/principal/social")
    }
  }, [])
  

  const [data, setData] = useState({
    correo:'',
    contrasena:''
  })

  const handleChange=(e)=>{
    const {name,value} = e.target
    setData({...data,[name]:value})
  }

  const handleClick=(e)=>{
    const {correo,contrasena} = data
    requestSesion(correo,contrasena)
  }

  async function requestSesion(correo,contrasena){
    const response = await fetch(`http://localhost:3001/api/v1/usuario/${correo}/${contrasena}`,{
      method:'GET'
    })
    if(response.ok){
      const res = await response.json()
      if(res.length!=0){
          const user = res[0]
          const id = user.idUser
          localStorage.setItem("user-data",id);
          navigate("/principal/social")
      }else{
        alert("Usuario no encontrado")
      }
    }
  }

  return (
    <div className='login'>
      <div className="login-container">
        <h1>Login</h1>
        <div className='form-correo'>
            <label htmlFor="correo"><MdPerson className='icon'/></label>
            <input type="text" name='correo' id='correo' onChange={ handleChange } placeholder='Correo' />
          </div>
          <div className='form-apellido'>
            <label htmlFor="contrasena"><MdLockOutline className='icon'/></label>
            <input type="password" name='contrasena' id='contrasena' onChange={ handleChange } placeholder='Contraseña' />
          </div>
          <div className='form-registrese' style={{textAlign:"end"}}>
            <Link style={{fontSize:"0.8rem"}} to="/registro">Registrese Aqui</Link>
          </div>
          <div className="form-btn">
            <button onClick={ handleClick } type='button'>Iniciar Sesion</button>
          </div>
      </div>
    </div>
  )
}

export default Login  