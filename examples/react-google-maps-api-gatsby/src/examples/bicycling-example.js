import React from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMap,
  BicyclingLayer
} from 'react-google-maps-api'

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
    <GoogleMap
      id='bicycling-example'
      mapContainerStyle={styles.container}
      mapContainerClassName={styles.mapContainer}

      zoom={2}
      center={center}
      onClick={(...args) => {
        console.log('onClick args: ', args)
      }}
    >
      <BicyclingLayer />
    </GoogleMap>
  </div>
)

BicyclingExample.propTypes = BicyclingExamplePropTypes

export default BicyclingExample
