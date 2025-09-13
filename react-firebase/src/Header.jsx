import React from 'react'
import { NavLink } from 'react-router'
function Header() {
  return (
    <div className='container'>
        <nav className='navbar navbar-expand-lg bg-dark '>
            <NavLink to="/" className='navbar-brand nav-link text-light'>Home</NavLink>
             <NavLink to="/Edit/:id" className='navbar-brand nav-link text-light'> Edit </NavLink>
            <NavLink to="/Add" className='navbar-brand nav-link text-light'>Add</NavLink>
        </nav>
    </div>
  )
}

export default Header