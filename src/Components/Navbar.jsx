import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar'>
      <div className="navbar-logo">Confessionity</div>
      <div className="navbar-menu">
        <div className="menu-ele"><NavLink style={{ color: "black"}} to='/'>Home</NavLink></div>
        <div className="menu-ele"><NavLink style={{ color: "black"}} to='/post'>Post</NavLink></div>
        <div className="menu-ele"><NavLink style={{ color: "black"}} to='/my-posts'>My Posts</NavLink></div>
        <div className="menu-ele"><NavLink style={{ color: "black"}} to='/accounts'>Account</NavLink></div>
      </div>
    </div>
  )
}

export default Navbar