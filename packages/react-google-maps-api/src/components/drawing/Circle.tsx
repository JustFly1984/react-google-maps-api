import { PureComponent } from "react"

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "../../utils/helper"

import MapContext from "../../map-context"

const eventMap = {
  onCenterChanged: "center_changed",
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
  onRadiusChanged: "radius_changed",
  onRightClick: "rightclick"
}

const updaterMap = {
  center(instance: google.maps.Circle, center: google.maps.LatLng) {
    instance.setCenter(center)
  },
  draggable(instance: google.maps.Circle, draggable: boolean) {
    instance.setDraggable(draggable)
  },
  editable(instance: google.maps.Circle, editable: boolean) {
    instance.setEditable(editable)
  },
  map(instance: google.maps.Circle, map: google.maps.Map) {
    instance.setMap(map)
  },
  options(instance: google.maps.Circle, options: google.maps.CircleOptions) {
    instance.setOptions(options)
  },
  radius(instance: google.maps.Circle, radius: number) {
    instance.setRadius(radius)
  },
  visible(instance: google.maps.Circle, visible: boolean) {
    instance.setVisible(visible)
  }
}

interface CircleState {
  circle?: google.maps.Circle
}

interface CircleProps {
  options: google.maps.CircleOptions
  center: google.maps.LatLng | google.maps.LatLngLiteral
  radius: number
  draggable: boolean
  editable: boolean
  visible: boolean
  onDblClick: (e: MouseEvent) => void
  onDragEnd: (e: MouseEvent) => void
  onDragStart: (e: MouseEvent) => void
  onMouseDown: (e: MouseEvent) => void
  onMouseMove: (e: MouseEvent) => void
  onMouseOut: (e: MouseEvent) => void
  onMouseOver: (e: MouseEvent) => void
  onMouseUp: (e: MouseEvent) => void
  onRightClick: (e: MouseEvent) => void
  onCenterChanged: () => void
  onClick: (e: MouseEvent) => void
  onDrag: (e: MouseEvent) => void
  onRadiusChanged: () => void
}

export class Circle extends PureComponent<CircleProps, CircleState> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: CircleState = {
    circle: null
  }

  componentDidMount = () => {
    const circle = new google.maps.Circle({
      ...this.props.options,
      map: this.context
    })

    this.setState(
      () => ({
        circle
      }),
      () => {
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap,
          eventMap,
          prevProps: {},
          nextProps: this.props,
          instance: this.state.circle
        })
      }
    )
  }

  componentDidUpdate = (prevProps: CircleProps) => {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.circle
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)

    this.state.circle && this.state.circle.setMap(null)
  }

  render = (): any => null

  getBounds = () => this.state.circle.getBounds()

  getCenter = () => this.state.circle.getCenter()

  getDraggable = () => this.state.circle.getDraggable()

  getEditable = () => this.state.circle.getEditable()

  getMap = () => this.state.circle.getMap()

  getRadius = () => this.state.circle.getRadius()

  getVisible = () => this.state.circle.getVisible()
}

export default Circle
