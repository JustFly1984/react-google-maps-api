import React from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMap,
  BicyclingLayer
} from '@react-google-maps/api'

const ExampleBicyclingPropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired
  }).isRequired
}

const center = {
  lat: 0,
  lng: -180
}

const ExampleBicycling = ({ styles }) => (
  <div className='map'>
    <div className='map-container'>
      <GoogleMap
        id='bicycling-example'
        mapContainerStyle={styles.container}
        zoom={2}
        center={center}
        onClick={(...args) => {
          console.log('onClick args: ', args)
        }}
      >
        <BicyclingLayer />
      </GoogleMap>
    </div>
  </div>
)

ExampleBicycling.propTypes = ExampleBicyclingPropTypes

export default ExampleBicycling
