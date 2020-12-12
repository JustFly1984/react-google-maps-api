import * as React from 'react'
import info from '../img/info-circle-solid.svg'

function Info() {
  return (
    <div className='alert alert-info mb-4' role='alert'>
      <img src={info} className='icon' alt='Info' />
      Please read the{' '}
      <a
        href='https://react-google-maps-api-docs.netlify.app/'
        target='_blank'
        rel='noopener noreferrer'
      >
        documentation
      </a>{' '}
      on how to implement the API.
    </div>
  )
}

export default React.memo(Info)
