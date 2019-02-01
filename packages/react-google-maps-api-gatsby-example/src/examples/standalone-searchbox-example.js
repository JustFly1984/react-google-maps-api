import React from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMap,
  StandaloneSearchBox
} from '@react-google-maps/api'

const StandaloneSearchboxExamplePropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
    mapContainer: PropTypes.string.isRequired
  }).isRequired
}

const center = {
  lat: 0,
  lng: -180
}

const inputStyle = {
  boxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `240px`,
  height: `32px`,
  padding: `0 12px`,
  borderRadius: `3px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
  position: 'absolute'
}

const StandaloneSearchboxExample = ({ styles }) => (
  <div>
    <GoogleMap
      id='standalone-searchbox-example'
      mapContainerStyle={styles.container}
      mapContainerClassName={styles.mapContainer}
      zoom={2}
      center={center}
      onClick={(...args) => { console.log('onClick args: ', args) }}
    >
      <StandaloneSearchBox>
        <input
          type='text'
          placeholder='Customized your placeholder'
          style={inputStyle}
        />
      </StandaloneSearchBox>
    </GoogleMap>
  </div>
)

StandaloneSearchboxExample.propTypes = StandaloneSearchboxExamplePropTypes

export default StandaloneSearchboxExample
