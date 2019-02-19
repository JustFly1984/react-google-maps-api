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
  trafficLayer?: google.maps.TrafficLayer
}

interface TrafficLayerProps {
  options?: google.maps.TrafficLayerOptions
}

export class TrafficLayer extends PureComponent<
  TrafficLayerProps,
  TrafficLayerState
> {
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
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap,
          eventMap,
          prevProps: {},
          nextProps: this.props,
          instance: this.state.trafficLayer
        })
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
    unregisterEvents(this.registeredEvents)

    this.state.trafficLayer && this.state.trafficLayer.setMap(null)
  }

  render = () => null

  getMap = () => this.state.trafficLayer.getMap()
}

export default TrafficLayer
