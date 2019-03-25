import * as React from "react"

import MapContext from "../../map-context"

interface BicyclingLayerState {
  bicyclingLayer: google.maps.BicyclingLayer | null
}

interface BicyclingLayerProps {
  onLoad: (BicyclingLayer: google.maps.BicyclingLayer) => void
}

export class BicyclingLayer extends React.PureComponent<
  BicyclingLayerProps,
  BicyclingLayerState
> {
  public static defaultProps = {
    onLoad: () => {}
  }
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
          // TODO: how is this possibly null if we're doing a null check
          // @ts-ignore
          this.state.bicyclingLayer.setMap(this.context)
          //@ts-ignore
          this.props.onLoad(this.state.bicyclingLayer)
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

  render() {
    return null
  }
}

export default BicyclingLayer
