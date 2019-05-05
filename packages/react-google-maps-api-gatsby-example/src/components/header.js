import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.svg'

const Header = () => (
  <div className='header'>
    <Link to='/'>
      <img src={logo} className='logo' alt='Logo' />
    </Link>

    <h1 className='h3'>React Google Maps API</h1>
    <p className='text-secondary'>Gatsby Example</p>
  </div>
)

export default Header
