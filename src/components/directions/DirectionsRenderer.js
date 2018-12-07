/* global google */
import { PureComponent } from 'react'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/MapChildHelper'

import MapContext from '../../mapcontext'

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

  static contextTypes = MapContext

  registeredEvents = []

  state = {
    directionsRenderer: null
  }

  componentDidMount = () => {
    const directionRenderer = new google.maps.DirectionsRenderer(
      Object.assign(
        {
          map: this.context
        },
        this.props.options
      )
    )

    this.setState(
      () => ({
        directionRenderer
      }),
      () => {
        this.state.directionRenderer.setMap(this.context)

        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap,
          eventMap,
          prevProps: {},
          nextProps: this.props,
          instance: this.state.directionRenderer
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
      instance: this.state.directionRenderer
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)

    if (this.state.directionRenderer) {
      this.state.directionRenderer.setMap(null)
    }
  }

  render = () => null

  getDirections = () =>
    this.state.directionRenderer.getDirections()

  getMap = () =>
    this.state.directionRenderer.getMap()

  getPanel = () =>
    this.state.directionRenderer.getPanel()

  getRouteIndex = () =>
    this.state.directionRenderer.getRouteIndex()
}

export default DirectionsRenderer
