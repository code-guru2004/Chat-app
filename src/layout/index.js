import React from 'react'
import logo from '../assets/logo.jpg'

function AuthLayout({children}) {
  return (
    <>
    <div className='flex items-center justify-center  border-b-2 bg-white shadow-md'>
        <img
        src={logo}
        alt='logo'
        className='w-[200px] '
        />
        
    </div>
    {children}
    </>
  )
}

export default AuthLayout