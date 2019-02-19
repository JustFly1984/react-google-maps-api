import React from 'react'

import { footerStyle } from '../components/styles'

const Footer = () => (
  <footer style={footerStyle}>
    <div className='container'>
      <div className='row'>
        <div className='col-lg-10 offset-lg-1'>
          <span className='text-muted small'>2019 React Google Maps API</span>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
