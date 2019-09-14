import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api'

const ExampleDirectionsPropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
  }).isRequired,
}

const center = {
  lat: 0,
  lng: -180,
}

class ExampleDirections extends Component {
  static propTypes = ExampleDirectionsPropTypes

  state = {
    response: null,
    travelMode: 'DRIVING',
    origin: '',
    destination: '',
  }

  directionsCallback = response => {
    console.log(response)

    if (response !== null) {
      if (response.status === 'OK') {
        this.setState(() => ({
          response,
        }))
      } else {
        console.log('response: ', response)
      }
    }
  }

  checkDriving = ({ target: { checked } }) => {
    checked &&
      this.setState(() => ({
        travelMode: 'DRIVING',
      }))
  }

  checkBicycling = ({ target: { checked } }) => {
    checked &&
      this.setState(() => ({
        travelMode: 'BICYCLING',
      }))
  }

  checkTransit = ({ target: { checked } }) => {
    checked &&
      this.setState(() => ({
        travelMode: 'TRANSIT',
      }))
  }

  checkWalking = ({ target: { checked } }) => {
    checked &&
      this.setState(() => ({
        travelMode: 'WALKING',
      }))
  }

  getOrigin = ref => {
    this.origin = ref
  }

  getDestination = ref => {
    this.destination = ref
  }

  onClick = () => {
    if (this.origin.value !== '' && this.destination.value !== '') {
      this.setState(() => ({
        origin: this.origin.value,
        destination: this.destination.value,
      }))
    }
  }

  onMapClick = (...args) => {
    console.log('onClick args: ', args)
  }

  render = () => (
    <div className='map'>
      <div className='map-settings'>
        <hr className='mt-0 mb-3' />

        <div className='row'>
          <div className='col-md-6 col-lg-4'>
            <div className='form-group'>
              <label htmlFor='ORIGIN'>Origin</label>
              <br />
              <input
                id='ORIGIN'
                className='form-control'
                type='text'
                ref={this.getOrigin}
              />
            </div>
          </div>

          <div className='col-md-6 col-lg-4'>
            <div className='form-group'>
              <label htmlFor='DESTINATION'>Destination</label>
              <br />
              <input
                id='DESTINATION'
                className='form-control'
                type='text'
                ref={this.getDestination}
              />
            </div>
          </div>
        </div>

        <div className='d-flex flex-wrap'>
          <div className='form-group custom-control custom-radio mr-4'>
            <input
              id='DRIVING'
              className='custom-control-input'
              name='travelMode'
              type='radio'
              checked={this.state.travelMode === 'DRIVING'}
              onChange={this.checkDriving}
            />
            <label className='custom-control-label' htmlFor='DRIVING'>
              Driving
            </label>
          </div>

          <div className='form-group custom-control custom-radio mr-4'>
            <input
              id='BICYCLING'
              className='custom-control-input'
              name='travelMode'
              type='radio'
              checked={this.state.travelMode === 'BICYCLING'}
              onChange={this.checkBicycling}
            />
            <label className='custom-control-label' htmlFor='BICYCLING'>
              Bicycling
            </label>
          </div>

          <div className='form-group custom-control custom-radio mr-4'>
            <input
              id='TRANSIT'
              className='custom-control-input'
              name='travelMode'
              type='radio'
              checked={this.state.travelMode === 'TRANSIT'}
              onChange={this.checkTransit}
            />
            <label className='custom-control-label' htmlFor='TRANSIT'>
              Transit
            </label>
          </div>

          <div className='form-group custom-control custom-radio mr-4'>
            <input
              id='WALKING'
              className='custom-control-input'
              name='travelMode'
              type='radio'
              checked={this.state.travelMode === 'WALKING'}
              onChange={this.checkWalking}
            />
            <label className='custom-control-label' htmlFor='WALKING'>
              Walking
            </label>
          </div>
        </div>

        <button
          className='btn btn-primary'
          type='button'
          onClick={this.onClick}
        >
          Build Route
        </button>
      </div>

      <div className='map-container'>
        <GoogleMap
          id='direction-example'
          mapContainerStyle={this.props.styles.container}
          zoom={2}
          center={center}
          onClick={this.onMapClick}
        >
          {this.state.destination !== '' && this.state.origin !== '' && (
            <DirectionsService
              // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
              options={{
                destination: this.state.destination,
                origin: this.state.origin,
                travelMode: this.state.travelMode,
              }}
              callback={this.directionsCallback}
            />
          )}

          {this.state.response !== null && (
            <DirectionsRenderer
              // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
              options={{
                directions: this.state.response,
              }}
            />
          )}
        </GoogleMap>
      </div>
    </div>
  )
}

export default ExampleDirections
