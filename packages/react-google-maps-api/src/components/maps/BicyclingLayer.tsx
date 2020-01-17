import * as React from 'react'

import MapContext from '../../map-context'

interface BicyclingLayerState {
  bicyclingLayer: google.maps.BicyclingLayer | null
}

export interface BicyclingLayerProps {
  /** This callback is called when the bicyclingLayer instance has loaded. It is called with the bicyclingLayer instance. */
  onLoad?: (bicyclingLayer: google.maps.BicyclingLayer) => void
  /** This callback is called when the component unmounts. It is called with the bicyclingLayer instance. */
  onUnmount?: (bicyclingLayer: google.maps.BicyclingLayer) => void
}

export class BicyclingLayer extends React.PureComponent<BicyclingLayerProps, BicyclingLayerState> {
  static contextType = MapContext

  state = {
    bicyclingLayer: null,
  }

  setBicyclingLayerCallback = (): void => {
    if (this.state.bicyclingLayer !== null) {
      // TODO: how is this possibly null if we're doing a null check
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.state.bicyclingLayer.setMap(this.context)

      if (this.props.onLoad) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.props.onLoad(this.state.bicyclingLayer)
      }
    }
  }

  componentDidMount(): void {
    const bicyclingLayer = new google.maps.BicyclingLayer()

    this.setState(function setBicyclingLayer() {
      return {
        bicyclingLayer,
      }
    }, this.setBicyclingLayerCallback)
  }

  componentWillUnmount(): void {
    if (this.state.bicyclingLayer !== null) {
      if (this.props.onUnmount) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.props.onUnmount(this.state.bicyclingLayer)
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.state.bicyclingLayer.setMap(null)
    }
  }

  render(): React.ReactNode {
    return null
  }
}

export default BicyclingLayer
