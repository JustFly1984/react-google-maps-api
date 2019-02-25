import { PureComponent } from "react"

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "../../utils/helper"
import MapContext from "../../map-context"

const eventMap = {
  onBoundsChanged: "bounds_changed",
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
  bounds(
    instance: google.maps.Rectangle,
    bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral
  ) {
    instance.setBounds(bounds)
  },
  draggable(instance: google.maps.Rectangle, draggable: boolean) {
    instance.setDraggable(draggable)
  },
  editable(instance: google.maps.Rectangle, editable: boolean) {
    instance.setEditable(editable)
  },
  map(instance: google.maps.Rectangle, map: google.maps.Map) {
    instance.setMap(map)
  },
  options(
    instance: google.maps.Rectangle,
    options: google.maps.RectangleOptions
  ) {
    instance.setOptions(options)
  },
  visible(instance: google.maps.Rectangle, visible: boolean) {
    instance.setVisible(visible)
  }
}

interface RectangleState {
  rectangle?: google.maps.Rectangle
}

interface RectangleProps {
  options?: google.maps.RectangleOptions
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral
  draggable?: boolean
  editable?: boolean
  visible?: boolean
  clickable?: boolean
  onDblClick?: (e: MouseEvent) => void
  onDragEnd?: (e: MouseEvent) => void
  onDragStart?: (e: MouseEvent) => void
  onMouseDown?: (e: MouseEvent) => void
  onMouseMove?: (e: MouseEvent) => void
  onMouseOut?: (e: MouseEvent) => void
  onMouseOver?: (e: MouseEvent) => void
  onMouseUp?: (e: MouseEvent) => void
  onRightClick?: (e: MouseEvent) => void
  onClick?: (e: MouseEvent) => void
  onDrag?: (e: MouseEvent) => void
  onBoundsChanged?: () => void
}

export class Rectangle extends PureComponent<RectangleProps, RectangleState> {
  static contextType = MapContext

  static defaultProps: RectangleProps = {
    draggable: false,
    editable: false,
    visible: true
  }

  registeredEvents: google.maps.MapsEventListener[] = []

  state: RectangleState = {
    rectangle: null
  }

  componentDidMount = () => {
    const rectangle = new google.maps.Rectangle({
      ...this.props.options,
      map: this.context
    })

    this.setState(
      () => ({
        rectangle
      }),
      () => {
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap,
          eventMap,
          prevProps: {},
          nextProps: this.props,
          instance: this.state.rectangle
        })
      }
    )
  }

  componentDidUpdate = (prevProps: RectangleProps) => {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.rectangle
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)

    this.state.rectangle && this.state.rectangle.setMap(null)
  }

  render = () => null

  getBounds = () => this.state.rectangle.getBounds()

  getDraggable = () => this.state.rectangle.getDraggable()

  getEditable = () => this.state.rectangle.getEditable()

  getMap = () => this.state.rectangle.getMap()

  getVisible = () => this.state.rectangle.getVisible()
}

export default Rectangle
