import { PureComponent } from "react"

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "../../utils/helper"

import MapContext from "../../map-context"

const eventMap = {
  onDirectionsChanged: "directions_changed"
}

const updaterMap = {
  directions(
    instance: google.maps.DirectionsRenderer,
    directions: google.maps.DirectionsResult
  ) {
    instance.setDirections(directions)
  },
  map(instance: google.maps.DirectionsRenderer, map: google.maps.Map) {
    instance.setMap(map)
  },
  options(
    instance: google.maps.DirectionsRenderer,
    options: google.maps.DirectionsRendererOptions
  ) {
    instance.setOptions(options)
  },
  panel(instance: google.maps.DirectionsRenderer, panel: Element) {
    instance.setPanel(panel)
  },
  routeIndex(instance: google.maps.DirectionsRenderer, routeIndex: number) {
    instance.setRouteIndex(routeIndex)
  }
}

interface DirectionsRendererState {
  directionsRenderer?: google.maps.DirectionsRenderer
}

interface DirectionsRendererProps {
  options?: google.maps.DirectionsRendererOptions
  directions?: google.maps.DirectionsResult
  panel?: Element
  routeIndex?: number
  onDirectionsChanged?: () => void
}

export class DirectionsRenderer extends PureComponent<
  DirectionsRendererProps,
  DirectionsRendererState
> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: DirectionsRendererState = {
    directionsRenderer: null
  }

  componentDidMount = () => {
    const directionsRenderer = new google.maps.DirectionsRenderer(
      this.props.options
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

  componentDidUpdate = (prevProps: DirectionsRendererProps) => {
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

  getDirections = () => this.state.directionsRenderer.getDirections()

  getMap = () => this.state.directionsRenderer.getMap()

  getPanel = () => this.state.directionsRenderer.getPanel()

  getRouteIndex = () => this.state.directionsRenderer.getRouteIndex()
}

export default DirectionsRenderer
