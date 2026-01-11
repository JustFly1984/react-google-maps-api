import { useState, useEffect, memo, type ReactElement, type ComponentType } from 'react'
import {
  MarkerClusterer,
  type MarkerClustererOptions,
} from '@googlemaps/markerclusterer'

import { useGoogleMap } from '../../map-context.js'

export type MarkerClustererOptionsSubset = Omit<
  MarkerClustererOptions,
  'map' | 'markers'
>

export type GoogleMarkerClustererProps = {
  children: (markerClusterer: MarkerClusterer) => ReactElement<any, any>
  options: MarkerClustererOptionsSubset
}

export function useGoogleMarkerClusterer(
  options: MarkerClustererOptionsSubset
): MarkerClusterer | null {
  const map = useGoogleMap()

  const [markerClusterer, setMarkerClusterer] =
    useState<MarkerClusterer | null>(null)

  useEffect(() => {
    if (map && markerClusterer === null) {
      const markerCluster = new MarkerClusterer({ ...options, map })

      setMarkerClusterer(markerCluster)
    }
  }, [map])

  return markerClusterer
}

function GoogleMarkerClustererFunctional({
  children,
  options,
}: GoogleMarkerClustererProps) {
  const markerClusterer = useGoogleMarkerClusterer(options)

  return markerClusterer !== null ? children(markerClusterer) : null
}

export const GoogleMarkerClustererF: ComponentType<GoogleMarkerClustererProps> = memo<GoogleMarkerClustererProps>(GoogleMarkerClustererFunctional)

export const GoogleMarkerClusterer = GoogleMarkerClustererF
