import React from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, BicyclingLayer } from '@react-google-maps/api'

const ExampleBicyclingPropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
  }).isRequired,
}

const center = {
  lat: 0,
  lng: -180,
}

const onClick = (...args) => {
  console.log('onClick args: ', args)
}

const onBicyclingLayerLoad = bicyclingLayer => {
  // Do something with bicyclingLayer
  console.log('bicyclingLayer: ', bicyclingLayer)
}

const onMapLoad = map => {
  console.log('map: ', map)
}

const ExampleBicycling = ({ styles }) => (
  <div className='map'>
    <div className='map-container'>
      <GoogleMap
        id='bicycling-example'
        mapContainerStyle={styles.container}
        zoom={2}
        center={center}
        onClick={onClick}
        onLoad={onMapLoad}
      >
        <BicyclingLayer onLoad={onBicyclingLayerLoad} />
      </GoogleMap>
    </div>
  </div>
)

ExampleBicycling.propTypes = ExampleBicyclingPropTypes

export default ExampleBicycling
