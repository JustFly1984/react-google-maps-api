import React from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMap,
  HeatmapLayer
} from 'react-google-maps-api'

const HeatmapExamplePropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
    mapContainer: PropTypes.string.isRequired
  }).isRequired
}

const center = {
  lat: 40.75,
  lng: -74
}

const HeatmapExample = ({ styles }) => (
  <div>
    <GoogleMap
      id='heatmap-example'
      mapContainerStyle={styles.container}
      mapContainerClassName={styles.mapContainer}
      zoom={10}
      center={center}
      onClick={(...args) => {
        console.log('onClick args: ', args)
      }}
    >
      <HeatmapLayer
      />
    </GoogleMap>
  </div>
)

HeatmapExample.propTypes = HeatmapExamplePropTypes

export default HeatmapExample
