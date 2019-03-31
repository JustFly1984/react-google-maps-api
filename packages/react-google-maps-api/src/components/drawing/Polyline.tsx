import * as React from "react"

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
  draggable(instance: google.maps.Polyline, draggable: boolean) {
    instance.setDraggable(draggable)
  },
  editable(instance: google.maps.Polyline, editable: boolean) {
    instance.setEditable(editable)
  },
  map(instance: google.maps.Polyline, map: google.maps.Map) {
    instance.setMap(map)
  },
  options(
    instance: google.maps.Polyline,
    options: google.maps.PolylineOptions
  ) {
    instance.setOptions(options)
  },
  path(
    instance: google.maps.Polyline,
    path:
      | google.maps.MVCArray<google.maps.LatLng>
      | google.maps.LatLng[]
      | google.maps.LatLngLiteral[]
  ) {
    instance.setPath(path)
  },
  visible(instance: google.maps.Polyline, visible: boolean) {
    instance.setVisible(visible)
  }
}

interface PolylineState {
  polyline: google.maps.Polyline | null
}

interface PolylineProps {
  options: google.maps.PolylineOptions
  draggable: boolean
  editable: boolean
  visible: boolean
  path:
    | google.maps.MVCArray<google.maps.LatLng>
    | google.maps.LatLng[]
    | google.maps.LatLngLiteral[]
  onDblClick: (e: google.maps.MouseEvent) => void
  onDragEnd: (e: google.maps.MouseEvent) => void
  onDragStart: (e: google.maps.MouseEvent) => void
  onMouseDown: (e: google.maps.MouseEvent) => void
  onMouseMove: (e: google.maps.MouseEvent) => void
  onMouseOut: (e: google.maps.MouseEvent) => void
  onMouseOver: (e: google.maps.MouseEvent) => void
  onMouseUp: (e: google.maps.MouseEvent) => void
  onRightClick: (e: google.maps.MouseEvent) => void
  onClick: (e: google.maps.MouseEvent) => void
  onDrag: (e: google.maps.MouseEvent) => void
  onLoad: (polyline: google.maps.Polyline) => void
}

export class Polyline extends React.PureComponent<
  PolylineProps,
  PolylineState
> {
  public static defaultProps = {
    options: {},
    onLoad: () => {}
  }
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: PolylineState = {
    polyline: null
  }

  componentDidMount = () => {
    const polyline = new google.maps.Polyline({
      ...this.props.options,
      map: this.context
    })

    this.setState(
      () => ({
        polyline
      }),
      () => {
        if (this.state.polyline !== null) {
          this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap,
            eventMap,
            prevProps: {},
            nextProps: this.props,
            instance: this.state.polyline
          })

          this.props.onLoad(this.state.polyline)
        }
      }
    )
  }

  componentDidUpdate = (prevProps: PolylineProps) => {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.polyline
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)

    this.state.polyline && this.state.polyline.setMap(null)
  }

  render = () => <></>
}

export default Polyline
