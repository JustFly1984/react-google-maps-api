// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/layout'

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  // Circle,
  Marker
  // Polyline,
  // Polygon,
  // Rectangle,
  // InfoWindow,
  // OverlayView,
  // GroundOverlay,
  // DirectionsRenderer,
  // FusionTablesLayer,
  // KmlLayer,
  // TrafficLayer,
  // StreetViewPanorama,
  // BicyclingLayer,
  // compose
} from 'react-google-maps-api'
// Past your GoogleMaps API key here
// You can obtain the API key here:
// https://developers.google.com/maps/documentation/javascript/get-api-key
const googleMapsApiKey = 'AIzaSyBVco9uGWY5IvgU6wK571iRu1G9eJkn4PQ'

const style = {
  maxWidth: '300px',
  marginBottom: '1.45rem'
}

const defaultCenter = {
  lat: -34.397,
  lng: 150.644
}

const position = {
  lat: -34.397,
  lng: 150.644
}

const h100 = {
  height: `100%`
}

const h400 = {
  height: `400px`
}

const Loading = (
  <div
    style={h100}
  />
)

const Container = (
  <div
    style={h400}
  />
)

const MapElement = (
  <div
    style={h100}
  />
)

const MapComponent = ({ isMarkerShown }) => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={defaultCenter}
  >
    {
      isMarkerShown && (
        <Marker
          position={position}
        />
      )
    }
  </GoogleMap>
)

MapComponent.propTypes = {
  isMarkerShown: PropTypes.bool.isRequired
}

const EnhancedMap = withScriptjs(withGoogleMap(MapComponent))

const IndexPage = () => (
  <Layout>
    <h1>Hello People!</h1>
    <p>Welcome to React Google Maps Light Example.</p>

    <div style={style}>
      <EnhancedMap
        isMarkerShown
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=weekly&key=${googleMapsApiKey}&language=en&region=EN`} // &callback=initMap
        loadingElement={Loading}
        containerElement={Container}
        mapElement={MapElement}
      />
    </div>
  </Layout>
)

export default IndexPage
