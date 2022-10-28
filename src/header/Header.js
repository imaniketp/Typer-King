import React from 'react'
import { Link } from 'react-router-dom'
import AccountIcon from './AccountIcon'


function Header() {
  return (
    
    <div className='header'>
      <Link to='/'>
        <div className="logo" style={{cursor:'pointer', fontSize:'2rem'}}>
            TyperKing
        </div>
      </Link>
      
      
        <div className="icons">
            <AccountIcon/>
        </div>

    </div>
  )
}

export default Header