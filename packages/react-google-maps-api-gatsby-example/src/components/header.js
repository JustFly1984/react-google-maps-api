import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.svg'

const Header = () => (
  <div className='container'>
    <div className='row'>
      <div className='col-lg-10 offset-lg-1'>
        <div className='header'>
          <Link to='/'>
            <img src={logo} className='logo' alt='Logo' />
          </Link>

          <h1 className='h3'>React Google Maps API</h1>
          <p className='lead text-secondary'>Gatsby Example</p>
        </div>
      </div>
    </div>
  </div>
)

export default Header
