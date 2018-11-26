import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import invariant from 'invariant'

import {
  construct,
  getDerivedStateFromProps,
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
      'Did you render <StreetViewPanorama> as a child of <GoogleMap> with withGoogleMap() HOC?'
    )

    this.state = {
      context,
      prevProps: construct(
        StreetViewPanoramaPropTypes,
        updaterMap,
        props,
        context[MAP].getStreetView()
      )
    }
  }

  static getDerivedStateFromProps (props, state) {
    return getDerivedStateFromProps(
      props,
      state,
      state.context[MAP].getStreetView(),
      eventMap,
      updaterMap
    )
  }

  getChildContext = () => {
    return {
      [MAP]: this.context[MAP].getStreetView(),
    }
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

  getLinks = () =>
    this.context[MAP].getLinks()

  getLocation = () =>
    this.context[MAP].getLocation()

  getMotionTracking = () =>
    this.context[MAP].getMotionTracking()

  getPano = () =>
    this.context[MAP].getPano()

  getPhotographerPov = () =>
    this.context[MAP].getPhotographerPov()

  getPosition = () =>
    this.context[MAP].getPosition()

  getPov = () =>
    this.context[MAP].getPov()

  getStatus = () =>
    this.context[MAP].getStatus()

  getVisible = () =>
    this.context[MAP].getVisible()

  getZoom = () =>
    this.context[MAP].getZoom()
}

export default StreetViewPanorama
