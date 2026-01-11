import {
  type ComponentType,
  memo,
  useEffect,
  useRef,
  useContext,
} from 'react'

import { MapContext } from '../../map-context.js'

export type StreetViewPanoramaProps = {
  options?: google.maps.StreetViewPanoramaOptions | undefined
  /** This event is fired when the close button is clicked. */
  onCloseclick?: ((event: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the panorama's pano id changes. The pano may change as the user navigates through the panorama or the position is manually set. Note that not all position changes trigger a pano_changed. */
  onPanoChanged?: (() => void) | undefined
  /** This event is fired when the panorama's position changes. The position changes as the user navigates through the panorama or the position is set manually. */
  onPositionChanged?: (() => void) | undefined
  /** This event is fired when the panorama's point-of-view changes. The point of view changes as the pitch, zoom, or heading changes. */
  onPovChanged?: (() => void) | undefined
  /** Developers should trigger this event on the panorama when its div changes size: google.maps.event.trigger(panorama, 'resize'). */
  onResize?: (() => void) | undefined
  /** This event is fired after every panorama lookup by id or location, via setPosition() or setPano(). */
  onStatusChanged?: (() => void) | undefined
  /** This event is fired when the panorama's visibility changes. The visibility is changed when the Pegman is dragged onto the map, the close button is clicked, or setVisible() is called. */
  onVisibleChanged?: (() => void) | undefined
  /** This event is fired when the panorama's zoom level changes. */
  onZoomChange?: (() => void) | undefined
  /** This callback is called when the streetViewPanorama instance has loaded. It is called with the streetViewPanorama instance. */
  onLoad?:
    | ((streetViewPanorama: google.maps.StreetViewPanorama) => void)
    | undefined
  /** This callback is called when the component unmounts. It is called with the streetViewPanorama instance. */
  onUnmount?:
    | ((streetViewPanorama: google.maps.StreetViewPanorama) => void)
    | undefined
}

function StreetViewPanoramaFunctional({
  options,
  onCloseclick,
  onPanoChanged,
  onPositionChanged,
  onPovChanged,
  onResize,
  onStatusChanged,
  onVisibleChanged,
  onZoomChange,
  onLoad,
  onUnmount,
}: StreetViewPanoramaProps): null {
  const map = useContext(MapContext)
  const streetViewPanoramaRef = useRef<google.maps.StreetViewPanorama | null>(null)
  const registeredEventsRef = useRef<google.maps.MapsEventListener[]>([])

  useEffect(() => {
    const streetViewPanorama = map?.getStreetView() ?? null
    streetViewPanoramaRef.current = streetViewPanorama

    const eventListeners: google.maps.MapsEventListener[] = []

    if (streetViewPanorama !== null) {
      if (onCloseclick) {
        eventListeners.push(
          google.maps.event.addListener(streetViewPanorama, 'closeclick', onCloseclick)
        )
      }

      if (onPanoChanged) {
        eventListeners.push(
          google.maps.event.addListener(streetViewPanorama, 'pano_changed', onPanoChanged)
        )
      }

      if (onPositionChanged) {
        eventListeners.push(
          google.maps.event.addListener(streetViewPanorama, 'position_changed', onPositionChanged)
        )
      }

      if (onPovChanged) {
        eventListeners.push(
          google.maps.event.addListener(streetViewPanorama, 'pov_changed', onPovChanged)
        )
      }

      if (onResize) {
        eventListeners.push(
          google.maps.event.addListener(streetViewPanorama, 'resize', onResize)
        )
      }

      if (onStatusChanged) {
        eventListeners.push(
          google.maps.event.addListener(streetViewPanorama, 'status_changed', onStatusChanged)
        )
      }

      if (onVisibleChanged) {
        eventListeners.push(
          google.maps.event.addListener(streetViewPanorama, 'visible_changed', onVisibleChanged)
        )
      }

      if (onZoomChange) {
        eventListeners.push(
          google.maps.event.addListener(streetViewPanorama, 'zoom_changed', onZoomChange)
        )
      }
    }

    registeredEventsRef.current = eventListeners

    if (onLoad && streetViewPanorama !== null) {
      onLoad(streetViewPanorama)
    }

    return (): void => {
      if (streetViewPanoramaRef.current !== null) {
        if (onUnmount) {
          onUnmount(streetViewPanoramaRef.current)
        }

        registeredEventsRef.current.forEach(event => event.remove())
        registeredEventsRef.current = []

        streetViewPanoramaRef.current.setVisible(false)

        streetViewPanoramaRef.current = null
      }
    }
  }, [map])

  useEffect(() => {
    const streetViewPanorama = streetViewPanoramaRef.current

    if (streetViewPanorama !== null) {
      if (typeof options !== 'undefined') {
        streetViewPanorama.setOptions(options)
      }
    }
  }, [options])

  useEffect(() => {
    const streetViewPanorama = streetViewPanoramaRef.current

    if (streetViewPanorama !== null) {
      registeredEventsRef.current.forEach(event => event.remove())
      registeredEventsRef.current = []

      const eventListeners: google.maps.MapsEventListener[] = []

      if (onCloseclick) {
        eventListeners.push(
          google.maps.event.addListener(streetViewPanorama, 'closeclick', onCloseclick)
        )
      }

      if (onPanoChanged) {
        eventListeners.push(
          google.maps.event.addListener(streetViewPanorama, 'pano_changed', onPanoChanged)
        )
      }

      if (onPositionChanged) {
        eventListeners.push(
          google.maps.event.addListener(streetViewPanorama, 'position_changed', onPositionChanged)
        )
      }

      if (onPovChanged) {
        eventListeners.push(
          google.maps.event.addListener(streetViewPanorama, 'pov_changed', onPovChanged)
        )
      }

      if (onResize) {
        eventListeners.push(
          google.maps.event.addListener(streetViewPanorama, 'resize', onResize)
        )
      }

      if (onStatusChanged) {
        eventListeners.push(
          google.maps.event.addListener(streetViewPanorama, 'status_changed', onStatusChanged)
        )
      }

      if (onVisibleChanged) {
        eventListeners.push(
          google.maps.event.addListener(streetViewPanorama, 'visible_changed', onVisibleChanged)
        )
      }

      if (onZoomChange) {
        eventListeners.push(
          google.maps.event.addListener(streetViewPanorama, 'zoom_changed', onZoomChange)
        )
      }

      registeredEventsRef.current = eventListeners
    }
  }, [onCloseclick, onPanoChanged, onPositionChanged, onPovChanged, onResize, onStatusChanged, onVisibleChanged, onZoomChange])

  return null
}

export const StreetViewPanoramaF: ComponentType<StreetViewPanoramaProps> = memo<StreetViewPanoramaProps>(StreetViewPanoramaFunctional)

export const StreetViewPanorama = StreetViewPanoramaF
