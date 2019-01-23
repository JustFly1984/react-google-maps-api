/* global google */
import React, { PureComponent } from 'react'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/helper'

import MapContext from '../../map-context'

import { DirectionsRendererPropTypes } from '../../proptypes'

const eventMap = {
  onDirectionsChanged: 'directions_changed',
}

const updaterMap = {
  directions (instance, directions) {
    instance.setDirections(directions)
  },
  map (instance, map) {
    instance.setMap(map)
  },
  options (instance, options) {
    instance.setOptions(options)
  },
  panel (instance, panel) {
    instance.setPanel(panel)
  },
  routeIndex (instance, routeIndex) {
    instance.setRouteIndex(routeIndex)
  },
}

export class DirectionsRenderer extends PureComponent {
  static propTypes = DirectionsRendererPropTypes

  static contextType = MapContext

  constructor (props, context) {
    super(props, context)

    this.state = {
      directionsRenderer: new google.maps.DirectionsRenderer(
        Object.assign(
          {
            map: context
          },
          props.options
        )
      )
    }

    this.registeredEvents = []
  }

  componentDidMount () {
    this.state.directionsRenderer.setMap(this.context)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: this.state.directionsRenderer
    })
  }

  componentDidUpdate (prevProps) {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.directionsRenderer
    })
  }

  componentWillUnmount () {
    unregisterEvents(this.registeredEvents)

    if (this.state.directionsRenderer) {
      this.state.directionsRenderer.setMap(null)
    }
  }

  render () {
    return <></>
  }

  getDirections () {
    return this.state.directionsRenderer.getDirections()
  }

  getMap () {
    return this.state.directionsRenderer.getMap()
  }

  getPanel () {
    return this.state.directionsRenderer.getPanel()
  }

  getRouteIndex () {
    return this.state.directionsRenderer.getRouteIndex()
  }
}

export default DirectionsRenderer
