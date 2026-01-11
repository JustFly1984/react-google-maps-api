import {
  type ComponentType,
  memo,
  useEffect,
  useRef,
  useContext,
} from 'react'

import { MapContext } from '../../map-context.js'

export type KmlLayerProps = {
  options?: google.maps.KmlLayerOptions | undefined
  url?: string | undefined
  zIndex?: number | undefined
  onClick?: ((e: google.maps.MapMouseEvent) => void) | undefined
  onDefaultViewportChanged?: (() => void) | undefined | undefined
  onStatusChanged?: (() => void) | undefined | undefined
  onLoad?: ((kmlLayer: google.maps.KmlLayer) => void) | undefined
  onUnmount?: ((kmlLayer: google.maps.KmlLayer) => void) | undefined
}

function KmlLayerFunctional({
  options,
  url,
  zIndex,
  onClick,
  onDefaultViewportChanged,
  onStatusChanged,
  onLoad,
  onUnmount,
}: KmlLayerProps): null {
  const map = useContext(MapContext)
  const kmlLayerRef = useRef<google.maps.KmlLayer | null>(null)
  const registeredEventsRef = useRef<google.maps.MapsEventListener[]>([])

  useEffect(() => {
    const kmlLayer = new google.maps.KmlLayer({
      ...options,
      map,
    })

    kmlLayerRef.current = kmlLayer

    return (): void => {
      if (kmlLayerRef.current !== null) {
        if (onUnmount) {
          onUnmount(kmlLayerRef.current)
        }

        registeredEventsRef.current.forEach(event => event.remove())
        registeredEventsRef.current = []

        kmlLayerRef.current.setMap(null)

        kmlLayerRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const kmlLayer = kmlLayerRef.current

    if (kmlLayer !== null) {
      registeredEventsRef.current.forEach(event => event.remove())
      registeredEventsRef.current = []

      const eventListeners: google.maps.MapsEventListener[] = []

      if (onClick) {
        eventListeners.push(
          google.maps.event.addListener(kmlLayer, 'click', onClick)
        )
      }

      if (onDefaultViewportChanged) {
        eventListeners.push(
          google.maps.event.addListener(
            kmlLayer,
            'defaultviewport_changed',
            onDefaultViewportChanged
          )
        )
      }

      if (onStatusChanged) {
        eventListeners.push(
          google.maps.event.addListener(kmlLayer, 'status_changed', onStatusChanged)
        )
      }

      registeredEventsRef.current = eventListeners

      if (typeof url !== 'undefined') {
        kmlLayer.setUrl(url)
      }

      if (typeof zIndex !== 'undefined') {
        kmlLayer.setZIndex(zIndex)
      }

      if (typeof options !== 'undefined') {
        kmlLayer.setOptions(options)
      }
    }
  }, [url, zIndex, options, onClick, onDefaultViewportChanged, onStatusChanged])

  useEffect(() => {
    if (kmlLayerRef.current !== null && onLoad) {
      onLoad(kmlLayerRef.current)
    }
  }, [onLoad])

  return null
}

export const KmlLayerF: ComponentType<KmlLayerProps> = memo<KmlLayerProps>(KmlLayerFunctional)

export const KmlLayer = KmlLayerF
