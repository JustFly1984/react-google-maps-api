import * as React from 'react'

import MapContext from '../../map-context'

interface TransitLayerState {
  transitLayer: google.maps.TransitLayer | null
}

export interface TransitLayerProps {
  /** This callback is called when the transitLayer instance has loaded. It is called with the transitLayer instance. */
  onLoad?: (transitLayer: google.maps.TransitLayer) => void
  /** This callback is called when the component unmounts. It is called with the transitLayer instance. */
  onUnmount?: (transitLayer: google.maps.TransitLayer) => void
}

export class TransitLayer extends React.PureComponent<TransitLayerProps, TransitLayerState> {
  static contextType = MapContext

  state = {
    transitLayer: null,
  }

  setTransitLayerCallback = (): void => {
    if (this.state.transitLayer !== null) {
      // TODO: how is this possibly null if we're doing a null check
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.state.transitLayer.setMap(this.context)

      if (this.props.onLoad) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.props.onLoad(this.state.transitLayer)
      }
    }
  }

  componentDidMount(): void {
    const transitLayer = new google.maps.TransitLayer()

    this.setState(function setTransitLayer() {
      return {
        transitLayer,
      }
    }, this.setTransitLayerCallback)
  }

  componentWillUnmount(): void {
    if (this.state.transitLayer !== null) {
      if (this.props.onUnmount) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.props.onUnmount(this.state.transitLayer)
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.state.transitLayer.setMap(null)
    }
  }

  render(): React.ReactNode {
    return null
  }
}

export default TransitLayer
