import {
  type ComponentType,
  memo,
  useEffect,
  useRef,
} from 'react'

import invariant from 'invariant'

export type DistanceMatrixServiceProps = {
  // required for default functionality
  options: google.maps.DistanceMatrixRequest

  // required for default functionality
  callback: (
    // required
    /** The response to a DistanceMatrixService request, consisting of the formatted origin and destination addresses, and a sequence of DistanceMatrixResponseRows, one for each corresponding origin address. */
    response: google.maps.DistanceMatrixResponse | null,
    // required
    /** The top-level status about the request in general returned by the DistanceMatrixService upon completion of a distance matrix request. Specify these by value, or by using the constant's name. For example, 'OK' or google.maps.DistanceMatrixStatus.OK. */
    status: google.maps.DistanceMatrixStatus
  ) => void
  /** This callback is called when the distanceMatrixService instance has loaded. It is called with the distanceMatrixService instance. */
  onLoad?:
    | ((distanceMatrixService: google.maps.DistanceMatrixService) => void)
    | undefined
  /** This callback is called when the component unmounts. It is called with the distanceMatrixService instance. */
  onUnmount?:
    | ((distanceMatrixService: google.maps.DistanceMatrixService) => void)
    | undefined
}

function DistanceMatrixServiceFunctional({
  options,
  callback,
  onLoad,
  onUnmount,
}: DistanceMatrixServiceProps): null {
  const distanceMatrixServiceRef = useRef<google.maps.DistanceMatrixService | null>(null)

  useEffect(() => {
    invariant(
      !!options,
      'DistanceMatrixService expected options object as parameter, but go %s',
      options
    )

    const distanceMatrixService = new google.maps.DistanceMatrixService()
    distanceMatrixServiceRef.current = distanceMatrixService

    if (onLoad) {
      onLoad(distanceMatrixService)
    }

    return (): void => {
      if (distanceMatrixServiceRef.current !== null) {
        if (onUnmount) {
          onUnmount(distanceMatrixServiceRef.current)
        }

        distanceMatrixServiceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (distanceMatrixServiceRef.current !== null) {
      distanceMatrixServiceRef.current.getDistanceMatrix(options, callback)
    }
  }, [options, callback])

  return null
}

export const DistanceMatrixServiceF: ComponentType<DistanceMatrixServiceProps> = memo<DistanceMatrixServiceProps>(DistanceMatrixServiceFunctional)

export const DistanceMatrixService = DistanceMatrixServiceF
