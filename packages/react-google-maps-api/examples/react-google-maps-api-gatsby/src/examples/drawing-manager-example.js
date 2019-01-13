import React from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMap,
  DrawingManager
} from 'react-google-maps-api'

const center = {
  lat: 0,
  lng: -180
}

const DrawingManagerExamplePropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
    mapContainer: PropTypes.string.isRequired
  }).isRequired
}

const DrawingManagerExample = ({ styles }) => (
  <div>
    <GoogleMap
      id='drawing-manager-example'
      mapContainerStyle={styles.container}
      mapContainerClassName={styles.mapContainer}
      zoom={2}
      center={center}
    >
      <DrawingManager />
    </GoogleMap>
  </div>
)

DrawingManagerExample.propTypes = DrawingManagerExamplePropTypes

export default DrawingManagerExample
