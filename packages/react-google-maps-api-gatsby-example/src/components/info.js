import { memo } from 'react'
import info from '../img/info-circle-solid.svg'

function Info() {
  return (
    <div className='alert alert-info mb-4' role='alert'>
      <img src={info} className='icon' alt='Info' />
      Sorry, but {' '}
      <a
        href='https://react-google-maps-api-docs.netlify.app/'
        target='_blank'
        rel='noopener noreferrer'
      >
        documentation
      </a>{' '}
      on how to implement the API is broken and outdated. Help Required
      <br />
      You can donate or became a sponsor <a href="https://opencollective.com/react-google-maps-api#category-CONTRIBUTE" rel='noopener noreferrer'>here</a>
    </div>
  )
}

export default memo(Info)
