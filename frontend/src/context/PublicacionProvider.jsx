import React, { createContext, useEffect, useState } from 'react'

export const PublicacionContext = createContext()

const URL = "http://localhost:3001/api/v1/publicacion/"
const PublicacionProvider=({children})=> {
  
  const [publicaciones, setPublicaciones] = useState([])

  useEffect(()=>{
    requestListPublications()
  },[])

  async function requestListPublications(){
    const response = await fetch(URL,{
      method:"GET"
    })
    if(response.ok){
      const res = await response.json()
      setPublicaciones(res)
      // console.log(publicaciones);
    }
  }

  return (
    <PublicacionContext.Provider children={children} value={ publicaciones }  />
  )
}

export default PublicacionProvider  