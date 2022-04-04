import { PureComponent } from 'react'

import MapContext from '../../map-context'

interface BicyclingLayerState {
  bicyclingLayer: google.maps.BicyclingLayer | null
}

export interface BicyclingLayerProps {
  /** This callback is called when the bicyclingLayer instance has loaded. It is called with the bicyclingLayer instance. */
  onLoad?: ((bicyclingLayer: google.maps.BicyclingLayer) => void) | undefined
  /** This callback is called when the component unmounts. It is called with the bicyclingLayer instance. */
  onUnmount?: ((bicyclingLayer: google.maps.BicyclingLayer) => void) | undefined
}

export class BicyclingLayer extends PureComponent<BicyclingLayerProps, BicyclingLayerState> {
  static contextType = MapContext

  state: BicyclingLayerState = {
    bicyclingLayer: null,
  }

  componentDidMount(): void {
    const bicyclingLayer = new google.maps.BicyclingLayer()

    this.setState(() => {
      return {
        bicyclingLayer,
      }
    }, this.setBicyclingLayerCallback)
  }

  componentWillUnmount(): void {
    if (this.state.bicyclingLayer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.bicyclingLayer)
      }

      // @ts-ignore
      this.state.bicyclingLayer.setMap(null)
    }
  }

  setBicyclingLayerCallback = (): void => {
    if (this.state.bicyclingLayer !== null) {

      this.state.bicyclingLayer.setMap(this.context)

      if (this.props.onLoad) {
        this.props.onLoad(this.state.bicyclingLayer)
      }
    }
  }

  render(): null {
    return null
  }
}

export default BicyclingLayer
