import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import '../header.css'  
import { UsuarioContext } from '../context/UsuarioProvider'

const Header = ({user}) => {

  

  return (
    <header className='header'>
      <nav className='nav'>
        <ul className='header-lst'>
          <li className='header-item'><Link to='/principal/social' className='link'> <img src="../imgs/logo.jfif" width="50" alt="" />ZODIAL </Link> </li>
          <li className='header-item'>
            <div className='header-item-content'>
              <input type="text" className='header-entrada' placeholder='Buscar..' />
              <div className='nav-img-content'>
                <Link to='/principal/perfil' title='Perfil'><img src={user.imagen} style={{backgroundColor:"lightblue"}} className='nav-img' alt="" /></Link>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header     