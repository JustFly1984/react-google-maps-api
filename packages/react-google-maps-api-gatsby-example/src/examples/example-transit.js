import React from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, TransitLayer } from '@react-google-maps/api'

const ExampleTransitPropTypes = {
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

const onTransitLayerLoad = transitLayer => {
  // Do something with transitLayer
  console.log('transitLayer: ', transitLayer)
}

const onMapLoad = map => {
  console.log('map: ', map)
}

const ExampleTransit = ({ styles }) => (
  <div className='map'>
    <div className='map-container'>
      <GoogleMap
        id='transit-example'
        mapContainerStyle={styles.container}
        zoom={2}
        center={center}
        onClick={onClick}
        onLoad={onMapLoad}
      >
        <TransitLayer onLoad={onTransitLayerLoad} />
      </GoogleMap>
    </div>
  </div>
)

ExampleTransit.propTypes = ExampleTransitPropTypes

export default ExampleTransit
