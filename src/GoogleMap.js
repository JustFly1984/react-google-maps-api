/* global google */
import React, { PureComponent } from 'react'
import { GoogleMapPropTypes } from './proptypes'
import MapContext from './mapcontext'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from './utils/MapChildHelper'

const eventMap = {
  onDblClick: 'dblclick',
  onDragEnd: 'dragend',
  onDragStart: 'dragstart',
  onMapTypeIdChanged: 'maptypeid_changed',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onRightClick: 'rightclick',
  onTilesLoaded: 'tilesloaded',
  onBoundsChanged: 'bounds_changed',
  onCenterChanged: 'center_changed',
  onClick: 'click',
  onDrag: 'drag',
  onHeadingChanged: 'heading_changed',
  onIdle: 'idle',
  onProjectionChanged: 'projection_changed',
  onResize: 'resize',
  onTiltChanged: 'tilt_changed',
  onZoomChanged: 'zoom_changed'
}

const updaterMap = {
  extraMapTypes (map, extra) {
    extra.forEach(it => {
      map.mapTypes.set(...it)
    })
  },
  center (map, center) {
    map.setCenter(center)
  },
  clickableIcons (map, icons) {
    map.setClickableIcons(...icons)
  },
  heading (map, heading) {
    map.setHeading(heading)
  },
  mapTypeId (map, mapTypeId) {
    map.setMapTypeId(mapTypeId)
  },
  options (map, options) {
    map.setOptions(options)
  },
  streetView (map, streetView) {
    map.setStreetView(streetView)
  },
  tilt (map, tilt) {
    map.setTilt(tilt)
  },
  zoom (map, zoom) {
    map.setZoom(zoom)
  }
}

export class GoogleMap extends PureComponent {
  static propTypes = GoogleMapPropTypes

  state = {
    map: null
  }

  registeredEvents = []

  componentDidMount = () => {
    this.setState(
      () => ({
        map: new google.maps.Map(this.mapRef)
      }),
      () => {
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap,
          eventMap,
          prevProps: {},
          nextProps: this.props,
          instance: this.state.map
        })
      }
    )
  }

  componentDidUpdate = prevProps => {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.map
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)
  }

  getRef = ref => {
    this.mapRef = ref
  }

  render = () => (
    <div
      ref={this.getRef}
      style={this.props.mapContainerStyle}
      className={this.props.mapContainerClassName}
    >
      <MapContext.Provider
        value={this.state.map}
      >
        {
          this.state.map
            ? this.props.children
            : null
        }
      </MapContext.Provider>
    </div>
  )

  fitBounds = (...args) => this.state.map.fitBounds(...args)

  panBy = (...args) => this.state.map.panBy(...args)

  panTo = (...args) => this.state.map.panTo(...args)

  panToBounds = (...args) => this.state.map.panToBounds(...args)

  getBounds = () => this.state.map.getBounds()

  getCenter = () => this.state.map.getCenter()

  getClickableIcons = () => this.state.map.getClickableIcons()

  getDiv = () => this.state.map.getDiv()

  getHeading = () => this.state.map.getHeading()

  getMapTypeId = () => this.state.map.getMapTypeId()

  getProjection = () => this.state.map.getProjection()

  getStreetView = () => this.state.map.getStreetView()

  getTilt = () => this.state.map.getTilt()

  getZoom = () => this.state.map.getZoom()
}

export default GoogleMap
