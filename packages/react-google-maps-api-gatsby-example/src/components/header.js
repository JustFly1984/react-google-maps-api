import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.svg'

import { logoStyle } from '../components/styles'

const Header = () => (
  <div className='container'>
    <div className='py-4 text-center'>
      <Link to='/'>
        <img src={logo} style={logoStyle} alt='Logo' />
      </Link>

      <h1 className='h2'>React Google Maps API</h1>
      <p className='lead text-secondary'>Gatsby Example</p>
    </div>
  </div>
)

export default Header
