/* globals google */
import * as React from "react"

import MapContext from "../../map-context"

interface BicyclingLayerState {
  bicyclingLayer: google.maps.BicyclingLayer | null;
}

interface BicyclingLayerProps {
  onLoad: (BicyclingLayer: google.maps.BicyclingLayer) => void
}

export class BicyclingLayer extends React.PureComponent<BicyclingLayerProps, BicyclingLayerState> {
  static contextType = MapContext

  state = {
    bicyclingLayer: null
  }

  componentDidMount = () => {
    const bicyclingLayer = new google.maps.BicyclingLayer()

    this.setState(
      () => ({
        bicyclingLayer
      }),
      () => {
        if (this.state.bicyclingLayer !== null) {
          // @ts-ignore
          this.state.bicyclingLayer.setMap(this.context)

          if (this.props.onLoad) {
            // @ts-ignore
            this.props.onLoad(this.state.bicyclingLayer)
          }
        }
      }
    )
  }

  componentWillUnmount = () => {
    if (this.state.bicyclingLayer !== null) {
      // @ts-ignore
      this.state.bicyclingLayer.setMap(null)
    }
  }

  render () {
    return null
  }
}

export default BicyclingLayer
