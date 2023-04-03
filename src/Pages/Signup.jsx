import React from 'react'
import './Signup.css'
import { Button } from '@mui/material'

function Signup() {
  return (
    <div className='signup'>
        <div className='signup-form'>
            <div className="hero">lets confession!</div>
            <div className="details">
                <input className='email' type="email" placeholder='email...' />
                <input className='pass' type="password" placeholder='pass...' />
                <input className='confirmpass' type="password" placeholder='repeat pass...' />
            </div>
            <div className="btn">
            <Button variant="contained">signup</Button>
            </div>
        </div>
    </div>
  )
}

export default Signup