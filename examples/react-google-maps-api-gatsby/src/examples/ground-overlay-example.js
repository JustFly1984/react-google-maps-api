import React from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMap,
  GroundOverlay
} from '../../../../src'

const GroundOverlayExamplePropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
    mapContainer: PropTypes.string.isRequired
  }).isRequired
}

const center = {
  lat: 0,
  lng: -180
}

const BOUNDS = [{
  x: 38.685,
  y: 33.671
}, {
  x: -115.234,
  y: -118.251
}]

const GroundOverlayExample = ({ styles }) => (
  <div>
    <GoogleMap
      id='traffic-example'
      mapContainerStyle={styles.container}
      mapContainerClassName={styles.mapContainer}
      zoom={2}
      center={center}
      onClick={(...args) => {
        console.log('onClick args: ', args)
      }}
    >
      <GroundOverlay
        bounds={BOUNDS}
      />
    </GoogleMap>
  </div>
)

GroundOverlayExample.propTypes = GroundOverlayExamplePropTypes

export default GroundOverlayExample
