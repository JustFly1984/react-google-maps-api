import React from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, StandaloneSearchBox } from '@react-google-maps/api'

const ExampleSearchboxPropTypes = {
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

const ExampleSearchbox = ({ styles }) => (
  <div className='map'>
    <div className='map-container'>
      <GoogleMap
        id='searchbox-example'
        mapContainerStyle={styles.container}
        zoom={2}
        center={center}
        onClick={onClick}
      >
        <StandaloneSearchBox>
          <input
            type='text'
            placeholder='Customized your placeholder'
            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
            style={{
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
              position: 'absolute',
              top: '10px',
              right: '10px',
            }}
          />
        </StandaloneSearchBox>
      </GoogleMap>
    </div>
  </div>
)

ExampleSearchbox.propTypes = ExampleSearchboxPropTypes

export default ExampleSearchbox
