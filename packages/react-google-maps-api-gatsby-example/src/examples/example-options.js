import React from 'react'
import PropTypes from 'prop-types'
import { GoogleMap } from '@react-google-maps/api'

const ExampleOptionsPropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
  }).isRequired,
}

const center = {
  lat: 0,
  lng: -180,
}

// Reference for options:
// https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions

const options = {
  streetViewControl: false,
}

const onClick = (...args) => {
  console.log('onClick args: ', args)
}

const ExampleOptions = ({ styles }) => (
  <div className='map'>
    <div className='map-container'>
      <GoogleMap
        id='options-example'
        mapContainerStyle={styles.container}
        zoom={2}
        center={center}
        options={options}
        onClick={onClick}
      />
    </div>
  </div>
)

ExampleOptions.propTypes = ExampleOptionsPropTypes

export default ExampleOptions
