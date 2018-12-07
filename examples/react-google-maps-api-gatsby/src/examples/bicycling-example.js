import React from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMapProvider,
  GoogleMap,
  BicyclingLayer
} from '../../../../src'

const BicyclingExamplePropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
    mapContainer: PropTypes.string.isRequired
  }).isRequired
}

const center = {
  lat: 0,
  lng: -180
}

const BicyclingExample = ({ styles }) => (
  <div>
    <GoogleMapProvider
      id='bicycling-example'
      mapContainerStyle={styles.container}
      mapContainerClassName={styles.mapContainer}
    >
      <GoogleMap
        zoom={2}
        center={center}
        onClick={(...args) => {
          console.log('onClick args: ', args)
        }}
      >
        <BicyclingLayer />
      </GoogleMap>
    </GoogleMapProvider>
  </div>
)

BicyclingExample.propTypes = BicyclingExamplePropTypes

export default BicyclingExample
