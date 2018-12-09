/* global google */
import { PureComponent } from 'react'

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

  registeredEvents = []

  state = {
    directionsRenderer: null
  }

  componentDidMount = () => {
    const directionsRenderer = new google.maps.DirectionsRenderer(
      Object.assign(
        {
          map: this.context
        },
        this.props.options
      )
    )

    this.setState(
      () => ({
        directionsRenderer
      }),
      () => {
        this.state.directionsRenderer.setMap(this.context)

        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap,
          eventMap,
          prevProps: {},
          nextProps: this.props,
          instance: this.state.directionsRenderer
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
      instance: this.state.directionsRenderer
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)

    if (this.state.directionsRenderer) {
      this.state.directionsRenderer.setMap(null)
    }
  }

  render = () => null

  getDirections = () =>
    this.state.directionsRenderer.getDirections()

  getMap = () =>
    this.state.directionsRenderer.getMap()

  getPanel = () =>
    this.state.directionsRenderer.getPanel()

  getRouteIndex = () =>
    this.state.directionsRenderer.getRouteIndex()
}

export default DirectionsRenderer
