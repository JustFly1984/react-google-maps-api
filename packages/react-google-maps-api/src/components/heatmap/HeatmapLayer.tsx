import invariant from 'invariant'
import {
  memo,
  useState,
  useEffect,
  useContext,
  type ComponentType,
} from 'react'

import { MapContext } from '../../map-context.js'

export type HeatmapLayerProps = {
  data:
    | google.maps.MVCArray<
        google.maps.LatLng | google.maps.visualization.WeightedLocation
      >
    | google.maps.LatLng[]
    | google.maps.visualization.WeightedLocation[]
  options?: google.maps.visualization.HeatmapLayerOptions | undefined
  onLoad?:
    | ((heatmapLayer: google.maps.visualization.HeatmapLayer) => void)
    | undefined
  onUnmount?:
    | ((heatmapLayer: google.maps.visualization.HeatmapLayer) => void)
    | undefined
}

function HeatmapLayerFunctional({
  data,
  onLoad,
  onUnmount,
  options,
}: HeatmapLayerProps) {
  const map = useContext(MapContext)
  const [instance, setInstance] =
    useState<google.maps.visualization.HeatmapLayer | null>(null)

  useEffect(() => {
    if (!google.maps.visualization) {
      invariant(
        !!google.maps.visualization,
        'Did you include prop libraries={["visualization"]} in useJsApiScript? %s',
        google.maps.visualization
      )
    }
  }, [])

  useEffect(() => {
    invariant(!!data, 'data property is required in HeatmapLayer %s', data)
  }, [data])

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
    const heatmapLayer = new google.maps.visualization.HeatmapLayer({
      ...options,
      data,
      map,
    })

    setInstance(heatmapLayer)

    if (onLoad) {
      onLoad(heatmapLayer)
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

export const HeatmapLayerF: ComponentType<HeatmapLayerProps> = memo<HeatmapLayerProps>(HeatmapLayerFunctional)

export const HeatmapLayer = HeatmapLayerF
