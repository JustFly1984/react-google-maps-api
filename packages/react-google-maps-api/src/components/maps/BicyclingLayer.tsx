import {
  memo,
  useState,
  useEffect,
  useContext,
  PureComponent,
  type ContextType,
} from 'react'

import MapContext from '../../map-context.js'

type BicyclingLayerState = {
  bicyclingLayer: google.maps.BicyclingLayer | null
}

export type BicyclingLayerProps = {
  /** This callback is called when the bicyclingLayer instance has loaded. It is called with the bicyclingLayer instance. */
  onLoad?: ((bicyclingLayer: google.maps.BicyclingLayer) => void) | undefined
  /** This callback is called when the component unmounts. It is called with the bicyclingLayer instance. */
  onUnmount?: ((bicyclingLayer: google.maps.BicyclingLayer) => void) | undefined
}

function BicyclingLayerFunctional({
  onLoad,
  onUnmount,
}: BicyclingLayerProps): null {
  const map = useContext<google.maps.Map | null>(MapContext)

  const [instance, setInstance] = useState<google.maps.BicyclingLayer | null>(
    null
  )

  // Order does matter
  useEffect(() => {
    if (instance !== null) {
      instance.setMap(map)
    }
  }, [map])

  useEffect(() => {
    const bicyclingLayer = new google.maps.BicyclingLayer()

    setInstance(bicyclingLayer)

    bicyclingLayer.setMap(map)

    if (onLoad) {
      onLoad(bicyclingLayer)
    }

    return () => {
      if (bicyclingLayer !== null) {
        if (onUnmount) {
          onUnmount(bicyclingLayer)
        }

        bicyclingLayer.setMap(null)
      }
    }
  }, [])

  return null
}

export const BicyclingLayerF = memo(BicyclingLayerFunctional)

export class BicyclingLayer extends PureComponent<
  BicyclingLayerProps,
  BicyclingLayerState
> {
  static override contextType = MapContext
  declare context: ContextType<typeof MapContext>

  override state: BicyclingLayerState = {
    bicyclingLayer: null,
  }

  override componentDidMount(): void {
    const bicyclingLayer = new google.maps.BicyclingLayer()

    this.setState(() => {
      return {
        bicyclingLayer,
      }
    }, this.setBicyclingLayerCallback)
  }

  override componentWillUnmount(): void {
    if (this.state.bicyclingLayer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.bicyclingLayer)
      }

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

  override render(): null {
    return null
  }
}

export default BicyclingLayer
