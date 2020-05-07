import { PureComponent } from 'react'

import { unregisterEvents, applyUpdatersToPropsAndRegisterEvents } from '../../utils/helper'
import MapContext from '../../map-context'

const eventMap = {}

const updaterMap = {
  options(instance: google.maps.TrafficLayer, options: google.maps.TrafficLayerOptions): void {
    instance.setOptions(options)
  },
}

interface TrafficLayerState {
  trafficLayer: google.maps.TrafficLayer | null
}

export interface TrafficLayerProps {
  options?: google.maps.TrafficLayerOptions
  /** This callback is called when the trafficLayer instance has loaded. It is called with the trafficLayer instance. */
  onLoad?: (trafficLayer: google.maps.TrafficLayer) => void
  /** This callback is called when the component unmounts. It is called with the trafficLayer instance. */
  onUnmount?: (trafficLayer: google.maps.TrafficLayer) => void
}

export class TrafficLayer extends PureComponent<TrafficLayerProps, TrafficLayerState> {
  static contextType = MapContext

  state = {
    trafficLayer: null,
  }

  setTrafficLayerCallback = () => {
    if (this.state.trafficLayer !== null) {
      if (this.props.onLoad) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.props.onLoad(this.state.trafficLayer)
      }
    }
  }

  registeredEvents: google.maps.MapsEventListener[] = []

  componentDidMount(): void {
    const trafficLayer = new google.maps.TrafficLayer({
      ...(this.props.options || {}),
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

  componentDidUpdate(prevProps: TrafficLayerProps): void {
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

  componentWillUnmount(): void {
    if (this.state.trafficLayer !== null) {
      if (this.props.onUnmount) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.props.onUnmount(this.state.trafficLayer)
      }

      unregisterEvents(this.registeredEvents)

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.state.trafficLayer.setMap(null)
    }
  }

  render() {
    return null
  }
}

export default TrafficLayer
