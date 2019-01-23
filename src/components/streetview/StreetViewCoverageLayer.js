/* global google */
import React, { PureComponent } from 'react'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/helper'

import MapContext from '../../map-context'

const eventMap = {}

const updaterMap = {
  map (instance, map) {
    instance.setMap(map)
  },
}

const StreetViewCoverageLayerPropTypes = {}

export class StreetViewCoverageLayer extends PureComponent {
  static propTypes = StreetViewCoverageLayerPropTypes

  static contextType = MapContext

  constructor (props, context) {
    super(props, context)

    this.state = {
      streetViewCoverageLayer: new google.maps.StreetViewCoverageLayer()
    }

    this.registerEvents = []
  }

  componentDidMount () {
    this.state.streetViewCoverageLayer.setMap(this.context)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: this.state.streetViewCoverageLayer
    })
  }

  componentDidUpdate (prevProps) {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.streetViewCoverageLayer
    })
  }

  componentWillUnmount () {
    unregisterEvents(this.registeredEvents)

    if (this.state.streetViewCoverageLayer) {
      this.state.streetViewCoverageLayer.setMap(null)
    }
  }

  render () {
    return <></>
  }

  getMap () {
    this.state.streetViewCoverageLayer.getMap()
  }
}

export default StreetViewCoverageLayer
