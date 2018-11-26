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

import { StreetViewPanoramaPropTypes } from '../../proptypes'

const eventMap = {
  onCloseClick: 'closeclick',
  onPanoChanged: 'pano_changed',
  onPositionChanged: 'position_changed',
  onPovChanged: 'pov_changed',
  onResize: 'resize',
  onStatusChanged: 'status_changed',
  onVisibleChanged: 'visible_changed',
  onZoomChanged: 'zoom_changed',
}

const updaterMap = {
  register (instance, provider, options) {
    instance.registerPanoProvider(provider, options)
  },
  links (instance, links) {
    instance.setLinks(links)
  },
  motionTracking (instance, motionTracking) {
    instance.setMotionTracking(motionTracking)
  },
  options (instance, options) {
    instance.setOptions(options)
  },
  pano (instance, pano) {
    instance.setPano(pano)
  },
  position (instance, position) {
    instance.setPosition(position)
  },
  pov (instance, pov) {
    instance.setPov(pov)
  },
  visible (instance, visible) {
    instance.setVisible(visible)
  },
  zoom (instance, zoom) {
    instance.setZoom(zoom)
  },
}

export class StreetViewPanorama extends PureComponent {
  static propTypes = StreetViewPanoramaPropTypes

  static contextTypes = {
    [MAP]: PropTypes.object,
  }

  static childContextTypes = {
    [MAP]: PropTypes.object,
  }

  constructor (props, context) {
    super(props, context)

    invariant(
      !!context[MAP],
      `Did you render <StreetViewPanorama> as a child of <GoogleMap> with withGoogleMap() HOC?`
    )

    construct(
      StreetViewPanoramaPropTypes,
      updaterMap,
      props,
      context[MAP].getStreetView()
    )

    this.getLinks = this.getLinks.bind(this)
    this.getLocation = this.getLocation.bind(this)
    this.getMotionTracking = this.getMotionTracking.bind(this)
    this.getPano = this.getPano.bind(this)
    this.getPhotographerPov = this.getPhotographerPov.bind(this)
    this.getPosition = this.getPosition.bind(this)
    this.getPov = this.getPov.bind(this)
    this.getStatus = this.getStatus.bind(this)
    this.getVisible = this.getVisible.bind(this)
    this.getZoom = this.getZoom.bind(this)
  }

  getChildContext () {
    return {
      [MAP]: this.context[MAP].getStreetView(),
    }
  }

  componentDidMount () {
    componentDidMount(this, this.context[MAP].getStreetView(), eventMap)
  }

  componentDidUpdate (prevProps) {
    componentDidUpdate(this, this.context[MAP].getStreetView(), eventMap, updaterMap, prevProps)
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const streetViewPanorama = this.context[MAP].getStreetView()

    if (streetViewPanorama) {
      streetViewPanorama.setVisible(false)
    }
  }

  render () {
    return <div>{this.props.children}</div>
  }

  getLinks () {
    return this.context[MAP].getLinks()
  }

  getLocation () {
    return this.context[MAP].getLocation()
  }

  getMotionTracking () {
    return this.context[MAP].getMotionTracking()
  }

  getPano () {
    return this.context[MAP].getPano()
  }

  getPhotographerPov () {
    return this.context[MAP].getPhotographerPov()
  }

  getPosition () {
    return this.context[MAP].getPosition()
  }

  getPov () {
    return this.context[MAP].getPov()
  }

  getStatus () {
    return this.context[MAP].getStatus()
  }

  getVisible () {
    return this.context[MAP].getVisible()
  }

  getZoom () {
    return this.context[MAP].getZoom()
  }
}

export default StreetViewPanorama
