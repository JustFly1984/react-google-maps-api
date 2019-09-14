import React from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, TrafficLayer } from '@react-google-maps/api'

const ExampleTrafficPropTypes = {
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

const ExampleTraffic = ({ styles }) => (
  <div className='map'>
    <div className='map-container'>
      <GoogleMap
        id='traffic-example'
        mapContainerStyle={styles.container}
        zoom={2}
        center={center}
        onClick={onClick}
      >
        <TrafficLayer />
      </GoogleMap>
    </div>
  </div>
)

ExampleTraffic.propTypes = ExampleTrafficPropTypes

export default ExampleTraffic
