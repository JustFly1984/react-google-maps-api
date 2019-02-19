import { PureComponent } from "react"

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "../../utils/helper"

import MapContext from "../../map-context"

const eventMap = {
  onAddFeature: "addfeature",
  onClick: "click",
  onDblClick: "dblclick",
  onMouseDown: "mousedown",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseUp: "mouseup",
  onRemoveFeature: "removefeature",
  onRemoveProperty: "removeproperty",
  onRightClick: "rightclick",
  onSetGeometry: "setgeometry",
  onSetProperty: "setproperty"
}

const updaterMap = {
  add(
    instance: google.maps.Data,
    features: google.maps.Data.Feature | google.maps.Data.FeatureOptions
  ) {
    instance.add(features)
  },
  addgeojson(
    instance: google.maps.Data,
    geojson: Object,
    options?: google.maps.Data.GeoJsonOptions
  ) {
    instance.addGeoJson(geojson, options)
  },
  contains(instance: google.maps.Data, feature: google.maps.Data.Feature) {
    instance.contains(feature)
  },
  foreach(
    instance: google.maps.Data,
    callback: (feature: google.maps.Data.Feature) => void
  ) {
    instance.forEach(callback)
  },
  loadgeojson(
    instance: google.maps.Data,
    url: string,
    options: google.maps.Data.GeoJsonOptions,
    callback: (features: google.maps.Data.Feature[]) => void
  ) {
    instance.loadGeoJson(url, options, callback)
  },
  overridestyle(
    instance: google.maps.Data,
    feature: google.maps.Data.Feature,
    style: google.maps.Data.StyleOptions
  ) {
    instance.overrideStyle(feature, style)
  },
  remove(instance: google.maps.Data, feature: google.maps.Data.Feature) {
    instance.remove(feature)
  },
  revertstyle(instance: google.maps.Data, feature: google.maps.Data.Feature) {
    instance.revertStyle(feature)
  },
  controlposition(
    instance: google.maps.Data,
    controlPosition // TODO: ???
  ) {
    instance.setControlPosition(controlPosition)
  },
  controls(
    instance: google.maps.Data,
    controls: google.maps.DrawingMode[] | null
  ) {
    instance.setControls(controls)
  },
  drawingmode(instance: google.maps.Data, mode: google.maps.DrawingMode) {
    instance.setDrawingMode(mode)
  },
  map(instance: google.maps.Data, map: google.maps.Map) {
    instance.setMap(map)
  },
  style(
    instance: google.maps.Data,
    style: google.maps.Data.StylingFunction | google.maps.Data.StyleOptions
  ) {
    instance.setStyle(style)
  },
  togeojson(instance: google.maps.Data, callback: (feature: Object) => void) {
    instance.toGeoJson(callback)
  }
}

interface DataState {
  data?: google.maps.Data
}
interface DataProps {
  options?: google.maps.Data.DataOptions
  onAddFeature?: (e: google.maps.Data.AddFeatureEvent) => void
  onClick?: (e: MouseEvent) => void
  onDblClick?: (e: MouseEvent) => void
  onMouseDown?: (e: MouseEvent) => void
  onMouseOut?: (e: MouseEvent) => void
  onMouseOver?: (e: MouseEvent) => void
  onMouseUp?: (e: MouseEvent) => void
  onRemoveFeature?: (e: google.maps.Data.RemoveFeatureEvent) => void
  onRemoveProperty?: (e: google.maps.Data.RemovePropertyEvent) => void
  onRightClick?: (e: MouseEvent) => void
  onSetGeometry?: (e: google.maps.Data.SetGeometryEvent) => void
  onSetProperty?: (e: google.maps.Data.SetPropertyEvent) => void
}

export class Data extends PureComponent<DataProps, DataState> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: DataState = {
    data: null
  }

  componentDidMount = () => {
    const data = new google.maps.Data({
      ...this.props.options,
      map: this.context
    })

    this.setState({ data })
  }

  componentDidUpdate = (prevProps: DataProps) => {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.data
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)

    if (this.state.data) {
      this.state.data.setMap(null)
    }
  }

  render = () => null

  getControlPosition = () => this.state.data.getControlPosition()

  getControls = () => this.state.data.getControls()

  getDrawingMode = () => this.state.data.getDrawingMode()

  getFeatureById = (id: number | string) => this.state.data.getFeatureById(id)

  getMap = () => this.state.data.getMap()

  getStyle = () => this.state.data.getStyle()
}

export default Data
