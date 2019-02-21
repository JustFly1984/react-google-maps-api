import { PureComponent } from "react"

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "../../utils/helper"

import MapContext from "../../map-context"

const eventMap = {
  onAnimationChanged: "animation_changed",
  onClick: "click",
  onClickableChanged: "clickable_changed",
  onCursorChanged: "cursor_changed",
  onDblClick: "dblclick",
  onDrag: "drag",
  onDragEnd: "dragend",
  onDraggableChanged: "draggable_changed",
  onDragStart: "dragstart",
  onFlatChanged: "flat_changed",
  onIconChanged: "icon_changed",
  onMouseDown: "mousedown",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseUp: "mouseup",
  onPositionChanged: "position_changed",
  onRightClick: "rightclick",
  onShapeChanged: "shape_changed",
  onTitleChanged: "title_changed",
  onVisibleChanged: "visible_changed",
  onZindexChanged: "zindex_changed"
}

const updaterMap = {
  animation(instance: google.maps.Marker, animation: google.maps.Animation) {
    instance.setAnimation(animation)
  },
  clickable(instance: google.maps.Marker, clickable: boolean) {
    instance.setClickable(clickable)
  },
  cursor(instance: google.maps.Marker, cursor: string) {
    instance.setCursor(cursor)
  },
  draggable(instance: google.maps.Marker, draggable: boolean) {
    instance.setDraggable(draggable)
  },
  icon(
    instance: google.maps.Marker,
    icon: string | google.maps.Icon | google.maps.Symbol
  ) {
    instance.setIcon(icon)
  },
  label(instance: google.maps.Marker, label: string | google.maps.MarkerLabel) {
    instance.setLabel(label)
  },
  map(instance: google.maps.Marker, map: google.maps.Map) {
    instance.setMap(map)
  },
  opacity(instance: google.maps.Marker, opacity: number) {
    instance.setOpacity(opacity)
  },
  options(instance: google.maps.Marker, options: google.maps.MarkerOptions) {
    instance.setOptions(options)
  },
  position(
    instance: google.maps.Marker,
    position: google.maps.LatLng | google.maps.LatLngLiteral
  ) {
    instance.setPosition(position)
  },
  shape(instance: google.maps.Marker, shape: google.maps.MarkerShape) {
    instance.setShape(shape)
  },
  title(instance: google.maps.Marker, title: string) {
    instance.setTitle(title)
  },
  visible(instance: google.maps.Marker, visible: boolean) {
    instance.setVisible(visible)
  },
  zIndex(instance: google.maps.Marker, zIndex: number) {
    instance.setZIndex(zIndex)
  }
}

interface MarkerState {
  marker?: google.maps.Marker
}

interface MarkerProps {
  options?: google.maps.MapOptions
  animation?: google.maps.Animation
  clickable?: boolean
  cursor?: string
  draggable?: string
  icon?: string | google.maps.Icon | google.maps.Symbol
  label?: string | google.maps.MarkerLabel
  opacity?: number
  position: google.maps.LatLng | google.maps.LatLngLiteral
  shape?: google.maps.MarkerShape
  title?: string
  visible?: boolean
  zIndex?: number
  onClick?: (e: MouseEvent) => void
  onClickableChanged?: () => void
  onCursorChanged?: () => void
  onAnimationChanged?: () => void
  onDblClick?: (e: MouseEvent) => void
  onDrag?: (e: MouseEvent) => void
  onDragEnd?: (e: MouseEvent) => void
  onDraggableChanged?: () => void
  onDragStart?: (e: MouseEvent) => void
  onFlatChanged?: () => void
  onIconChanged?: () => void
  onMouseDown?: (e: MouseEvent) => void
  onMouseOut?: (e: MouseEvent) => void
  onMouseOver?: (e: MouseEvent) => void
  onMouseUp?: (e: MouseEvent) => void
  onPositionChanged?: () => void
  onRightClick?: (e: MouseEvent) => void
  onShapeChanged?: () => void
  onTitleChanged?: () => void
  onVisibleChanged?: () => void
  onZindexChanged?: () => void
}

export class Marker extends PureComponent<MarkerProps, MarkerState> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: MarkerState = {
    marker: null
  }

  componentDidMount = () => {
    const marker = new google.maps.Marker({
      ...this.props.options,
      map: this.context,
      position: this.props.position
    })

    this.setState(
      () => ({
        marker
      }),
      () => {
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap,
          eventMap,
          prevProps: {},
          nextProps: this.props,
          instance: this.state.marker
        })
      }
    )
  }

  componentDidUpdate = (prevProps: MarkerProps) => {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.marker
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)

    this.state.marker && this.state.marker.setMap(null)
  }

  render = () => (this.props.children ? this.props.children : null)

  getAnimation = () => this.state.marker.getAnimation()

  getClickable = () => this.state.marker.getClickable()

  getCursor = () => this.state.marker.getCursor()

  getDraggable = () => this.state.marker.getDraggable()

  getIcon = () => this.state.marker.getIcon()

  getLabel = () => this.state.marker.getLabel()

  getMap = () => this.state.marker.getMap()

  getOpacity = () => this.state.marker.getOpacity()

  getPosition = () => this.state.marker.getPosition()

  getShape = () => this.state.marker.getShape()

  getTitle = () => this.state.marker.getTitle()

  getVisible = () => this.state.marker.getVisible()

  getZIndex = () => this.state.marker.getZIndex()
}

export default Marker
