import * as React from 'react'

export interface OverlayViewProps {
  mapPaneName: string
  getPixelPositionOffset?: (offsetWidth: number, offsetHeight: number) => { x: number; y: number }
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral
  position?: google.maps.LatLng | google.maps.LatLngLiteral
  onLoad?: (overlayView: google.maps.OverlayView) => void
  onUnmount?: (overlayView: google.maps.OverlayView) => void
}

interface ContentMountHandlerProps {
  onLoad?: () => void
}

class ContentMountHandler extends React.Component<ContentMountHandlerProps> {
  componentDidMount(): void {
    if (this.props.onLoad) {
      this.props.onLoad()
    }
  }

  render(): React.ReactNode {
    return this.props.children
  }
}

export default ContentMountHandler
