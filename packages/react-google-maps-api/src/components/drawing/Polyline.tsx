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
  draggable(instance: google.maps.Polyline, draggable: boolean): void {
    instance.setDraggable(draggable)
  },
  editable(instance: google.maps.Polyline, editable: boolean): void {
    instance.setEditable(editable)
  },
  map(instance: google.maps.Polyline, map: google.maps.Map): void {
    instance.setMap(map)
  },
  options(
    instance: google.maps.Polyline,
    options: google.maps.PolylineOptions
  ): void {
    instance.setOptions(options)
  },
  path(
    instance: google.maps.Polyline,
    path:
      | google.maps.MVCArray<google.maps.LatLng>
      | google.maps.LatLng[]
      | google.maps.LatLngLiteral[]
  ): void {
    instance.setPath(path)
  },
  visible(instance: google.maps.Polyline, visible: boolean): void {
    instance.setVisible(visible)
  },
}

type PolylineState = {
  polyline: google.maps.Polyline | null
}

export type PolylineProps = {
  options?: google.maps.PolylineOptions | undefined
  /** If set to true, the user can drag this shape over the map. The geodesic property defines the mode of dragging. */
  draggable?: boolean | undefined
  /** If set to true, the user can edit this shape by dragging the control points shown at the vertices and on each segment. */
  editable?: boolean | undefined
  /** Hides this poly if set to false. */
  visible?: boolean | undefined
  /** Sets the path. The ordered sequence of coordinates of the Polyline. This path may be specified using either a simple array of LatLngs, or an MVCArray of LatLngs. Note that if you pass a simple array, it will be converted to an MVCArray Inserting or removing LatLngs in the MVCArray will automatically update the polyline on the map. */
  path?:
    | google.maps.MVCArray<google.maps.LatLng>
    | google.maps.LatLng[]
    | google.maps.LatLngLiteral[]
    | undefined
  /** This event is fired when the DOM dblclick event is fired on the Polyline. */
  onDblClick?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the user stops dragging the polyline. */
  onDragEnd?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the user starts dragging the polyline. */
  onDragStart?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the DOM mousedown event is fired on the Polyline. */
  onMouseDown?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the DOM mousemove event is fired on the Polyline. */
  onMouseMove?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired on Polyline mouseout. */
  onMouseOut?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired on Polyline mouseover. */
  onMouseOver?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the DOM mouseup event is fired on the Polyline. */
  onMouseUp?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the Polyline is right-clicked on. */
  onRightClick?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the DOM click event is fired on the Polyline. */
  onClick?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is repeatedly fired while the user drags the polyline. */
  onDrag?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This callback is called when the polyline instance has loaded. It is called with the polyline instance. */
  onLoad?: ((polyline: google.maps.Polyline) => void) | undefined
  /** This callback is called when the component unmounts. It is called with the polyline instance. */
  onUnmount?: ((polyline: google.maps.Polyline) => void) | undefined
}

const defaultOptions = {}

function PolylineFunctional({
  options,
  draggable,
  editable,
  visible,
  path,
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
  onLoad,
  onUnmount,
}: PolylineProps): null {
  const map = useContext<google.maps.Map | null>(MapContext)

  const [instance, setInstance] = useState<google.maps.Polyline | null>(null)

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
  const [rightclickListener, setRightclickListener] =
    useState<google.maps.MapsEventListener | null>(null)
  const [clickListener, setClickListener] =
    useState<google.maps.MapsEventListener | null>(null)
  const [dragListener, setDragListener] =
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
    if (typeof path !== 'undefined' && instance !== null) {
      instance.setPath(path)
    }
  }, [instance, path])

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
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener)
      }

      setRightclickListener(
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
    const polyline = new google.maps.Polyline({
      ...(options || defaultOptions),
      map,
    })

    if (path) {
      polyline.setPath(path)
    }

    if (typeof visible !== 'undefined') {
      polyline.setVisible(visible)
    }

    if (typeof editable !== 'undefined') {
      polyline.setEditable(editable)
    }

    if (typeof draggable !== 'undefined') {
      polyline.setDraggable(draggable)
    }

    if (onDblClick) {
      setDblclickListener(
        google.maps.event.addListener(polyline, 'dblclick', onDblClick)
      )
    }

    if (onDragEnd) {
      setDragendListener(
        google.maps.event.addListener(polyline, 'dragend', onDragEnd)
      )
    }

    if (onDragStart) {
      setDragstartListener(
        google.maps.event.addListener(polyline, 'dragstart', onDragStart)
      )
    }

    if (onMouseDown) {
      setMousedownListener(
        google.maps.event.addListener(polyline, 'mousedown', onMouseDown)
      )
    }

    if (onMouseMove) {
      setMousemoveListener(
        google.maps.event.addListener(polyline, 'mousemove', onMouseMove)
      )
    }

    if (onMouseOut) {
      setMouseoutListener(
        google.maps.event.addListener(polyline, 'mouseout', onMouseOut)
      )
    }

    if (onMouseOver) {
      setMouseoverListener(
        google.maps.event.addListener(polyline, 'mouseover', onMouseOver)
      )
    }

    if (onMouseUp) {
      setMouseupListener(
        google.maps.event.addListener(polyline, 'mouseup', onMouseUp)
      )
    }

    if (onRightClick) {
      setRightclickListener(
        google.maps.event.addListener(polyline, 'rightclick', onRightClick)
      )
    }

    if (onClick) {
      setClickListener(
        google.maps.event.addListener(polyline, 'click', onClick)
      )
    }

    if (onDrag) {
      setDragListener(google.maps.event.addListener(polyline, 'drag', onDrag))
    }

    setInstance(polyline)

    if (onLoad) {
      onLoad(polyline)
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

      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener)
      }

      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener)
      }

      if (onUnmount) {
        onUnmount(polyline)
      }

      polyline.setMap(null)
    }
  }, [])

  return null
}

export const PolylineF = memo(PolylineFunctional)

export class Polyline extends PureComponent<PolylineProps, PolylineState> {
  static override contextType = MapContext
  declare context: ContextType<typeof MapContext>

  registeredEvents: google.maps.MapsEventListener[] = []

  override state: PolylineState = {
    polyline: null,
  }

  setPolylineCallback = (): void => {
    if (this.state.polyline !== null && this.props.onLoad) {
      this.props.onLoad(this.state.polyline)
    }
  }

  override componentDidMount(): void {
    const polyline = new google.maps.Polyline({
      ...this.props.options,
      map: this.context,
    })

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: polyline,
    })

    this.setState(function setPolyline() {
      return {
        polyline,
      }
    }, this.setPolylineCallback)
  }

  override componentDidUpdate(prevProps: PolylineProps): void {
    if (this.state.polyline !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.polyline,
      })
    }
  }

  override componentWillUnmount(): void {
    if (this.state.polyline === null) {
      return
    }

    if (this.props.onUnmount) {
      this.props.onUnmount(this.state.polyline)
    }

    unregisterEvents(this.registeredEvents)

    this.state.polyline.setMap(null)
  }

  override render(): null {
    return null
  }
}

export default Polyline
