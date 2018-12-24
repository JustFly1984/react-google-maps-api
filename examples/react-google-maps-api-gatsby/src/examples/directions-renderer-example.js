import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer
} from 'react-google-maps-api'

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

const radioGroupStyle = {
  display: 'flex',
  flexDirection: 'row'
}

class DirectionsRendererExample extends Component {
  static propTypes = DirectionsRendererExamplePropTypes

  state = {
    response: null,
    travelMode: 'DRIVING',
    origin: '',
    destination: ''
  }

  directionsCallback = response => {
    console.log(response)

    if (response !== null) {
      if (response.status === 'OK') {
        this.setState(
          () => ({
            response
          })
        )
      } else {
        console.log('response: ', response)
      }
    }
  }

  checkDriving = ({ target: { checked } }) => {
    checked &&
      this.setState(
        () => ({
          travelMode: 'DRIVING'
        })
      )
  }

  checkBicycling = ({ target: { checked } }) => {
    checked &&
      this.setState(
        () => ({
          travelMode: 'BICYCLING'
        })
      )
  }

  checkTransit = ({ target: { checked } }) => {
    checked &&
      this.setState(
        () => ({
          travelMode: 'TRANSIT'
        })
      )
  }

  checkWalking = ({ target: { checked } }) => {
    checked &&
      this.setState(
        () => ({
          travelMode: 'WALKING'
        })
      )
  }

  getOrigin = ref => {
    this.origin = ref
  }

  getDestination = ref => {
    this.destination = ref
  }

  onClick = () => {
    if (this.origin.value !== '' && this.destination.value !== '') {
      this.setState(
        () => ({
          origin: this.origin.value,
          destination: this.destination.value
        })
      )
    }
  }

  render = () => (
    <div>
      <div>
        <div>
          <label htmlFor='ORIGIN'>Origin</label>
          <br />
          <input id='ORIGIN' type='text' ref={this.getOrigin} />
        </div>

        <div>
          <label htmlFor='DESTINATION'>Destination</label>
          <br />
          <input id='DESTINATION' type='text' ref={this.getDestination} />
        </div>

        <button type='button' onClick={this.onClick}>
          Build Route
        </button>
      </div>

      <div style={radioGroupStyle}>
        <div>
          <input
            id='DRIVING'
            name='travelMode'
            type='radio'
            checked={this.state.travelMode === 'DRIVING'}
            onChange={this.checkDriving}
          />
          <label htmlFor='DRIVING'>Driving</label>
        </div>

        <div>
          <input
            id='BICYCLING'
            name='travelMode'
            type='radio'
            checked={this.state.travelMode === 'BICYCLING'}
            onChange={this.checkBicycling}
          />
          <label htmlFor='BICYCLING'>Bicycling</label>
        </div>

        <div>
          <input
            id='TRANSIT'
            name='travelMode'
            type='radio'
            checked={this.state.travelMode === 'TRANSIT'}
            onChange={this.checkTransit}
          />
          <label htmlFor='TRANSIT'>Transit</label>
        </div>

        <div>
          <input
            id='WALKING'
            name='travelMode'
            type='radio'
            checked={this.state.travelMode === 'WALKING'}
            onChange={this.checkWalking}
          />
          <label htmlFor='WALKING'>Walking</label>
        </div>
      </div>

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
        {
          (
            this.state.destination !== '' &&
            this.state.origin !== ''
          ) && (
            <DirectionsService
              options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                destination: this.state.destination,
                origin: this.state.origin,
                travelMode: this.state.travelMode
              }}
              callback={this.directionsCallback}
            />
          )
        }

        {
          this.state.response !== null && (
            <DirectionsRenderer
              options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                directions: this.state.response
              }}
            />
          )
        }
      </GoogleMap>
    </div>
  )
}

export default DirectionsRendererExample
