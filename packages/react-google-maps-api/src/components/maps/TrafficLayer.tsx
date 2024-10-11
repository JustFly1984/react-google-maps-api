import {
  memo,
  useState,
  useEffect,
  useContext,
  PureComponent,
  type ContextType,
} from 'react'

import {
  applyUpdatersToPropsAndRegisterEvents,
  unregisterEvents,
} from '../../utils/helper.js'

import MapContext from '../../map-context.js'

const eventMap = {}

const updaterMap = {
  options(
    instance: google.maps.TrafficLayer,
    options: google.maps.TrafficLayerOptions
  ): void {
    instance.setOptions(options)
  },
}

type TrafficLayerState = {
  trafficLayer: google.maps.TrafficLayer | null
}

export type TrafficLayerProps = {
  options?: google.maps.TrafficLayerOptions | undefined
  /** This callback is called when the trafficLayer instance has loaded. It is called with the trafficLayer instance. */
  onLoad?: ((trafficLayer: google.maps.TrafficLayer) => void) | undefined
  /** This callback is called when the component unmounts. It is called with the trafficLayer instance. */
  onUnmount?: ((trafficLayer: google.maps.TrafficLayer) => void) | undefined
}

function TrafficLayerFunctional({
  options,
  onLoad,
  onUnmount,
}: TrafficLayerProps): null {
  const map = useContext(MapContext)

  const [instance, setInstance] = useState<google.maps.TrafficLayer | null>(
    null
  )

  // Order does matter
  useEffect(() => {
    if (instance !== null) {
      instance.setMap(map)
    }
  }, [map])

  useEffect(() => {
    if (options && instance !== null) {
      instance.setOptions(options)
    }
  }, [instance, options])

  useEffect(() => {
    const trafficLayer = new google.maps.TrafficLayer({
      ...options,
      map,
    })

    setInstance(trafficLayer)

    if (onLoad) {
      onLoad(trafficLayer)
    }

    return () => {
      if (instance !== null) {
        if (onUnmount) {
          onUnmount(instance)
        }

        instance.setMap(null)
      }
    }
  }, [])

  return null
}

export const TrafficLayerF = memo(TrafficLayerFunctional)

export class TrafficLayer extends PureComponent<
  TrafficLayerProps,
  TrafficLayerState
> {
  static override contextType = MapContext
  declare context: ContextType<typeof MapContext>

  override state: TrafficLayerState = {
    trafficLayer: null,
  }

  setTrafficLayerCallback = () => {
    if (this.state.trafficLayer !== null && this.props.onLoad) {
      this.props.onLoad(this.state.trafficLayer)
    }
  }

  registeredEvents: google.maps.MapsEventListener[] = []

  override componentDidMount(): void {
    const trafficLayer = new google.maps.TrafficLayer({
      ...this.props.options,
      map: this.context,
    })

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: trafficLayer,
    })

    this.setState(function setTrafficLayer() {
      return {
        trafficLayer,
      }
    }, this.setTrafficLayerCallback)
  }

  override componentDidUpdate(prevProps: TrafficLayerProps): void {
    if (this.state.trafficLayer !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.trafficLayer,
      })
    }
  }

  override componentWillUnmount(): void {
    if (this.state.trafficLayer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.trafficLayer)
      }

      unregisterEvents(this.registeredEvents)

      this.state.trafficLayer.setMap(null)
    }
  }

  override render(): null {
    return null
  }
}

export default TrafficLayer
