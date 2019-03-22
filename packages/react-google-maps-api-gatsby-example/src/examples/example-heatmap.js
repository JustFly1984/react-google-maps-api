import React from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMap,
  HeatmapLayer
} from '@react-google-maps/api'

const ExampleHeatmapPropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired
  }).isRequired
}

const center = {
  lat: 40.75,
  lng: -74
}

const onClick = (...args) => {
  console.log('onClick args: ', args)
}

const ExampleHeatmap = ({ styles }) => (
  <div className='map'>
    <div className='map-container'>
      <GoogleMap
        id='heatmap-example'
        mapContainerStyle={styles.container}
        zoom={10}
        center={center}
        onClick={onClick}
      >
        <HeatmapLayer />
      </GoogleMap>
    </div>
  </div>
)

ExampleHeatmap.propTypes = ExampleHeatmapPropTypes

export default ExampleHeatmap
