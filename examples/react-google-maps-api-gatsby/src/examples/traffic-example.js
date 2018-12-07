import React from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMapProvider,
  GoogleMap,
  TrafficLayer
} from '../../../../src'

const TrafficExamplePropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
    mapContainer: PropTypes.string.isRequired
  }).isRequired
}

const center = {
  lat: 0,
  lng: -180
}

const TrafficExample = ({ styles }) => (
  <div>
    <GoogleMapProvider
      id='traffic-example'
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
        <TrafficLayer />
      </GoogleMap>
    </GoogleMapProvider>
  </div>
)

TrafficExample.propTypes = TrafficExamplePropTypes

export default TrafficExample
