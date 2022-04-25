import { type ContextType, PureComponent, useContext, useEffect, useState, memo } from 'react'

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

function TransitLayerFunctional({ onLoad, onUnmount }: TransitLayerProps): null {
  const map = useContext<google.maps.Map | null>(MapContext)

  const [instance, setInstance] = useState<google.maps.TransitLayer | null>(null)

  // Order does matter
  useEffect(() => {
    if (instance !== null) {
      instance.setMap(map)
    }
  }, [map])

  useEffect(() => {
    const transitLayer = new google.maps.TransitLayer()

    setInstance(transitLayer)

    transitLayer.setMap(map)

    if (onLoad) {
      onLoad(transitLayer)
    }

    return () => {
      if (instance !== null) {
        if (onUnmount) {
          onUnmount(instance)
        }

        // @ts-ignore
        this.state.transitLayer.setMap(null)
      }
    }
  }, [])

  return null
}

export const TransitLayerF = memo(TransitLayerFunctional)

export class TransitLayer extends PureComponent<TransitLayerProps, TransitLayerState> {
  static contextType = MapContext
  declare context: ContextType<typeof MapContext>

  state = {
    transitLayer: null,
  }

  setTransitLayerCallback = (): void => {
    if (this.state.transitLayer !== null) {

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
