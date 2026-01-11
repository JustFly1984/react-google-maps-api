import {
  memo,
  useMemo,
  useEffect,
  useContext,
  type ComponentType,
} from 'react'

import { MapContext } from '../../map-context.js'

export type GroundOverlayProps = {
  options?: google.maps.GroundOverlayOptions | undefined
  /** The opacity of the overlay, expressed as a number between 0 and 1. Optional. Defaults to 1. */
  opacity?: number | undefined
  /** This event is fired when the DOM dblclick event is fired on the GroundOverlay. */
  onDblClick?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the DOM click event is fired on the GroundOverlay. */
  onClick?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** The url of the projected image */
  url: string
  /** The bounds that the image will be scaled to fit */
  bounds: google.maps.LatLngBoundsLiteral
  /** This callback is called when the groundOverlay instance has loaded. It is called with the groundOverlay instance. */
  onLoad?: ((groundOverlay: google.maps.GroundOverlay) => void) | undefined
  /** This callback is called when the component unmounts. It is called with the groundOverlay instance. */
  onUnmount?: ((groundOverlay: google.maps.GroundOverlay) => void) | undefined
  visible?: boolean
}

function GroundOverlayFunctional({
  url,
  bounds,
  options,
  visible,
}: GroundOverlayProps) {
  const map = useContext<google.maps.Map | null>(MapContext)

  const imageBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(bounds.south, bounds.west),
    new google.maps.LatLng(bounds.north, bounds.east)
  )

  const groundOverlay = useMemo(() => {
    return new google.maps.GroundOverlay(url, imageBounds, options)
  }, [])

  useEffect(() => {
    if (groundOverlay !== null) {
      groundOverlay.setMap(map)
    }
  }, [map])

  useEffect(() => {
    if (typeof url !== 'undefined' && groundOverlay !== null) {
      groundOverlay.set('url', url)
      groundOverlay.setMap(map)
    }
  }, [groundOverlay, url])

  useEffect(() => {
    if (typeof visible !== 'undefined' && groundOverlay !== null) {
      groundOverlay.setOpacity(visible ? 1 : 0)
    }
  }, [groundOverlay, visible])

  useEffect(() => {
    const newBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(bounds.south, bounds.west),
      new google.maps.LatLng(bounds.north, bounds.east)
    )

    if (typeof bounds !== 'undefined' && groundOverlay !== null) {
      groundOverlay.set('bounds', newBounds)
      groundOverlay.setMap(map)
    }
  }, [groundOverlay, bounds])

  return null
}

export const GroundOverlayF: ComponentType<GroundOverlayProps> = memo<GroundOverlayProps>(GroundOverlayFunctional)

export const GroundOverlay = GroundOverlayF
