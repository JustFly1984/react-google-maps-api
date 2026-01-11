import {
  memo,
  useState,
  useEffect,
  useContext,
  type ComponentType,
} from 'react'

import { MapContext } from '../../map-context.js'

export type TrafficLayerProps = {
  options?: google.maps.TrafficLayerOptions | undefined
  onLoad?: ((trafficLayer: google.maps.TrafficLayer) => void) | undefined
  onUnmount?: ((trafficLayer: google.maps.TrafficLayer) => void) | undefined
}

function TrafficLayerFunctional({
  options,
  onLoad,
  onUnmount,
}: TrafficLayerProps): null {
  const map = useContext(MapContext)

  const [instance, setInstance] = useState<google.maps.TrafficLayer | null>(
    null
  )

  // Order does matter
  useEffect(() => {
    if (instance !== null) {
      instance.setMap(map)
    }
  }, [map])

  useEffect(() => {
    if (options && instance !== null) {
      instance.setOptions(options)
    }
  }, [instance, options])

  useEffect(() => {
    const trafficLayer = new google.maps.TrafficLayer({
      ...options,
      map,
    })

    setInstance(trafficLayer)

    if (onLoad) {
      onLoad(trafficLayer)
    }

    return () => {
      if (instance !== null) {
        if (onUnmount) {
          onUnmount(instance)
        }

        instance.setMap(null)
      }
    }
  }, [])

  return null
}

export const TrafficLayerF: ComponentType<TrafficLayerProps> = memo<TrafficLayerProps>(TrafficLayerFunctional)

export const TrafficLayer = TrafficLayerF
