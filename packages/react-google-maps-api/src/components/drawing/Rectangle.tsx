import {
  memo,
  useState,
  useEffect,
  useContext,
  PureComponent,
  type ContextType,
} from 'react'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents,
} from '../../utils/helper.js'

import MapContext from '../../map-context.js'

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
  options(
    instance: google.maps.Rectangle,
    options: google.maps.RectangleOptions
  ): void {
    instance.setOptions(options)
  },
  visible(instance: google.maps.Rectangle, visible: boolean): void {
    instance.setVisible(visible)
  },
}

type RectangleState = {
  rectangle: google.maps.Rectangle | null
}

export type RectangleProps = {
  options?: google.maps.RectangleOptions | undefined
  /** Sets the bounds of this rectangle. */
  bounds?:
    | google.maps.LatLngBounds
    | google.maps.LatLngBoundsLiteral
    | undefined
  /** If set to true, the user can drag this rectangle over the map. */
  draggable?: boolean | undefined
  /** If set to true, the user can edit this rectangle by dragging the control points shown at the corners and on each edge. */
  editable?: boolean | undefined
  /** Hides this rectangle if set to false. */
  visible?: boolean | undefined
  /** @deprecated Indicates whether this Rectangle handles mouse events. Defaults to true. Does not exist on RectangleF component. In google-maps-api types it belongs to options! update options.clickable instead! */
  clickable?: boolean | undefined
  /** This event is fired when the DOM dblclick event is fired on the rectangle. */
  onDblClick?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the user stops dragging the rectangle. */
  onDragEnd?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the user starts dragging the rectangle. */
  onDragStart?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the DOM mousedown event is fired on the rectangle. */
  onMouseDown?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the DOM mousemove event is fired on the rectangle. */
  onMouseMove?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired on rectangle mouseout. */
  onMouseOut?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired on rectangle mouseover. */
  onMouseOver?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the DOM mouseup event is fired on the rectangle. */
  onMouseUp?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the rectangle is right-clicked on. */
  onRightClick?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the DOM click event is fired on the rectangle. */
  onClick?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is repeatedly fired while the user drags the rectangle. */
  onDrag?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the rectangle's bounds are changed. */
  onBoundsChanged?: (() => void) | undefined
  /** This callback is called when the rectangle instance has loaded. It is called with the rectangle instance. */
  onLoad?: ((rectangle: google.maps.Rectangle) => void) | undefined
  /** This callback is called when the component unmounts. It is called with the rectangle instance. */
  onUnmount?: ((rectangle: google.maps.Rectangle) => void) | undefined
}

function RectangleFunctional({
  options,
  bounds,
  draggable,
  editable,
  visible,
  onDblClick,
  onDragEnd,
  onDragStart,
  onMouseDown,
  onMouseMove,
  onMouseOut,
  onMouseOver,
  onMouseUp,
  onRightClick,
  onClick,
  onDrag,
  onBoundsChanged,
  onLoad,
  onUnmount,
}: RectangleProps): null {
  const map = useContext<google.maps.Map | null>(MapContext)

  const [instance, setInstance] = useState<google.maps.Rectangle | null>(null)

  const [dblclickListener, setDblclickListener] =
    useState<google.maps.MapsEventListener | null>(null)
  const [dragendListener, setDragendListener] =
    useState<google.maps.MapsEventListener | null>(null)
  const [dragstartListener, setDragstartListener] =
    useState<google.maps.MapsEventListener | null>(null)
  const [mousedownListener, setMousedownListener] =
    useState<google.maps.MapsEventListener | null>(null)
  const [mousemoveListener, setMousemoveListener] =
    useState<google.maps.MapsEventListener | null>(null)
  const [mouseoutListener, setMouseoutListener] =
    useState<google.maps.MapsEventListener | null>(null)
  const [mouseoverListener, setMouseoverListener] =
    useState<google.maps.MapsEventListener | null>(null)
  const [mouseupListener, setMouseupListener] =
    useState<google.maps.MapsEventListener | null>(null)
  const [rightClickListener, setRightClickListener] =
    useState<google.maps.MapsEventListener | null>(null)
  const [clickListener, setClickListener] =
    useState<google.maps.MapsEventListener | null>(null)
  const [dragListener, setDragListener] =
    useState<google.maps.MapsEventListener | null>(null)
  const [boundsChangedListener, setBoundsChangedListener] =
    useState<google.maps.MapsEventListener | null>(null)

  // Order does matter
  useEffect(() => {
    if (instance !== null) {
      instance.setMap(map)
    }
  }, [map])

  useEffect(() => {
    if (typeof options !== 'undefined' && instance !== null) {
      instance.setOptions(options)
    }
  }, [instance, options])

  useEffect(() => {
    if (typeof draggable !== 'undefined' && instance !== null) {
      instance.setDraggable(draggable)
    }
  }, [instance, draggable])

  useEffect(() => {
    if (typeof editable !== 'undefined' && instance !== null) {
      instance.setEditable(editable)
    }
  }, [instance, editable])

  useEffect(() => {
    if (typeof visible !== 'undefined' && instance !== null) {
      instance.setVisible(visible)
    }
  }, [instance, visible])

  useEffect(() => {
    if (typeof bounds !== 'undefined' && instance !== null) {
      instance.setBounds(bounds)
    }
  }, [instance, bounds])

  useEffect(() => {
    if (instance && onDblClick) {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener)
      }

      setDblclickListener(
        google.maps.event.addListener(instance, 'dblclick', onDblClick)
      )
    }
  }, [onDblClick])

  useEffect(() => {
    if (instance && onDragEnd) {
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener)
      }

      setDragendListener(
        google.maps.event.addListener(instance, 'dragend', onDragEnd)
      )
    }
  }, [onDragEnd])

  useEffect(() => {
    if (instance && onDragStart) {
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener)
      }

      setDragstartListener(
        google.maps.event.addListener(instance, 'dragstart', onDragStart)
      )
    }
  }, [onDragStart])

  useEffect(() => {
    if (instance && onMouseDown) {
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener)
      }

      setMousedownListener(
        google.maps.event.addListener(instance, 'mousedown', onMouseDown)
      )
    }
  }, [onMouseDown])

  useEffect(() => {
    if (instance && onMouseMove) {
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener)
      }

      setMousemoveListener(
        google.maps.event.addListener(instance, 'mousemove', onMouseMove)
      )
    }
  }, [onMouseMove])

  useEffect(() => {
    if (instance && onMouseOut) {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener)
      }

      setMouseoutListener(
        google.maps.event.addListener(instance, 'mouseout', onMouseOut)
      )
    }
  }, [onMouseOut])

  useEffect(() => {
    if (instance && onMouseOver) {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener)
      }

      setMouseoverListener(
        google.maps.event.addListener(instance, 'mouseover', onMouseOver)
      )
    }
  }, [onMouseOver])

  useEffect(() => {
    if (instance && onMouseUp) {
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener)
      }

      setMouseupListener(
        google.maps.event.addListener(instance, 'mouseup', onMouseUp)
      )
    }
  }, [onMouseUp])

  useEffect(() => {
    if (instance && onRightClick) {
      if (rightClickListener !== null) {
        google.maps.event.removeListener(rightClickListener)
      }

      setRightClickListener(
        google.maps.event.addListener(instance, 'rightclick', onRightClick)
      )
    }
  }, [onRightClick])

  useEffect(() => {
    if (instance && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener)
      }

      setClickListener(
        google.maps.event.addListener(instance, 'click', onClick)
      )
    }
  }, [onClick])

  useEffect(() => {
    if (instance && onDrag) {
      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener)
      }

      setDragListener(google.maps.event.addListener(instance, 'drag', onDrag))
    }
  }, [onDrag])

  useEffect(() => {
    if (instance && onBoundsChanged) {
      if (boundsChangedListener !== null) {
        google.maps.event.removeListener(boundsChangedListener)
      }

      setBoundsChangedListener(
        google.maps.event.addListener(
          instance,
          'bounds_changed',
          onBoundsChanged
        )
      )
    }
  }, [onBoundsChanged])

  useEffect(() => {
    const rectangle = new google.maps.Rectangle({
      ...options,
      map,
    })

    if (typeof visible !== 'undefined') {
      rectangle.setVisible(visible)
    }

    if (typeof editable !== 'undefined') {
      rectangle.setEditable(editable)
    }

    if (typeof draggable !== 'undefined') {
      rectangle.setDraggable(draggable)
    }

    if (typeof bounds !== 'undefined') {
      rectangle.setBounds(bounds)
    }

    if (onDblClick) {
      setDblclickListener(
        google.maps.event.addListener(rectangle, 'dblclick', onDblClick)
      )
    }

    if (onDragEnd) {
      setDragendListener(
        google.maps.event.addListener(rectangle, 'dragend', onDragEnd)
      )
    }

    if (onDragStart) {
      setDragstartListener(
        google.maps.event.addListener(rectangle, 'dragstart', onDragStart)
      )
    }

    if (onMouseDown) {
      setMousedownListener(
        google.maps.event.addListener(rectangle, 'mousedown', onMouseDown)
      )
    }

    if (onMouseMove) {
      setMousemoveListener(
        google.maps.event.addListener(rectangle, 'mousemove', onMouseMove)
      )
    }

    if (onMouseOut) {
      setMouseoutListener(
        google.maps.event.addListener(rectangle, 'mouseout', onMouseOut)
      )
    }

    if (onMouseOver) {
      setMouseoverListener(
        google.maps.event.addListener(rectangle, 'mouseover', onMouseOver)
      )
    }

    if (onMouseUp) {
      setMouseupListener(
        google.maps.event.addListener(rectangle, 'mouseup', onMouseUp)
      )
    }

    if (onRightClick) {
      setRightClickListener(
        google.maps.event.addListener(rectangle, 'rightclick', onRightClick)
      )
    }

    if (onClick) {
      setClickListener(
        google.maps.event.addListener(rectangle, 'click', onClick)
      )
    }

    if (onDrag) {
      setDragListener(google.maps.event.addListener(rectangle, 'drag', onDrag))
    }

    if (onBoundsChanged) {
      setBoundsChangedListener(
        google.maps.event.addListener(
          rectangle,
          'bounds_changed',
          onBoundsChanged
        )
      )
    }

    setInstance(rectangle)

    if (onLoad) {
      onLoad(rectangle)
    }

    return () => {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener)
      }

      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener)
      }

      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener)
      }

      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener)
      }

      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener)
      }

      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener)
      }

      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener)
      }

      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener)
      }

      if (rightClickListener !== null) {
        google.maps.event.removeListener(rightClickListener)
      }

      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener)
      }

      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener)
      }

      if (boundsChangedListener !== null) {
        google.maps.event.removeListener(boundsChangedListener)
      }

      if (onUnmount) {
        onUnmount(rectangle)
      }

      rectangle.setMap(null)
    }
  }, [])

  return null
}

export const RectangleF = memo(RectangleFunctional)

export class Rectangle extends PureComponent<RectangleProps, RectangleState> {
  static override contextType = MapContext

  declare context: ContextType<typeof MapContext>

  registeredEvents: google.maps.MapsEventListener[] = []

  override state: RectangleState = {
    rectangle: null,
  }

  setRectangleCallback = (): void => {
    if (this.state.rectangle !== null && this.props.onLoad) {
      this.props.onLoad(this.state.rectangle)
    }
  }

  override componentDidMount(): void {
    const rectangle = new google.maps.Rectangle({
      ...this.props.options,
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

  override componentDidUpdate(prevProps: RectangleProps): void {
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

  override componentWillUnmount(): void {
    if (this.state.rectangle !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.rectangle)
      }

      unregisterEvents(this.registeredEvents)

      this.state.rectangle.setMap(null)
    }
  }

  override render(): null {
    return null
  }
}

export default Rectangle
