import * as React from 'react'

import { unregisterEvents, applyUpdatersToPropsAndRegisterEvents } from '../../utils/helper'

import MapContext from '../../map-context'

const eventMap = {
  onDirectionsChanged: 'directions_changed',
}

const updaterMap = {
  directions(
    instance: google.maps.DirectionsRenderer,
    directions: google.maps.DirectionsResult
  ): void {
    instance.setDirections(directions)
  },
  map(instance: google.maps.DirectionsRenderer, map: google.maps.Map): void {
    instance.setMap(map)
  },
  options(
    instance: google.maps.DirectionsRenderer,
    options: google.maps.DirectionsRendererOptions
  ): void {
    instance.setOptions(options)
  },
  panel(instance: google.maps.DirectionsRenderer, panel: Element): void {
    instance.setPanel(panel)
  },
  routeIndex(instance: google.maps.DirectionsRenderer, routeIndex: number): void {
    instance.setRouteIndex(routeIndex)
  },
}

interface DirectionsRendererState {
  directionsRenderer: google.maps.DirectionsRenderer | null
}

export interface DirectionsRendererProps {
  options?: google.maps.DirectionsRendererOptions
  /** The directions to display on the map and/or in a <div> panel, retrieved as a DirectionsResult object from DirectionsService. */
  directions?: google.maps.DirectionsResult
  /** The <div> in which to display the directions steps. */
  panel?: Element
  /** The index of the route within the DirectionsResult object. The default value is 0. */
  routeIndex?: number
  /** This event is fired when the rendered directions change, either when a new DirectionsResult is set or when the user finishes dragging a change to the directions path. */
  onDirectionsChanged?: () => void
  /** This callback is called when the directionsRenderer instance has loaded. It is called with the directionsRenderer instance. */
  onLoad?: (directionsRenderer: google.maps.DirectionsRenderer) => void
  /** This callback is called when the component unmounts. It is called with the directionsRenderer instance. */
  onUnmount?: (directionsRenderer: google.maps.DirectionsRenderer) => void
}

export class DirectionsRenderer extends React.PureComponent<
  DirectionsRendererProps,
  DirectionsRendererState
> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: DirectionsRendererState = {
    directionsRenderer: null,
  }

  setDirectionsRendererCallback = (): void => {
    if (this.state.directionsRenderer !== null) {
      this.state.directionsRenderer.setMap(this.context)

      if (this.props.onLoad) {
        this.props.onLoad(this.state.directionsRenderer)
      }
    }
  }

  componentDidMount(): void {
    const directionsRenderer = new google.maps.DirectionsRenderer(this.props.options)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: directionsRenderer,
    })

    this.setState(function setDirectionsRenderer() {
      return {
        directionsRenderer,
      }
    }, this.setDirectionsRendererCallback)
  }

  componentDidUpdate(prevProps: DirectionsRendererProps): void {
    if (this.state.directionsRenderer !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.directionsRenderer,
      })
    }
  }

  componentWillUnmount(): void {
    if (this.state.directionsRenderer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.directionsRenderer)
      }

      unregisterEvents(this.registeredEvents)

      if (this.state.directionsRenderer) {
        this.state.directionsRenderer.setMap(null)
      }
    }
  }

  render(): JSX.Element {
    return <></>
  }
}

export default DirectionsRenderer
