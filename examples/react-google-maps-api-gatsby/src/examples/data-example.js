import React from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMap
} from 'react-google-maps-api'

// import { Data } from '../../../../src/'

// import { json } from './multipolygon-json'
const json = { js: 'js' }
console.log('json: ', json)

const DataExamplePropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
    mapContainer: PropTypes.string.isRequired
  }).isRequired
}

const center = {
  lat: 0,
  lng: -180
}

const DataExample = ({ styles }) => (
  <div>
    <GoogleMap
      id='data-example'
      mapContainerStyle={styles.container}
      mapContainerClassName={styles.mapContainer}

      zoom={2}
      center={center}
      onClick={(...args) => {
        console.log('onClick args: ', args)
      }}
      onLoad={(map) => {
        console.log('map.data: ', map.data)
        map.data.loadGeoJson('/geo.json')
      }}
    >
      <></>
    </GoogleMap>
  </div>
)

DataExample.propTypes = DataExamplePropTypes

export default DataExample
