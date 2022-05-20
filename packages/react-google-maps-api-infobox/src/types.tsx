export interface InfoBoxOptions {
  alignBottom?: boolean | undefined
  boxClass?: string | undefined
  boxStyle?: {
    [key: string]: any
  } | undefined
  closeBoxMargin?: string | undefined
  closeBoxURL?: string | undefined
  content?: string | Node | undefined
  disableAutoPan?: boolean | undefined
  enableEventPropagation?: boolean | undefined
  infoBoxClearance?: google.maps.Size | undefined
  isHidden?: boolean | undefined
  maxWidth?: number | undefined
  pixelOffset?: google.maps.Size | undefined
  position?: google.maps.LatLng | undefined
  pane?: keyof google.maps.MapPanes | undefined
  visible?: boolean | undefined
  zIndex?: number | undefined
}
