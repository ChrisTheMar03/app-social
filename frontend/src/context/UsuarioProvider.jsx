import React, { createContext, useEffect, useState } from 'react'

export const UsuarioContext = createContext()

const URL = "http://localhost:3001/api/v1/usuario"
const UsuarioProvider = ({children})=>{

  const [usuario, setUsuario] = useState({})

  useEffect(()=>{
    requestFind()
  },[])
  

  async function requestFind(){
    const id = parseInt(localStorage.getItem("user-data"))
    const response = await fetch(`${URL}/${id}`)
    if(response.ok){
      const result = await response.json()
      const data= result[0]
      setUsuario(data)
    }
    
  }

  return (
    <UsuarioContext.Provider children={ children } value={ usuario } />
  )

}

export default UsuarioProvider
