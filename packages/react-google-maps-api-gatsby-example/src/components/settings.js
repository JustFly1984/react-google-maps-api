import React from 'react'

import InputBoxApiKey from '../components/inpunbox-apikey'
import SectionLanguage from '../components/section-language'
import ButtonLoadscript from '../components/button-loadscript'

const Settings = () => (
  <div className='card shadow-sm mb-5'>
    <div className='card-body'>
      <div>
        <InputBoxApiKey />

        <p className='small'>
          You can create new Google API key here: <a href='https://console.cloud.google.com/apis/credentials/key' alt='google api key' target='_blank' rel='noopener noreferrer'>https://console.cloud.google.com/apis/credentials/key</a>
        </p>
      </div>

      <hr className='m-0 mb-3' />

      <SectionLanguage />

      <hr className='mt-0 mb-3' />

      <ButtonLoadscript />
    </div>
  </div>
)

export default Settings
