import * as React from "react"

import MapContext from "../../map-context"

interface BicyclingLayerState {
  bicyclingLayer: google.maps.BicyclingLayer | null;
}

export interface BicyclingLayerProps {
  /** This callback is called when the bicyclingLayer instance has loaded. It is called with the bicyclingLayer instance. */
  onLoad?: (bicyclingLayer: google.maps.BicyclingLayer) => void;
  /** This callback is called when the component unmounts. It is called with the bicyclingLayer instance. */
  onUnmount?: (bicyclingLayer: google.maps.BicyclingLayer) => void;
}

export class BicyclingLayer extends React.PureComponent<
  BicyclingLayerProps,
  BicyclingLayerState
> {
  static contextType = MapContext

  state = {
    bicyclingLayer: null
  }

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  setBicyclingLayerCallback = () => {
    if (this.state.bicyclingLayer !== null) {
      // TODO: how is this possibly null if we're doing a null check
      // @ts-ignore
      this.state.bicyclingLayer.setMap(this.context)

      if (this.props.onLoad) {
        //@ts-ignore
        this.props.onLoad(this.state.bicyclingLayer)
      }
    }
  }

  componentDidMount() {
    const bicyclingLayer = new google.maps.BicyclingLayer()

    function setBicyclingLayer() {
      return {
        bicyclingLayer
      }
    }

    this.setState(
      setBicyclingLayer,
      this.setBicyclingLayerCallback
    )
  }

  componentWillUnmount() {
    if (this.state.bicyclingLayer !== null) {
      if (this.props.onUnmount) {
        // @ts-ignore
        this.props.onUnmount(this.state.bicyclingLayer)
      }

      // @ts-ignore
      this.state.bicyclingLayer.setMap(null)
    }
  }

  render() {
    return null
  }
}

export default BicyclingLayer
