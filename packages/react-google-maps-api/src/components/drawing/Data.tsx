import * as React from 'react'

import { unregisterEvents, applyUpdatersToPropsAndRegisterEvents } from '../../utils/helper'

import MapContext from '../../map-context'

const eventMap = {
  onAddFeature: 'addfeature',
  onClick: 'click',
  onDblClick: 'dblclick',
  onMouseDown: 'mousedown',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onRemoveFeature: 'removefeature',
  onRemoveProperty: 'removeproperty',
  onRightClick: 'rightclick',
  onSetGeometry: 'setgeometry',
  onSetProperty: 'setproperty',
}

const updaterMap = {
  add(
    instance: google.maps.Data,
    features: google.maps.Data.Feature | google.maps.Data.FeatureOptions
  ): void {
    instance.add(features)
  },
  addgeojson(
    instance: google.maps.Data,
    geojson: object,
    options?: google.maps.Data.GeoJsonOptions
  ): void {
    instance.addGeoJson(geojson, options)
  },
  contains(instance: google.maps.Data, feature: google.maps.Data.Feature): void {
    instance.contains(feature)
  },
  foreach(instance: google.maps.Data, callback: (feature: google.maps.Data.Feature) => void): void {
    instance.forEach(callback)
  },
  loadgeojson(
    instance: google.maps.Data,
    url: string,
    options: google.maps.Data.GeoJsonOptions,
    callback: (features: google.maps.Data.Feature[]) => void
  ): void {
    instance.loadGeoJson(url, options, callback)
  },
  overridestyle(
    instance: google.maps.Data,
    feature: google.maps.Data.Feature,
    style: google.maps.Data.StyleOptions
  ): void {
    instance.overrideStyle(feature, style)
  },
  remove(instance: google.maps.Data, feature: google.maps.Data.Feature): void {
    instance.remove(feature)
  },
  revertstyle(instance: google.maps.Data, feature: google.maps.Data.Feature): void {
    instance.revertStyle(feature)
  },
  controlposition(instance: google.maps.Data, controlPosition: google.maps.ControlPosition): void {
    instance.setControlPosition(controlPosition)
  },
  controls(instance: google.maps.Data, controls: string[] | null): void {
    instance.setControls(controls)
  },
  drawingmode(instance: google.maps.Data, mode: string | null): void {
    instance.setDrawingMode(mode)
  },
  map(instance: google.maps.Data, map: google.maps.Map): void {
    instance.setMap(map)
  },
  style(
    instance: google.maps.Data,
    style: google.maps.Data.StylingFunction | google.maps.Data.StyleOptions
  ): void {
    instance.setStyle(style)
  },
  togeojson(instance: google.maps.Data, callback: (feature: object) => void): void {
    instance.toGeoJson(callback)
  },
}

interface DataState {
  data: google.maps.Data | null
}
export interface DataProps {
  options?: google.maps.Data.DataOptions
  /**  This event is fired when a feature is added to the collection. */
  onAddFeature?: (e: google.maps.Data.AddFeatureEvent) => void
  /**  This event is fired for a click on the geometry. */
  onClick?: (e: google.maps.Data.MouseEvent) => void
  /**  This event is fired for a double click on the geometry. */
  onDblClick?: (e: google.maps.Data.MouseEvent) => void
  /**  This event is fired for a mousedown on the geometry. */
  onMouseDown?: (e: google.maps.Data.MouseEvent) => void
  /**  This event is fired when the mouse leaves the area of the geometry. */
  onMouseOut?: (e: google.maps.Data.MouseEvent) => void
  /**  This event is fired when the mouse enters the area of the geometry. */
  onMouseOver?: (e: google.maps.Data.MouseEvent) => void
  /**  This event is fired for a mouseup on the geometry. */
  onMouseUp?: (e: google.maps.Data.MouseEvent) => void
  /**  This event is fired when a feature is removed from the collection. */
  onRemoveFeature?: (e: google.maps.Data.RemoveFeatureEvent) => void
  /**  This event is fired when a feature's property is removed. */
  onRemoveProperty?: (e: google.maps.Data.RemovePropertyEvent) => void
  /**  This event is fired for a rightclick on the geometry. */
  onRightClick?: (e: google.maps.Data.MouseEvent) => void
  /**  This event is fired when a feature's geometry is set. */
  onSetGeometry?: (e: google.maps.Data.SetGeometryEvent) => void
  /**  This event is fired when a feature's property is set. */
  onSetProperty?: (e: google.maps.Data.SetPropertyEvent) => void
  /**  This callback is called when the data instance has loaded. It is called with the data instance. */
  onLoad?: (data: google.maps.Data) => void
  /**  This callback is called when the component unmounts. It is called with the data instance.  */
  onUnmount?: (data: google.maps.Data) => void
}

export class Data extends React.PureComponent<DataProps, DataState> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: DataState = {
    data: null,
  }

  setDataCallback = (): void => {
    if (this.state.data !== null && this.props.onLoad) {
      this.props.onLoad(this.state.data)
    }
  }

  componentDidMount(): void {
    const data = new google.maps.Data({
      ...(this.props.options || {}),
      map: this.context,
    })

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: data,
    })

    this.setState(function setData() {
      return {
        data,
      }
    }, this.setDataCallback)
  }

  componentDidUpdate(prevProps: DataProps): void {
    if (this.state.data !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.data,
      })
    }
  }

  componentWillUnmount(): void {
    if (this.state.data !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.data)
      }

      unregisterEvents(this.registeredEvents)

      if (this.state.data) {
        this.state.data.setMap(null)
      }
    }
  }

  render(): null {
    return null
  }
}

export default Data
