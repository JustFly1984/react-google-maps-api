/* global google */
import { PureComponent } from "react"

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "../../utils/helper"

import MapContext from "../../map-context"

const eventMap = {
  onClick: "click",
  onDblClick: "dblclick",
  onDrag: "drag",
  onDragEnd: "dragend",
  onDragStart: "dragstart",
  onMouseDown: "mousedown",
  onMouseMove: "mousemove",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseUp: "mouseup",
  onRightClick: "rightclick"
}

const updaterMap = {
  draggable(instance: google.maps.Polygon, draggable: boolean) {
    instance.setDraggable(draggable)
  },
  editable(instance: google.maps.Polygon, editable: boolean) {
    instance.setEditable(editable)
  },
  map(instance: google.maps.Polygon, map: google.maps.Map) {
    instance.setMap(map)
  },
  options(instance: google.maps.Polygon, options: google.maps.PolygonOptions) {
    instance.setOptions(options)
  },
  path(
    instance: google.maps.Polygon,
    path:
      | google.maps.MVCArray<google.maps.LatLng>
      | google.maps.LatLng[]
      | google.maps.LatLngLiteral[]
  ) {
    instance.setPath(path)
  },

  paths(
    instance: google.maps.Polygon,
    paths:
      | google.maps.MVCArray<google.maps.LatLng>
      | google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>>
      | google.maps.LatLng[]
      | google.maps.LatLng[][]
      | google.maps.LatLngLiteral[]
      | google.maps.LatLngLiteral[][]
  ) {
    instance.setPaths(paths)
  },

  visible(instance: google.maps.Polygon, visible: boolean) {
    instance.setVisible(visible)
  }
}

interface PolygonState {
  polygon?: google.maps.Polygon
}

interface PolygonProps {
  options: google.maps.PolygonOptions
  draggable: boolean
  editable: boolean
  visible: boolean
  path:
    | google.maps.MVCArray<google.maps.LatLng>
    | google.maps.LatLng[]
    | google.maps.LatLngLiteral[]
  paths:
    | google.maps.MVCArray<google.maps.LatLng>
    | google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>>
    | google.maps.LatLng[]
    | google.maps.LatLng[][]
    | google.maps.LatLngLiteral[]
    | google.maps.LatLngLiteral[][]
  onDblClick: (e: MouseEvent) => void
  onDragEnd: (e: MouseEvent) => void
  onDragStart: (e: MouseEvent) => void
  onMouseDown: (e: MouseEvent) => void
  onMouseMove: (e: MouseEvent) => void
  onMouseOut: (e: MouseEvent) => void
  onMouseOver: (e: MouseEvent) => void
  onMouseUp: (e: MouseEvent) => void
  onRightClick: (e: MouseEvent) => void
  onClick: (e: MouseEvent) => void
  onDrag: (e: MouseEvent) => void
}

export class Polygon extends PureComponent<PolygonProps, PolygonState> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: PolygonState = {
    polygon: null
  }

  componentDidMount = () => {
    const polygon = new google.maps.Polygon({
      ...this.props.options,
      map: this.context
    })

    this.setState(
      () => ({
        polygon
      }),
      () => {
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap,
          eventMap,
          prevProps: {},
          nextProps: this.props,
          instance: this.state.polygon
        })
      }
    )
  }

  componentDidUpdate = (prevProps: PolygonProps) => {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.polygon
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)

    this.state.polygon && this.state.polygon.setMap(null)
  }

  render = () => null

  getDraggable = () => this.state.polygon.getDraggable()

  getEditable = () => this.state.polygon.getEditable()

  getMap = () => this.state.polygon.getEditable()

  getPath = () => this.state.polygon.getMap()

  getPaths = () => this.state.polygon.getPaths()

  getVisible = () => this.state.polygon.getVisible()
}

export default Polygon
