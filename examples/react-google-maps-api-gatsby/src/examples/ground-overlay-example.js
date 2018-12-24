import React from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMap,
  GroundOverlay
} from 'react-google-maps-api'

const GroundOverlayExamplePropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
    mapContainer: PropTypes.string.isRequired
  }).isRequired
}

const center = {
  lat: 40.740,
  lng: -74.18
}

const BOUNDS = {
  north: 40.773941,
  south: 40.712216,
  east: -74.12544,
  west: -74.22655
}

const GroundOverlayExample = ({ styles }) => (
  <div>
    <GoogleMap
      id='ground-overlay-example'
      mapContainerStyle={styles.container}
      mapContainerClassName={styles.mapContainer}
      zoom={13}
      center={center}
      onClick={(...args) => {
        console.log('onClick args: ', args)
      }}
    >
      <GroundOverlay
        url='https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg'
        bounds={BOUNDS}
      />
    </GoogleMap>
  </div>
)

GroundOverlayExample.propTypes = GroundOverlayExamplePropTypes

export default GroundOverlayExample
