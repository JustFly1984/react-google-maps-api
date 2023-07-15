/* globals google */
export interface ClusterIconInfo {
  text: string
  index: number
  title?: string | undefined
  html?: string | undefined
}

export type MarkerExtended = google.maps.Marker & {
  isAdded?: boolean | undefined
}

export type TCalculator = (markers: MarkerExtended[], num: number) => ClusterIconInfo

export interface ClusterIconStyle {
  url: string
  className?: string | undefined
  height: number
  width: number
  anchorText?: [number, number] | undefined
  anchorIcon?: [number, number] | undefined
  textColor?: string | undefined
  textSize?: number | undefined
  textDecoration?: string | undefined
  fontWeight?: string | undefined
  fontStyle?: string | undefined
  fontFamily?: string | undefined
  backgroundPosition?: string | undefined
}

export interface ClustererOptions {
  gridSize?: number | undefined
  maxZoom?: number | undefined
  zoomOnClick?: boolean | undefined
  averageCenter?: boolean | undefined
  minimumClusterSize?: number | undefined
  ignoreHidden?: boolean | undefined
  title?: string | undefined
  calculator?: TCalculator | undefined
  clusterClass?: string | undefined
  styles?: ClusterIconStyle[] | undefined
  enableRetinaIcons?: boolean | undefined
  batchSize?: number | undefined
  batchSizeIE?: number | undefined
  imagePath?: string | undefined
  imageExtension?: string | undefined
  imageSizes?: number[] | undefined
}
