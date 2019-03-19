import * as React from "react"

import * as invariant from "invariant"

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
  heatmapLayer: google.maps.visualization.HeatmapLayer | null;
}

interface HeatmapLayerProps {
  data?:
    | google.maps.MVCArray<
        google.maps.LatLng | google.maps.visualization.WeightedLocation
      >
    | google.maps.LatLng[]
    | google.maps.visualization.WeightedLocation[];
  options?: google.maps.visualization.HeatmapLayerOptions;
  onLoad?: (heatmapLayer: google.maps.visualization.HeatmapLayer) => void;
}

export class HeatmapLayer extends React.PureComponent<
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
    const heatmapLayer = new google.maps.visualization.HeatmapLayer(
      // @ts-ignore
      typeof this.props.options === 'object'
        ? {
          ...this.props.options,
          map: this.context
        }
        : {
          map: this.context
        }
      )

    this.setState(
      () => ({
        heatmapLayer
      }),
      () => {
        if (this.state.heatmapLayer !== null) {
          this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap,
            eventMap,
            prevProps: {},
            nextProps: this.props,
            instance: this.state.heatmapLayer
          })

          if (this.props.onLoad) {
            this.props.onLoad(this.state.heatmapLayer)
          }
        }
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
}

export default HeatmapLayer
