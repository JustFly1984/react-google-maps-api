import * as React from 'react'

import Card from '../components/card'
import InputBoxApiKey from './input-box-api-key'
import SectionLanguage from '../components/section-language'
import ButtonLoadScript from './button-load-script'

function Settings() {
  return (
    <Card>
      <InputBoxApiKey />

      <p className='small'>
        You can create new Google API key here:{' '}
        <a
          href='https://console.cloud.google.com/apis/credentials/key'
          alt='google api key'
          target='_blank'
          rel='noopener noreferrer'
        >
          https://console.cloud.google.com/apis/credentials/key
        </a>
      </p>

      <hr className='mt-0 mb-3' />

      <SectionLanguage />

      <hr className='mt-0 mb-3' />

      <ButtonLoadScript />
    </Card>
  )
}

export default React.memo(Settings)
