/* eslint-disable filenames/match-exported */
/* eslint-disable filenames/match-regex */
import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  LoadScript,
  GoogleMap,
  StreetViewPanorama
} from '@react-google-maps/api'
import { googleMapKey } from '../../../googleMapKey'

const isBrowser = typeof document !== 'undefined'

const mapContainerStyle = {
  height: '700px',
  width: '100%'
}

const center = {
  lat: -34.397,
  lng: 150.644
}

const libraries = []

const position = { lat: 49.2853171, lng: -123.1119202 }

class SafeLoadScript extends React.Component {
  state = {
    ready: isBrowser || typeof window.google !== 'undefined'
  }

  componentWillMount () {
    if (isBrowser) {
      if (this.state.ready) {
        return
      }

      this.google = window.google

      this.timer = window.setInterval(() => {
        console.log(this.google === window.google)

        if (this.google !== window.google) {
          this.setState(
            () => ({
              ready: true
            })
          )

          window.clearInterval(this.timer)
        }
      }, 200)
    }
  }

  componentWillUnmount () {
    if (isBrowser) {
      window.clearInterval(this.timer)
    }
  }

  render = () => (
    this.state.ready && (
      <LoadScript
        {...this.props}
      />
    )
  )
}

storiesOf('GoogleMap:', module)
  .addDecorator(story => (
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
      {story()}
    </LoadScript>
  ))
  .add('Basic Map', () => (
    <GoogleMap
      id='basic-map-example'
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={center}
    />
  ))
  .add('StreetViewPanorama', () => (
    <GoogleMap
      id='street-view-example'
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={center}
    >
      <StreetViewPanorama
        position={position}
        visible
        onVisibleChanged={() => console.log('Visible changed')}
      />
    </GoogleMap>
  ))

export default SafeLoadScript
