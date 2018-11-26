import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import invariant from 'invariant'

import {
  construct,
  componentDidMount,
  componentDidUpdate,
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

    invariant(!!context[MAP], `Did you wrap <GoogleMap> component with withGoogleMap() HOC?`)

    construct(
      GoogleMapPropTypes,
      updaterMap,
      props,
      context[MAP]
    )

    this.fitBounds = this.fitBounds.bind(this)
    this.getBounds = this.getBounds.bind(this)
    this.getCenter = this.getCenter.bind(this)
    this.getClickableIcons = this.getClickableIcons.bind(this)
    this.getDiv = this.getDiv.bind(this)
    this.getHeading = this.getHeading.bind(this)
    this.getMapTypeId = this.getMapTypeId.bind(this)
    this.getProjection = this.getProjection.bind(this)
    this.getStreetView = this.getStreetView.bind(this)
    this.getTilt = this.getTilt.bind(this)
    this.getZoom = this.getZoom.bind(this)
    this.panBy = this.panBy.bind(this)
    this.panTo = this.panTo.bind(this)
    this.panToBounds = this.panToBounds.bind(this)
  }

  componentDidMount () {
    componentDidMount(this, this.context[MAP], eventMap)
  }

  componentDidUpdate (prevProps) {
    componentDidUpdate(this, this.context[MAP], eventMap, updaterMap, prevProps)
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

  fitBounds (...args) {
    return this.context[MAP].fitBounds(...args)
  }

  panBy (...args) {
    return this.context[MAP].panBy(...args)
  }

  panTo (...args) {
    return this.context[MAP].panTo(...args)
  }

  panToBounds (...args) {
    return this.context[MAP].panToBounds(...args)
  }

  getBounds () {
    return this.context[MAP].getBounds()
  }

  getCenter () {
    return this.context[MAP].getCenter()
  }

  getClickableIcons () {
    return this.context[MAP].getClickableIcons()
  }

  getDiv () {
    return this.context[MAP].getDiv()
  }

  getHeading () {
    return this.context[MAP].getHeading()
  }

  getMapTypeId () {
    return this.context[MAP].getMapTypeId()
  }

  getProjection () {
    return this.context[MAP].getProjection()
  }

  getStreetView () {
    return this.context[MAP].getStreetView()
  }

  getTilt () {
    return this.context[MAP].getTilt()
  }

  getZoom () {
    return this.context[MAP].getZoom()
  }
}

export default GoogleMap
