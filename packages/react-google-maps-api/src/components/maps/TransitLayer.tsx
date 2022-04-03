import { PureComponent } from 'react'

import MapContext from '../../map-context'

interface TransitLayerState {
  transitLayer: google.maps.TransitLayer | null
}

export interface TransitLayerProps {
  /** This callback is called when the transitLayer instance has loaded. It is called with the transitLayer instance. */
  onLoad?: ((transitLayer: google.maps.TransitLayer) => void) | undefined
  /** This callback is called when the component unmounts. It is called with the transitLayer instance. */
  onUnmount?: ((transitLayer: google.maps.TransitLayer) => void) | undefined
}

export class TransitLayer extends PureComponent<TransitLayerProps, TransitLayerState> {
  static contextType = MapContext

  state = {
    transitLayer: null,
  }

  setTransitLayerCallback = (): void => {
    if (this.state.transitLayer !== null) {
      // TODO: how is this possibly null if we're doing a null check
      // @ts-ignore
      this.state.transitLayer.setMap(this.context)

      if (this.props.onLoad) {
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
        // @ts-ignore
        this.props.onUnmount(this.state.transitLayer)
      }

      // @ts-ignore
      this.state.transitLayer.setMap(null)
    }
  }

  render(): null {
    return null
  }
}

export default TransitLayer
