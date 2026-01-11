import {
  type ComponentType,
  memo,
  useEffect,
  useRef,
} from 'react'
import invariant from 'invariant'

export type DirectionsServiceProps = {
  // required for default functionality
  options: google.maps.DirectionsRequest

  // required for default functionality
  callback: (
    // required
    /** The directions response retrieved from the directions server. You can render these using a DirectionsRenderer or parse this object and render it yourself. You must display the warnings and copyrights as noted in the Google Maps Platform Terms of Service. Note that though this result is "JSON-like," it is not strictly JSON, as it indirectly includes LatLng objects */
    result: google.maps.DirectionsResult | null,
    // required
    /** The status returned by the DirectionsService on the completion of a call to route(). Specify these by value, or by using the constant's name. For example, 'OK' or google.maps.DirectionsStatus.OK */
    status: google.maps.DirectionsStatus
  ) => void
  /** This callback is called when the directionsService instance has loaded. It is called with the directionsService instance. */
  onLoad?:
    | ((directionsService: google.maps.DirectionsService) => void)
    | undefined
  /** This callback is called when the component unmounts. It is called with the directionsService instance. */
  onUnmount?:
    | ((directionsService: google.maps.DirectionsService) => void)
    | undefined
}

function DirectionsServiceFunctional({
  options,
  callback,
  onLoad,
  onUnmount,
}: DirectionsServiceProps): null {
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(null)

  useEffect(() => {
    invariant(
      !!options,
      'DirectionsService expected options object as parameter, but got %s',
      options
    )

    const directionsService = new google.maps.DirectionsService()
    directionsServiceRef.current = directionsService

    if (onLoad) {
      onLoad(directionsService)
    }

    return (): void => {
      if (directionsServiceRef.current !== null) {
        if (onUnmount) {
          onUnmount(directionsServiceRef.current)
        }

        directionsServiceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (directionsServiceRef.current !== null) {
      directionsServiceRef.current.route(options, callback)
    }
  }, [options, callback])

  return null
}

export const DirectionsServiceF: ComponentType<DirectionsServiceProps> = memo<DirectionsServiceProps>(DirectionsServiceFunctional)

export const DirectionsService = DirectionsServiceF
