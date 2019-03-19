import React from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMap,
  Data
} from '@react-google-maps/api'

const ExampleDataPropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired
  }).isRequired
}

const center = {
  lat: 38.805470223177466,
  lng: -118.76220703125
}

const onClick = (...args) => {
  console.log('onClick args: ', args[0].latLng.lat(), ' : ', args[0].latLng.lng())
}

const onMapLoad = (map) => {
  console.log('map.data: ', map.data)
  map.data.loadGeoJson('/geo.json')
}

const onDataLoad = data => {
  console.log('data: ', data)
}

const ExampleData = ({ styles }) => (
  <div className='map'>
    <div className='map-container'>
      <GoogleMap
        id='data-example'
        mapContainerStyle={styles.container}
        zoom={5}
        center={center}
        onClick={onClick}
        onLoad={onMapLoad}
      >
        <Data
          onLoad={onDataLoad}
        />
      </GoogleMap>
    </div>
  </div>
)

ExampleData.propTypes = ExampleDataPropTypes

export default ExampleData
