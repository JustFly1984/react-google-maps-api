import {
  type ComponentType,
  memo,
  useEffect,
  useRef,
  useContext,
} from 'react'

import { MapContext } from '../../map-context.js'

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

function DirectionsRendererFunctional({
  options,
  directions,
  panel,
  routeIndex,
  onDirectionsChanged,
  onLoad,
  onUnmount,
}: DirectionsRendererProps): null {
  const map = useContext(MapContext)
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null)
  const registeredEventsRef = useRef<google.maps.MapsEventListener[]>([])

  useEffect(() => {
    const directionsRenderer = new google.maps.DirectionsRenderer(options)

    directionsRendererRef.current = directionsRenderer

    return (): void => {
      if (directionsRendererRef.current !== null) {
        if (onUnmount) {
          onUnmount(directionsRendererRef.current)
        }

        registeredEventsRef.current.forEach(event => event.remove())
        registeredEventsRef.current = []

        if (directionsRendererRef.current) {
          directionsRendererRef.current.setMap(null)
        }

        directionsRendererRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const directionsRenderer = directionsRendererRef.current

    if (directionsRenderer !== null) {
      registeredEventsRef.current.forEach(event => event.remove())
      registeredEventsRef.current = []

      const eventListeners: google.maps.MapsEventListener[] = []

      if (onDirectionsChanged) {
        eventListeners.push(
          google.maps.event.addListener(
            directionsRenderer,
            'directions_changed',
            onDirectionsChanged
          )
        )
      }

      registeredEventsRef.current = eventListeners

      if (typeof directions !== 'undefined') {
        directionsRenderer.setDirections(directions)
      }

      if (typeof panel !== 'undefined') {
        directionsRenderer.setPanel(panel)
      }

      if (typeof routeIndex !== 'undefined') {
        directionsRenderer.setRouteIndex(routeIndex)
      }

      if (typeof options !== 'undefined') {
        directionsRenderer.setOptions(options)
      }
    }
  }, [directions, panel, routeIndex, options, onDirectionsChanged])

  useEffect(() => {
    if (directionsRendererRef.current !== null) {
      directionsRendererRef.current.setMap(map)

      if (onLoad) {
        onLoad(directionsRendererRef.current)
      }
    }
  }, [map, onLoad])

  return null
}

export const DirectionsRendererF: ComponentType<DirectionsRendererProps> = memo<DirectionsRendererProps>(DirectionsRendererFunctional)

export const DirectionsRenderer = DirectionsRendererF
