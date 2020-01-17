import * as React from 'react'

import { unregisterEvents, applyUpdatersToPropsAndRegisterEvents } from '../../utils/helper'
import MapContext from '../../map-context'

const eventMap = {
  onBoundsChanged: 'bounds_changed',
  onClick: 'click',
  onDblClick: 'dblclick',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDragStart: 'dragstart',
  onMouseDown: 'mousedown',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onRightClick: 'rightclick',
}

const updaterMap = {
  bounds(
    instance: google.maps.Rectangle,
    bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral
  ): void {
    instance.setBounds(bounds)
  },
  draggable(instance: google.maps.Rectangle, draggable: boolean): void {
    instance.setDraggable(draggable)
  },
  editable(instance: google.maps.Rectangle, editable: boolean): void {
    instance.setEditable(editable)
  },
  map(instance: google.maps.Rectangle, map: google.maps.Map): void {
    instance.setMap(map)
  },
  options(instance: google.maps.Rectangle, options: google.maps.RectangleOptions): void {
    instance.setOptions(options)
  },
  visible(instance: google.maps.Rectangle, visible: boolean): void {
    instance.setVisible(visible)
  },
}

interface RectangleState {
  rectangle: google.maps.Rectangle | null
}

export interface RectangleProps {
  options?: google.maps.RectangleOptions
  /** Sets the bounds of this rectangle. */
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral
  /** If set to true, the user can drag this rectangle over the map. */
  draggable?: boolean
  /** If set to true, the user can edit this rectangle by dragging the control points shown at the corners and on each edge. */
  editable?: boolean
  /** Hides this rectangle if set to false. */
  visible?: boolean
  /** Indicates whether this Rectangle handles mouse events. Defaults to true. */
  clickable?: boolean
  /** This event is fired when the DOM dblclick event is fired on the rectangle. */
  onDblClick?: (e: google.maps.MouseEvent) => void
  /** This event is fired when the user stops dragging the rectangle. */
  onDragEnd?: (e: google.maps.MouseEvent) => void
  /** This event is fired when the user starts dragging the rectangle. */
  onDragStart?: (e: google.maps.MouseEvent) => void
  /** This event is fired when the DOM mousedown event is fired on the rectangle. */
  onMouseDown?: (e: google.maps.MouseEvent) => void
  /** This event is fired when the DOM mousemove event is fired on the rectangle. */
  onMouseMove?: (e: google.maps.MouseEvent) => void
  /** This event is fired on rectangle mouseout. */
  onMouseOut?: (e: google.maps.MouseEvent) => void
  /** This event is fired on rectangle mouseover. */
  onMouseOver?: (e: google.maps.MouseEvent) => void
  /** This event is fired when the DOM mouseup event is fired on the rectangle. */
  onMouseUp?: (e: google.maps.MouseEvent) => void
  /** This event is fired when the rectangle is right-clicked on. */
  onRightClick?: (e: google.maps.MouseEvent) => void
  /** This event is fired when the DOM click event is fired on the rectangle. */
  onClick?: (e: google.maps.MouseEvent) => void
  /** This event is repeatedly fired while the user drags the rectangle. */
  onDrag?: (e: google.maps.MouseEvent) => void
  /** This event is fired when the rectangle's bounds are changed. */
  onBoundsChanged?: () => void
  /** This callback is called when the rectangle instance has loaded. It is called with the rectangle instance. */
  onLoad?: (rectangle: google.maps.Rectangle) => void
  /** This callback is called when the component unmounts. It is called with the rectangle instance. */
  onUnmount?: (rectangle: google.maps.Rectangle) => void
}

export class Rectangle extends React.PureComponent<RectangleProps, RectangleState> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: RectangleState = {
    rectangle: null,
  }

  setRectangleCallback = (): void => {
    if (this.state.rectangle !== null && this.props.onLoad) {
      this.props.onLoad(this.state.rectangle)
    }
  }

  componentDidMount(): void {
    const rectangle = new google.maps.Rectangle({
      ...(this.props.options || {}),
      map: this.context,
    })

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: rectangle,
    })

    this.setState(function setRectangle() {
      return {
        rectangle,
      }
    }, this.setRectangleCallback)
  }

  componentDidUpdate(prevProps: RectangleProps): void {
    if (this.state.rectangle !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.rectangle,
      })
    }
  }

  componentWillUnmount(): void {
    if (this.state.rectangle !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.rectangle)
      }

      unregisterEvents(this.registeredEvents)

      this.state.rectangle.setMap(null)
    }
  }

  render(): React.ReactNode {
    return <></>
  }
}

export default Rectangle
