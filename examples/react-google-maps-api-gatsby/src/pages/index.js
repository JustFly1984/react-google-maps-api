/* global google */
// eslint-disable-next-line filenames/match-exported
import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import Layout from '../components/layout'
import indexStyles from './index.module.css'

import {
  LoadScript,
  GoogleMapProvider,
  GoogleMap,
  TrafficLayer,
  BicyclingLayer,
  // Circle,
  // Marker
  // Polyline,
  // Polygon,
  // Rectangle,
  // InfoWindow,
  // OverlayView,
  GroundOverlay
  // DirectionsRenderer,
  // FusionTablesLayer,
  // KmlLayer,

  // StreetViewPanorama,
  // compose
} from 'react-google-maps-api'

// import MapWithASearchBox from '../components/search-box'
// import PlacesWithStandaloneSearchBox from '../components/standalone-search-box'

// Past your GoogleMaps API key here
// You can obtain the API key here:
// https://developers.google.com/maps/documentation/javascript/get-api-key
import { googleMapsApiKey } from '../const'

const style = {
  maxWidth: '300px',
  marginBottom: '1.45rem'
}

const defaultCenter = {
  lat: -34.397,
  lng: 150.644
}

// const position = {
//   lat: -34.397,
//   lng: 150.644
// }

const loadingStyle = {
  height: `100%`,
  backgroundColor: '#023456'
}

const mapContainerStyle = {
  height: `400px`,
  width: `800px`
}

const Loading = (
  <div
    style={loadingStyle}
  />
)

const IndexPage = () => (
  <Layout>
    <h1>Hello People!</h1>
    <p>Welcome to React Google Maps Light Example.</p>

    <LoadScript
      googleMapsApiKey={googleMapsApiKey}
      language={'en'}
      region={'EN'}
      version={'weekly'}
      onLoad={() => (
        console.log('script loaded')
      )}
      render={({ loaded }) => (
        loaded && (
          <Fragment>
            <div style={style}>
              <GoogleMapProvider
                id='first'
                loaded={loaded}
                loadingElement={Loading}
                render={({ map, mapRef }) => (
                  <GoogleMap
                    map={map}
                    mapRef={mapRef}
                    loaded={loaded}
                    defaultZoom={8}
                    defaultCenter={defaultCenter}
                    mapContainerStyle={mapContainerStyle}
                    mapContainerClassName={indexStyles.mapContainer}
                    onClick={(...args) => {
                      console.log('onClick args: ', args)
                    }}
                  />
                )}
              />
            </div>

            <div style={style}>
              <GoogleMapProvider
                id='second'
                loaded={loaded}
                loadingElement={Loading}
                render={({ map, mapRef }) => (
                  <Fragment>
                    <GoogleMap
                      map={map}
                      mapRef={mapRef}
                      loaded={loaded}
                      defaultZoom={8}
                      defaultCenter={defaultCenter}
                      mapContainerStyle={mapContainerStyle}
                      mapContainerClassName={indexStyles.mapContainer}
                      onClick={(...args) => {
                        console.log('onClick args: ', args)
                      }}
                    >
                      <TrafficLayer />

                      {
                        (map && loaded) && (
                          <BicyclingLayer />
                        )
                      }

                      {
                        (map && loaded) && (
                          <GroundOverlay
                            url='https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg'
                            bounds={new google.maps.LatLngBounds(
                              new google.maps.LatLng(40.712216, -74.22655),
                              new google.maps.LatLng(40.773941, -74.12544)
                            )}
                            options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                              map,
                              clickable: true,
                              opacity: 0.5
                            }}
                          />
                        )
                      }
                    </GoogleMap>
                  </Fragment>
                )}
              />
            </div>
          </Fragment>
        )
      )}
    />
  </Layout>
)

export default IndexPage
