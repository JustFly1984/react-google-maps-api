import { useState, useEffect, memo, type ReactElement } from 'react'
import { MarkerClusterer, type MarkerClustererOptions } from '@googlemaps/markerclusterer'

import { useGoogleMap } from '../../map-context'

export type MarkerClustererOptionsSubset = Omit<MarkerClustererOptions, 'map' | 'markers'>

export interface GoogleMarkerClustererProps {
  /** Render prop that exposes marker clusterer to children components
   *
   * The callback function should return a list of Marker components.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (markerClusterer: MarkerClusterer) => ReactElement<any, any>,
  /** Subset of {@link MarkerClustererOptions} options
   *
   * ```
   * {
   *   algorithm?: Algorithm;
   *   renderer?: Renderer;
   *   onClusterClick?: onClusterClickHandler;
   * }
   * ```
   */
  options: MarkerClustererOptionsSubset
}

export function useGoogleMarkerClusterer(options: MarkerClustererOptionsSubset): MarkerClusterer | null {
  const map = useGoogleMap()

  const [markerClusterer, setMarkerClusterer] = useState<MarkerClusterer | null>(null)

  useEffect(() => {
    if (map && markerClusterer === null) {
      const markerCluster = new MarkerClusterer({ ...options, map })

      setMarkerClusterer(markerCluster)
    }
  }, [map])

  return markerClusterer
}

/** Wrapper around [@googlemaps/markerclusterer](https://github.com/googlemaps/js-markerclusterer)
 *
 * Accepts {@link  MarkerClustererOptionsSubset} which is a subset of  {@link MarkerClustererOptions}
 */
function GoogleMarkerClusterer({ children, options }: GoogleMarkerClustererProps) {
  const markerClusterer = useGoogleMarkerClusterer(options)

  return markerClusterer !== null ? children(markerClusterer) : null
}

export default memo(GoogleMarkerClusterer)
