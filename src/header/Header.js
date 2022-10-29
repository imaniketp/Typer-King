import React from 'react'
import { Link } from 'react-router-dom'
import AccountIcon from './AccountIcon'
import Logo from './Logo';


function Header() {

 
  return (
    
    <div className='header'>
      <Link to='/'>
        <div className="logo">
           <Logo />
        </div>
      </Link>
      
      
        <div className="icons">
            <AccountIcon/>
        </div>

    </div>
  )
}

export default Header