import React from 'react'

import Card from '../components/card'
import InputBoxApiKey from '../components/inpunbox-apikey'
import SectionLanguage from '../components/section-language'
import ButtonLoadscript from '../components/button-loadscript'

const Settings = () => (
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

    <ButtonLoadscript />
  </Card>
)

export default Settings
