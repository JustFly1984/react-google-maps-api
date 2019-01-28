/* eslint-disable filenames/match-regex */
import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  LoadScript,
  GoogleMap,
  StreetViewPanorama
} from 'react-google-maps-api'
import { googleMapKey } from '../../../googleMapKey'

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
    ready: typeof window.google !== 'undefined'
  }

  componentWillMount() {
    if (this.state.ready) {
      return;
    }

    this.google = window.google;

    console.log(this.google);

    this.timer = setInterval(() => {
      console.log(this.google === window.google);

      if (this.google !== window.google) {
        this.setState({ready: true});
        clearInterval(this.timer);
      }
    }, 200);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render = () => (
    this.state.ready && (
      <LoadScript
        {...this.props}
      />
    )
  )
};

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
          onVisibleChanged={() => console.log("Visible changed")}
        />
      </GoogleMap>
  ))

