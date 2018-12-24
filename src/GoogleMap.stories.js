/* eslint-disable filenames/match-regex */
import React from 'react'
import { storiesOf } from '@storybook/react'
import LoadScript from './LoadScript'
import { GoogleMap } from './GoogleMap'
import { googleMapKey } from '../googleMapKey'

const mapContainerStyle = {
  height: '700px',
  width: '100%'
}

const center = {
  lat: -34.397,
  lng: 150.644
}

const libraries = []

storiesOf('GoogleMap:', module)
  .add('Basic Map', () => (
    <LoadScript
      id='script-loader'
      googleMapsApiKey={googleMapKey}
      language={'en'}
      region='EN'
      version='weekly'
      libraries={libraries}
      onLoad={() => console.log('script loaded')}
      loadingElement={<div>Loading...</div>}
    >
      <GoogleMap
        id='basic-map-example'
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
      />
    </LoadScript>
  ))
