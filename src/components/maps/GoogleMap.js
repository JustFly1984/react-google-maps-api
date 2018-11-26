import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import invariant from 'invariant'

import {
  construct,
  getDerivedStateFromProps,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { MAP } from '../../constants'

import { GoogleMapPropTypes } from '../../proptypes'

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
  extraMapTypes (instance, extra) {
    extra.forEach(it => instance.mapTypes.set(...it))
  },
  center (instance, center) {
    instance.setCenter(center)
  },
  clickableIcons (instance, clickableIcons) {
    instance.setClickableIcons(clickableIcons)
  },
  heading (instance, heading) {
    instance.setHeading(heading)
  },
  mapTypeId (instance, mapTypeId) {
    instance.setMapTypeId(mapTypeId)
  },
  options (instance, options) {
    instance.setOptions(options)
  },
  streetView (instance, streetView) {
    instance.setStreetView(streetView)
  },
  tilt (instance, tilt) {
    instance.setTilt(tilt)
  },
  zoom (instance, zoom) {
    instance.setZoom(zoom)
  },
}

export class GoogleMap extends PureComponent {
  static propTypes = GoogleMapPropTypes

  static contextTypes = {
    [MAP]: PropTypes.object,
  }

  constructor (props, context) {
    super(props, context)

    invariant(!!context[MAP], 'id you wrap <GoogleMap> component with withGoogleMap() HOC?')

    this.state = {
      prevProps: construct(
        GoogleMapPropTypes,
        updaterMap,
        props,
        context[MAP]
      )
    }
  }

  static getDerivedStateFromProps (props, state) {
    return getDerivedStateFromProps(
      props,
      state,
      this.context[MAP],
      eventMap,
      updaterMap
    )
  }

  componentWillUnmount () {
    componentWillUnmount(this)
  }

  render () {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }

  fitBounds = (...args) =>
    this.context[MAP].fitBounds(...args)

  panBy = (...args) =>
    this.context[MAP].panBy(...args)

  panTo = (...args) =>
    this.context[MAP].panTo(...args)

  panToBounds = (...args) =>
    this.context[MAP].panToBounds(...args)

  getBounds = () =>
    this.context[MAP].getBounds()

  getCenter = () =>
    this.context[MAP].getCenter()

  getClickableIcons = () =>
    this.context[MAP].getClickableIcons()

  getDiv = () =>
    this.context[MAP].getDiv()

  getHeading = () =>
    this.context[MAP].getHeading()

  getMapTypeId = () =>
    this.context[MAP].getMapTypeId()

  getProjection = () =>
    this.context[MAP].getProjection()

  getStreetView = () =>
    this.context[MAP].getStreetView()

  getTilt = () =>
    this.context[MAP].getTilt()

  getZoom = () =>
    this.context[MAP].getZoom()
}

export default GoogleMap
