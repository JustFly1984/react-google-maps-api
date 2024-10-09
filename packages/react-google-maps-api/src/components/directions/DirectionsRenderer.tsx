import { type ContextType, PureComponent } from 'react'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents,
} from '../../utils/helper.js'

import MapContext from '../../map-context.js'

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
  panel(instance: google.maps.DirectionsRenderer, panel: HTMLElement): void {
    instance.setPanel(panel)
  },
  routeIndex(
    instance: google.maps.DirectionsRenderer,
    routeIndex: number
  ): void {
    instance.setRouteIndex(routeIndex)
  },
}

type DirectionsRendererState = {
  directionsRenderer: google.maps.DirectionsRenderer | null
}

export type DirectionsRendererProps = {
  options?: google.maps.DirectionsRendererOptions | undefined
  /** The directions to display on the map and/or in a <div> panel, retrieved as a DirectionsResult object from DirectionsService. */
  directions?: google.maps.DirectionsResult | undefined
  /** The <div> in which to display the directions steps. */
  panel?: HTMLElement | undefined
  /** The index of the route within the DirectionsResult object. The default value is 0. */
  routeIndex?: number | undefined
  /** This event is fired when the rendered directions change, either when a new DirectionsResult is set or when the user finishes dragging a change to the directions path. */
  onDirectionsChanged?: (() => void) | undefined
  /** This callback is called when the directionsRenderer instance has loaded. It is called with the directionsRenderer instance. */
  onLoad?:
    | ((directionsRenderer: google.maps.DirectionsRenderer) => void)
    | undefined
  /** This callback is called when the component unmounts. It is called with the directionsRenderer instance. */
  onUnmount?:
    | ((directionsRenderer: google.maps.DirectionsRenderer) => void)
    | undefined
}

export class DirectionsRenderer extends PureComponent<
  DirectionsRendererProps,
  DirectionsRendererState
> {
  static override contextType = MapContext

  declare context: ContextType<typeof MapContext>

  registeredEvents: google.maps.MapsEventListener[] = []

  override state: DirectionsRendererState = {
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

  override componentDidMount(): void {
    const directionsRenderer = new google.maps.DirectionsRenderer(
      this.props.options
    )

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

  override componentDidUpdate(prevProps: DirectionsRendererProps): void {
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

  override componentWillUnmount(): void {
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

  override render(): null {
    return null
  }
}

export default DirectionsRenderer
