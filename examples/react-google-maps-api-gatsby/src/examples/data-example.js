import React from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMap
} from 'react-google-maps-api'

const DataExamplePropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
    mapContainer: PropTypes.string.isRequired
  }).isRequired
}

const center = {
  lat: 38.805470223177466,
  lng: -118.76220703125
}

const DataExample = ({ styles }) => (
  <div>
    <GoogleMap
      id='data-example'
      mapContainerStyle={styles.container}
      mapContainerClassName={styles.mapContainer}

      zoom={5}
      center={center}
      onClick={(...args) => {
        console.log('onClick args: ', args[0].latLng.lat(), ' : ', args[0].latLng.lng())
      }}
      onLoad={(map) => {
        console.log('map.data: ', map.data)
        map.data.loadGeoJson('/geo.json')
      }}
    />
  </div>
)

DataExample.propTypes = DataExamplePropTypes

export default DataExample
