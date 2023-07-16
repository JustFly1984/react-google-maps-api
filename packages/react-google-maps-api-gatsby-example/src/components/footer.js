// eslint-disable-next-line node/no-extraneous-import
import { memo } from 'react'

function Footer() {
  return (
    <footer className='footer'>
      <div className='text-secondary small'>2019 React Google Maps API</div>
    </footer>
  )
}

export default memo(Footer)
