import React from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, GroundOverlay } from '@react-google-maps/api'

const ExampleGroundPropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
  }).isRequired,
}

const center = {
  lat: 40.74,
  lng: -74.18,
}

const BOUNDS = {
  north: 40.773941,
  south: 40.712216,
  east: -74.12544,
  west: -74.22655,
}

const onClick = (...args) => {
  console.log('onClick args: ', args)
}

const ExampleGround = ({ styles }) => (
  <div className='map'>
    <div className='map-container'>
      <GoogleMap
        id='ground-example'
        mapContainerStyle={styles.container}
        zoom={13}
        center={center}
        onClick={onClick}
      >
        <GroundOverlay
          url='https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg'
          bounds={BOUNDS}
        />
      </GoogleMap>
    </div>
  </div>
)

ExampleGround.propTypes = ExampleGroundPropTypes

export default ExampleGround
