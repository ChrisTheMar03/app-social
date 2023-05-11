import React, { Children, useContext } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Principal from './pages/Principal'
import Social from './pages/Social'
import Perfil from './pages/Perfil'
import UsuarioProvider from './context/UsuarioProvider'
import PublicacionProvider from './context/PublicacionProvider'

function App() {

  return (
    <>
      <BrowserRouter> 
        <Routes>
          <Route path='/' element={  <Login/>}></Route>
          <Route path='registro' element={ <Registro/> }></Route>
          <Route path='principal' element={  <UsuarioProvider children={ <Principal/> }> <Principal/> </UsuarioProvider> } >
            <Route index path='social' element={ <PublicacionProvider children={ <Social/> }> <UsuarioProvider children={ <Social/> }>  <Social/> </UsuarioProvider></PublicacionProvider> } ></Route>
            <Route path='perfil' element={ <PublicacionProvider children={ <Perfil/> }> <UsuarioProvider children={ <Perfil/> } > <Perfil/> </UsuarioProvider></PublicacionProvider> }></Route>
          </Route>


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
