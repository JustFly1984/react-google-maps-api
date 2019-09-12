import * as React from "react"

import MapContext from "../../map-context"

interface TransitLayerState {
  tranistLayer: google.maps.TransitLayer | null;
}

export interface TransitLayerProps {
  /** This callback is called when the tranistLayer instance has loaded. It is called with the tranistLayer instance. */
  onLoad?: (tranistLayer: google.maps.TransitLayer) => void;
  /** This callback is called when the component unmounts. It is called with the tranistLayer instance. */
  onUnmount?: (tranistLayer: google.maps.TransitLayer) => void;
}

export class TransitLayer extends React.PureComponent<
  TransitLayerProps,
  TransitLayerState
> {
  static contextType = MapContext

  state = {
    tranistLayer: null
  }

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  setTransitLayerCallback = () => {
    if (this.state.tranistLayer !== null) {
      // TODO: how is this possibly null if we're doing a null check
      // @ts-ignore
      this.state.tranistLayer.setMap(this.context)

      if (this.props.onLoad) {
        //@ts-ignore
        this.props.onLoad(this.state.tranistLayer)
      }
    }
  }

  componentDidMount() {
    const tranistLayer = new google.maps.TransitLayer()

    function setTransitLayer() {
      return {
        tranistLayer
      }
    }

    this.setState(
      setTransitLayer,
      this.setTransitLayerCallback
    )
  }

  componentWillUnmount() {
    if (this.state.tranistLayer !== null) {
      if (this.props.onUnmount) {
        // @ts-ignore
        this.props.onUnmount(this.state.tranistLayer)
      }

      // @ts-ignore
      this.state.tranistLayer.setMap(null)
    }
  }

  render() {
    return null
  }
}

export default TransitLayer
