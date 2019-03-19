import * as React from "react"

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
  directionsRenderer: google.maps.DirectionsRenderer | null;
}

interface DirectionsRendererProps {
  options?: google.maps.DirectionsRendererOptions;
  directions?: google.maps.DirectionsResult;
  panel?: Element;
  routeIndex?: number;
  onDirectionsChanged?: () => void;
  onLoad?: (directionsRenderer: google.maps.DirectionsRenderer) => void;
}

export class DirectionsRenderer extends React.PureComponent<
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
      typeof this.props.options === 'object'
        ? this.props.options
        : undefined
    )

    this.setState(
      () => ({
        directionsRenderer
      }),
      () => {
        if (this.state.directionsRenderer !== null) {
          this.state.directionsRenderer.setMap(this.context)

          this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap,
            eventMap,
            prevProps: {},
            nextProps: this.props,
            instance: this.state.directionsRenderer
          })

          if (this.props.onLoad) {
            this.props.onLoad(this.state.directionsRenderer)
          }
        }
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

  render () {
     return null
  }
}

export default DirectionsRenderer
