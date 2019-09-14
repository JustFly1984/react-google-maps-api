import React from 'react'
import info from '../img/info-circle-solid.svg'

const Info = () => (
  <div className='alert alert-info mb-4' role='alert'>
    <img src={info} className='icon' alt='Info' />
    Please read the{' '}
    <a
      href='https://react-google-maps-api-docs.netlify.com/'
      target='_blank'
      rel='noopener noreferrer'
    >
      documentation
    </a>{' '}
    on how to implement the API.
  </div>
)

export default Info
