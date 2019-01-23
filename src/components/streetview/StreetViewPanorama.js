import React, { PureComponent } from 'react'
import invariant from 'invariant'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/helper'

import MapContext from '../../map-context'

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
  }
}

export class StreetViewPanorama extends PureComponent {
  static propTypes = StreetViewPanoramaPropTypes

  static contextType = MapContext

  constructor (props, context) {
    super(props, context)

    invariant(
      this.context,
      'Did you render <StreetViewPanorama> as a child of <GoogleMapProvider>?'
    )

    this.state = {
      streetViewPanorama: context.getStreetView()
    }

    this.registerEvents = []
  }

  componentDidMount () {
    this.state.streetViewPanorama.setVisible(true)
  }

  componentDidUpdate (prevProps) {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.streetViewPanorama
    })
  }

  componentWillUnmount () {
    unregisterEvents(this.registeredEvents)

    if (this.state.streetViewPanorama) {
      this.state.streetViewPanorama.setVisible(false)
    }
  }

  render () {
    return (
      <>
        { this.props.children }
      </>
    )
  }

  getLinks () {
    return this.state.streetViewPanorama.getLinks()
  }

  getLocation () {
    return this.state.streetViewPanorama.getLocation()
  }

  getMotionTracking () {
    return this.state.streetViewPanorama.getMotionTracking()
  }

  getPano () {
    return this.state.streetViewPanorama.getPano()
  }

  getPhotographerPov () {
    return this.state.streetViewPanorama.getPhotographerPov()
  }

  getPosition () {
    return this.state.streetViewPanorama.getPosition()
  }

  getPov () {
    return this.state.streetViewPanorama.getPov()
  }

  getStatus () {
    return this.state.streetViewPanorama.getStatus()
  }

  getVisible () {
    return this.state.streetViewPanorama.getVisible()
  }

  getZoom () {
    return this.state.streetViewPanorama.getZoom()
  }
}

export default StreetViewPanorama
