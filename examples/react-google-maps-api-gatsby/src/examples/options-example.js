import React from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMap
} from 'react-google-maps-api'

const OptionsExamplePropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
    mapContainer: PropTypes.string.isRequired
  }).isRequired
}

const center = {
  lat: 0,
  lng: -180
}

// Reference for options:
// https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions

const options = {
  streetViewControl: false
}

const OptionsExample = ({ styles }) => (
  <div>
    <GoogleMap
      id='bicycling-example'
      mapContainerStyle={styles.container}
      mapContainerClassName={styles.mapContainer}
      zoom={2}
      center={center}
      options={options}
      onClick={(...args) => {
        console.log('onClick args: ', args)
      }}
    />
  </div>
)

OptionsExample.propTypes = OptionsExamplePropTypes

export default OptionsExample
