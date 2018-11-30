/* global google */
/* eslint-disable filenames/match-regex */
import React, { PureComponent, Children, cloneElement } from 'react'
import invariant from 'invariant'
import MapContext from '../../mapcontext'
import { GoogleMapPropTypes } from '../../proptypes'
import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/MapChildHelper'


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
  onZoomChanged: 'zoom_changed',
}

const updaterMap = {
  extraMapTypes(map, extra) {
    extra.forEach(it => {
      map.mapTypes.set(...it)
    })
  },
  center(map, center) {
    map.setCenter(center)
  },
  clickableIcons(map, icons) {
    map.setClickableIcons(...icons)
  },
  heading(map, heading) {
    map.setHeading(heading)
  },
  mapTypeId(map, mapTypeId) {
    map.setMapTypeId(mapTypeId)
  },
  options(map, options) {
    map.setOptions(options)
  },
  streetView(map, streetView) {
    map.setStreetView(streetView)
  },
  tilt(map, tile) {
    map.setTilt(tile)
  },
  zoom(map, zoom) {
    map.setZoom(zoom)
  }
}

export class GoogleMap extends PureComponent {
  static propTypes = GoogleMapPropTypes

  static contextType = MapContext

  registeredEvents = []

  componentDidMount = () => {
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: this.context
    })
  }

  componentDidUpdate = (prevProps) => {
    unregisterEvents(this.registeredEvents)
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.context
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)
  }

  render = () => this.props.children || null

  fitBounds = (...args) =>
    this.props.map.fitBounds(...args)

  panBy = (...args) =>
    this.props.map.panBy(...args)

  panTo = (...args) =>
    this.props.map.panTo(...args)

  panToBounds = (...args) =>
    this.props.map.panToBounds(...args)

  getBounds = () =>
    this.props.map.getBounds()

  getCenter = () =>
    this.props.map.getCenter()

  getClickableIcons = () =>
    this.props.map.getClickableIcons()

  getDiv = () =>
    this.props.map.getDiv()

  getHeading = () =>
    this.props.map.getHeading()

  getMapTypeId = () =>
    this.props.map.getMapTypeId()

  getProjection = () =>
    this.props.map.getProjection()

  getStreetView = () =>
    this.props.map.getStreetView()

  getTilt = () =>
    this.props.map.getTilt()

  getZoom = () =>
    this.props.map.getZoom()
}

export default GoogleMap
