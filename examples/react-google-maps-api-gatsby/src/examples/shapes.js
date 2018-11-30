/* eslint-disable filenames/match-exported */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMapProvider,
  GoogleMap,
  Polyline,
  Polygon,
  Rectangle,
  Circle
} from '../../../../src'

const FLIGHT_PLAN_COORDS = [
  { lat: 37.772, lng: -122.214 },
  { lat: 21.291, lng: -157.821 },
  { lat: -18.142, lng: 178.431 },
  { lat: -27.467, lng: 153.027 }
]

const BRISBANE_COORDS = [
  { lat: -27.467, lng: 153.027 },
  { lat: -23.467, lng: 152.027 },
  { lat: -28.567, lng: 149.627 },
  { lat: -27.467, lng: 153.027 }
]

const SAN_FRANCISCO_COORDS = [
  { lat: 37.772, lng: -122.214 },
  { lat: 39.772, lng: -121.214 },
  { lat: 35.772, lng: -120.214 },
  { lat: 37.772, lng: -122.214 }
]

const RECTANGLE_BOUNDS = {
  north: 38.685,
  south: 33.671,
  east: -115.234,
  west: -118.251
}

const POLYLINE_OPTIONS = {
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2
}

const ShapesExamplePropTypes = {
  styles: PropTypes.object.isRequired,
  loadingElement: PropTypes.node.isRequired
}

const mapCenter = {
  lat: 0,
  lng: -180
}

const brisbonPolygonOptions = {
  fillColor: '#00FF00',
  fillOpacity: 1,
  strokeColor: '#22FF22',
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  paths: BRISBANE_COORDS,
  zIndex: 1
}

const sfPolygonOptions = {
  fillColor: '#FF5500',
  fillOpacity: 1,
  strokeColor: '#FF7700',
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  paths: SAN_FRANCISCO_COORDS,
  zIndex: 1
}

const circleOptions = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  center: {
    lat: 34.052,
    lng: -118.243
  },
  radius: 300000,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  zIndex: 1
}

const textareaStyle = {
  minHeight: '6rem',
  maxHeight: '12rem',
  marginTop: '2rem',
  marginBottom: '2rem',
  width: '40rem',
  minWidth: '40rem',
  maxWidth: '40rem'
}
export default class ShapesExample extends Component {
  static propTypes = ShapesExamplePropTypes

  constructor (props) {
    super(props)

    this.state = {
      polylineVisible: true,
      polylineOptions: JSON.stringify(POLYLINE_OPTIONS)
    }
  }

  onCheckboxChange = () => {
    this.setState(
      prevState => ({
        polylineVisible: !prevState.polylineVisible
      })
    )
  }

  onTextAreaCange = ({ targer: { value } }) => {
    this.setState(
      () => ({
        polylineOptions: value
      })
    )
  }

  render = () => {
    let polylineOptions

    try {
      polylineOptions = JSON.parse(this.state.polylineOptions)
    } catch (e) {
      polylineOptions = POLYLINE_OPTIONS
    }

    return (
      <div>
        <div>
          <input
            id='show-polyline-checkbox'
            type='checkbox'
            checked={this.state.polylineVisible}
            onChange={this.onCheckboxChange}
          />

          <label htmlFor='show-polyline-checkbox'>
            Show flight path
          </label>
        </div>

        <br />

        <div>
          <label htmlFor='polyline-options-input'>
            Polyline options (will persist once valid JSON):
          </label>

          <br />

          <textarea
            id='polyline-options-input'
            type='text'
            style={textareaStyle}
            value={this.state.polylineOptions}
            onChange={this.onTextAreaCange}
          />
        </div>

        <GoogleMapProvider
          id='shapes-example'
          loadingElement={this.props.loadingElement}
        >
          <GoogleMap
            zoom={2}
            center={mapCenter}
            mapContainerStyle={this.props.styles.container}
            mapContainerClassName={this.props.styles.mapContainer}
          >
            {
              this.state.polylineVisible && (
                <Polyline
                  path={FLIGHT_PLAN_COORDS}
                  options={polylineOptions}
                />
              )
            }

            <Polygon
              options={brisbonPolygonOptions}
            />

            <Polygon
              options={sfPolygonOptions}
            />

            <Rectangle
              bounds={RECTANGLE_BOUNDS}
            />

            <Circle
              options={circleOptions}
            />
          </GoogleMap>
        </GoogleMapProvider>
      </div>

    )
  }
}
