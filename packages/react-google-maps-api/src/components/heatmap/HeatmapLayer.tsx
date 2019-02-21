import { PureComponent } from "react"
//@ts-ignore
import invariant from "invariant"

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "../../utils/helper"

import MapContext from "../../map-context"

const eventMap = {}

const updaterMap = {
  data(
    instance: google.maps.visualization.HeatmapLayer,
    data:
      | google.maps.MVCArray<
          google.maps.LatLng | google.maps.visualization.WeightedLocation
        >
      | google.maps.LatLng[]
      | google.maps.visualization.WeightedLocation[]
  ) {
    instance.setData(data)
  },
  map(instance: google.maps.visualization.HeatmapLayer, map: google.maps.Map) {
    instance.setMap(map)
  },
  options(
    instance: google.maps.visualization.HeatmapLayer,
    options: google.maps.visualization.HeatmapLayerOptions
  ) {
    // TODO: add to official typings
    //@ts-ignore
    instance.setOptions(options)
  }
}

interface HeatmapLayerState {
  heatmapLayer?: google.maps.visualization.HeatmapLayer
}

interface HeatmapLayerProps {
  data?:
    | google.maps.MVCArray<
        google.maps.LatLng | google.maps.visualization.WeightedLocation
      >
    | google.maps.LatLng[]
    | google.maps.visualization.WeightedLocation[]
  options?: google.maps.visualization.HeatmapLayerOptions
}

export class HeatmapLayer extends PureComponent<
  HeatmapLayerProps,
  HeatmapLayerState
> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: HeatmapLayerState = {
    heatmapLayer: null
  }

  constructor(props: HeatmapLayerProps) {
    super(props)

    invariant(
      google.maps.visualization,
      'Did you include "visualization" in the libraries array prop in <LoadScript />?'
    )
  }

  componentDidMount = () => {
    const heatmapLayer = new google.maps.visualization.HeatmapLayer({
      ...this.props.options,
      map: this.context
    })

    this.setState(
      () => ({
        heatmapLayer
      }),
      () => {
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap,
          eventMap,
          prevProps: {},
          nextProps: this.props,
          instance: this.state.heatmapLayer
        })
      }
    )
  }

  componentDidUpdate = (prevProps: HeatmapLayerProps) => {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.heatmapLayer
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)

    if (this.state.heatmapLayer) {
      this.state.heatmapLayer.setMap(null)
    }
  }

  render = () => null

  getData = () => this.state.heatmapLayer.getData()

  getMap = () => this.state.heatmapLayer.getMap()
}

export default HeatmapLayer
