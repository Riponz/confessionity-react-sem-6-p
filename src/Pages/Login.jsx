import React from 'react'
import './Login.css'
import { Button } from '@mui/material'

function Login() {
  return (
    <div className='login'>
        <div className='login-form'>
            <div className="hero">welcome back!</div>
            <div className="details">
                <input className='email' type="email" placeholder='email...' />
                <input className='pass' type="password" placeholder='pass...' />
            </div>
            <div className="btn">
            <Button variant="contained">login</Button>
            </div>
        </div>
    </div>
  )
}

export default Login