/* global google */
/* eslint-disable filenames/match-exported */
import React from 'react'
import { compose, withProps, lifecycle } from 'recompose'

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps-api'

import { SearchBox } from 'react-google-maps-api/lib/components/places/SearchBox'

import { googleMapsApiKey } from '../const'

const MapWithASearchBox = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />
  }),
  lifecycle({
    componentDidMount () {
      const refs = {}

      // eslint-disable-next-line react-functional-set-state/no-this-state-props
      this.setState(() => ({
        bounds: null,
        center: {
          lat: 41.9, lng: -87.624
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref
        },
        onBoundsChanged: () => {
          this.setState(() => ({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter()
          }))
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces()
          const bounds = new google.maps.LatLngBounds()

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          })

          const nextMarkers = places.map(place => ({
            position: place.geometry.location
          }))

          const nextCenter = nextMarkers.length > 0
            ? nextMarkers[0].position
            : this.state.center

          this.setState(() => ({
            center: nextCenter,
            markers: nextMarkers
          }))
          // refs.map.fitBounds(bounds)
        }
      }))
    }
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type='text'
        placeholder='Customized your placeholder'
        style={{
          boxSizing: 'border-box',
          border: '1px solid transparent',
          width: '240px',
          height: '32px',
          marginTop: '27px',
          padding: '0 12px',
          borderRadius: '3px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
          fontSize: '14px',
          outline: 'none',
          textOverflow: 'ellipses',
        }}
      />
    </SearchBox>
    {props.markers.map((marker, index) =>
      <Marker key={index} position={marker.position} />
    )}
  </GoogleMap>
)

export default MapWithASearchBox
