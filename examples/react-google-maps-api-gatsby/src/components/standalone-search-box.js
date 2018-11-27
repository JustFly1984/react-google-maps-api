/* eslint-disable camelcase */
// eslint-disable-next-line filenames/match-exported
import React from 'react'
import { compose, withProps, lifecycle } from 'recompose'
import { withScriptjs } from 'react-google-maps-api'
import { StandaloneSearchBox } from 'react-google-maps-api/lib/components/places/StandaloneSearchBox'

import { googleMapsApiKey } from '../const'

const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />
  }),
  lifecycle({
    componentDidMount () {
      const refs = {}

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces()

          this.setState({
            places
          })
        }
      })
    }
  }),
  withScriptjs
)(props =>
  <div data-standalone-searchbox=''>
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
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
          padding: '0 12px',
          borderRadius: '3px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
          fontSize: '14px',
          outline: 'none',
          textOverflow: 'ellipses'
        }}
      />
    </StandaloneSearchBox>

    <ol>
      {props.places.map(({ place_id, formatted_address, geometry: { location } }) =>
        <li key={place_id}>
          {formatted_address}
          {' at '}
          ({location.lat()}, {location.lng()})
        </li>
      )}
    </ol>
  </div>
)

export default PlacesWithStandaloneSearchBox
