import * as React from "react"
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
    data: google.maps.MVCArray<google.maps.LatLng | google.maps.visualization.WeightedLocation> | google.maps.LatLng[] | google.maps.visualization.WeightedLocation[]
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
    instance.setOptions(options)
  }
}

interface HeatmapLayerState {
  heatmapLayer: google.maps.visualization.HeatmapLayer | null;
}

export interface HeatmapLayerProps {
  // required
  /** The data points to display. Required. */
  data: google.maps.MVCArray<google.maps.LatLng | google.maps.visualization.WeightedLocation> | google.maps.LatLng[] | google.maps.visualization.WeightedLocation[];
  options?: google.maps.visualization.HeatmapLayerOptions;
  /** This callback is called when the heatmapLayer instance has loaded. It is called with the heatmapLayer instance. */
  onLoad?: (heatmapLayer: google.maps.visualization.HeatmapLayer) => void;
  /** This callback is called when the component unmounts. It is called with the heatmapLayer instance. */
  onUnmount?: (heatmapLayer: google.maps.visualization.HeatmapLayer) => void;
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

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  setHeatmapLayerCallback = () => {
    if (this.state.heatmapLayer !== null && this.props.onLoad) {
      this.props.onLoad(this.state.heatmapLayer)
    }
  }

  componentDidMount() {
    invariant(
      !!google.maps.visualization,
      'Did you include prop libraries={["visualization"]} to <LoadScript />? %s',
      google.maps.visualization
    )

    invariant(
      !!this.props.data,
      "data property is required in HeatmapLayer %s",
      this.props.data
    )

    const heatmapLayer = new google.maps.visualization.HeatmapLayer({
      data: this.props.data,
      ...(this.props.options || {}),
      map: this.context
    })

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: heatmapLayer
    })

    function setHeatmapLayer() {
      return {
        heatmapLayer
      }
    }

    this.setState(
      setHeatmapLayer,
      this.setHeatmapLayerCallback
    )
  }

  componentDidUpdate(prevProps: HeatmapLayerProps) {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.heatmapLayer
    })
  }

  componentWillUnmount() {
    if (this.state.heatmapLayer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.heatmapLayer)
      }

      unregisterEvents(this.registeredEvents)

      this.state.heatmapLayer.setMap(null)
    }
  }

  render() {
    return null
  }
}

export default HeatmapLayer
