import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer
} from '../../../../src'

const DirectionsRendererExamplePropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
    mapContainer: PropTypes.string.isRequired
  }).isRequired
}

const center = {
  lat: 0,
  lng: -180
}

// const BOUNDS = [{
//   x: 38.685,
//   y: 33.671
// }, {
//   x: -115.234,
//   y: -118.251
// }]

const options = {
  destination: 'Moscow Bashilovskaya 1',
  origin: 'Moscow Letnikovskaya 17',
  travelMode: 'DRIVING'
}

class DirectionsRendererExample extends Component {
  static propTypes = DirectionsRendererExamplePropTypes

  directionsCallback = (response) => {
    console.log(response)
  }

  render = () => (
    <div>
      <GoogleMap
        id='direction-renderer-example'
        mapContainerStyle={this.props.styles.container}
        mapContainerClassName={this.props.styles.mapContainer}
        zoom={2}
        center={center}
        onClick={(...args) => {
          console.log('onClick args: ', args)
        }}
      >
        <DirectionsService
          options={options}
          callback={this.directionsCallback}
        />

        <DirectionsRenderer

        />
      </GoogleMap>
    </div>
  )
}

export default DirectionsRendererExample
