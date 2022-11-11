import invariant from 'invariant';
import { ContextType, memo, PureComponent, useContext, useEffect, useState } from 'react';

import MapContext from '../../map-context';
import { applyUpdatersToPropsAndRegisterEvents, unregisterEvents } from '../../utils/helper';

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
  ): void {
    instance.setData(data)
  },
  map(
    instance: google.maps.visualization.HeatmapLayer,
    map: google.maps.Map
  ): void {
    instance.setMap(map)
  },
  options(
    instance: google.maps.visualization.HeatmapLayer,
    options: google.maps.visualization.HeatmapLayerOptions
  ): void {
    instance.setOptions(options)
  },
}

interface HeatmapLayerState {
  heatmapLayer: google.maps.visualization.HeatmapLayer | null
}

export interface HeatmapLayerProps {
  // required
  /** The data points to display. Required. */
  data:
    | google.maps.MVCArray<
        google.maps.LatLng | google.maps.visualization.WeightedLocation
      >
    | google.maps.LatLng[]
    | google.maps.visualization.WeightedLocation[]
  options?: google.maps.visualization.HeatmapLayerOptions | undefined
  /** This callback is called when the heatmapLayer instance has loaded. It is called with the heatmapLayer instance. */
  onLoad?:
    | ((heatmapLayer: google.maps.visualization.HeatmapLayer) => void)
    | undefined
  /** This callback is called when the component unmounts. It is called with the heatmapLayer instance. */
  onUnmount?:
    | ((heatmapLayer: google.maps.visualization.HeatmapLayer) => void)
    | undefined
}

function HeatmapLayerFunctional({
  data,
  onLoad,
  onUnmount,
  options,
}: HeatmapLayerProps) {
  const map = useContext(MapContext)
  const [instance, setInstance] =
    useState<google.maps.visualization.HeatmapLayer | null>(null)

  useEffect(() => {
    if (!google.maps.visualization) {
      invariant(
        !!google.maps.visualization,
        'Did you include prop libraries={["visualization"]} in useJsApiScript? %s',
        google.maps.visualization
      )
    }
  }, [])

  useEffect(() => {
    invariant(!!data, 'data property is required in HeatmapLayer %s', data)
  }, [data])

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
    const heatmapLayer = new google.maps.visualization.HeatmapLayer({
      ...(options || {}),
      data,
      map,
    })

    setInstance(heatmapLayer)

    if (onLoad) {
      onLoad(heatmapLayer)
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

export const HeatmapLayerF = memo(HeatmapLayerFunctional)

export class HeatmapLayer extends PureComponent<
  HeatmapLayerProps,
  HeatmapLayerState
> {
  static contextType = MapContext
  declare context: ContextType<typeof MapContext>

  registeredEvents: google.maps.MapsEventListener[] = []

  state: HeatmapLayerState = {
    heatmapLayer: null,
  }

  setHeatmapLayerCallback = (): void => {
    if (this.state.heatmapLayer !== null && this.props.onLoad) {
      this.props.onLoad(this.state.heatmapLayer)
    }
  }

  componentDidMount(): void {
    invariant(
      !!google.maps.visualization,
      'Did you include prop libraries={["visualization"]} to <LoadScript />? %s',
      google.maps.visualization
    )

    invariant(
      !!this.props.data,
      'data property is required in HeatmapLayer %s',
      this.props.data
    )

    const heatmapLayer = new google.maps.visualization.HeatmapLayer({
      ...(this.props.options || {}),
      data: this.props.data,
      map: this.context,
    })

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: heatmapLayer,
    })

    this.setState(function setHeatmapLayer() {
      return {
        heatmapLayer,
      }
    }, this.setHeatmapLayerCallback)
  }

  componentDidUpdate(prevProps: HeatmapLayerProps): void {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.heatmapLayer,
    })
  }

  componentWillUnmount(): void {
    if (this.state.heatmapLayer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.heatmapLayer)
      }

      unregisterEvents(this.registeredEvents)

      this.state.heatmapLayer.setMap(null)
    }
  }

  render(): null {
    return null
  }
}

export default HeatmapLayer
