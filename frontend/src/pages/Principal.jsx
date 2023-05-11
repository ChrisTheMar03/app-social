import React, { useContext } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {Outlet} from 'react-router-dom'
import UsuarioProvider, { UsuarioContext } from '../context/UsuarioProvider'

const Principal = () => {

  const user = useContext(UsuarioContext)

  return (
    <>
      <Header user={ user } />
       <Outlet/>
       <Footer/>
    </>
  )
}

export default Principal    