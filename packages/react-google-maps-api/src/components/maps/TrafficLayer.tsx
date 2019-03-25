import { PureComponent } from "react"

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "../../utils/helper"
import MapContext from "../../map-context"

const eventMap = {}

const updaterMap = {
  options(
    instance: google.maps.TrafficLayer,
    options: google.maps.TrafficLayerOptions
  ) {
    instance.setOptions(options)
  }
}

interface TrafficLayerState {
  trafficLayer: google.maps.TrafficLayer | null
}

interface TrafficLayerProps {
  options?: google.maps.TrafficLayerOptions
  onLoad: (trafficLayer: google.maps.TrafficLayer) => void
}

export class TrafficLayer extends PureComponent<
  TrafficLayerProps,
  TrafficLayerState
> {
  public static defaultProps = {
    options: {},
    onLoad: () => {}
  }
  static contextType = MapContext

  state = {
    trafficLayer: null
  }

  registeredEvents: google.maps.MapsEventListener[] = []

  componentDidMount = () => {
    const trafficLayer = new google.maps.TrafficLayer({
      ...this.props.options,
      map: this.context
    })

    this.setState(
      () => ({
        trafficLayer
      }),
      () => {
        if (this.state.trafficLayer !== null) {
          this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap,
            eventMap,
            prevProps: {},
            nextProps: this.props,
            instance: this.state.trafficLayer
          })

          // TODO
          // @ts-ignore
          this.props.onLoad(this.state.trafficLayer)
        }
      }
    )
  }

  componentDidUpdate = (prevProps: TrafficLayerProps) => {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.trafficLayer
    })
  }

  componentWillUnmount = () => {
    if (this.state.trafficLayer !== null) {
      unregisterEvents(this.registeredEvents)

      // @ts-ignore
      this.state.trafficLayer.setMap(null)
    }
  }

  render() {
    return null
  }
}

export default TrafficLayer
