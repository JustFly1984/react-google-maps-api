/* global google */
import { type ContextType, PureComponent, useContext, useEffect, useState, memo } from 'react'

import { unregisterEvents, applyUpdatersToPropsAndRegisterEvents } from '../../utils/helper'

import MapContext from '../../map-context'

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
  draggable(instance: google.maps.Polygon, draggable: boolean): void {
    instance.setDraggable(draggable)
  },
  editable(instance: google.maps.Polygon, editable: boolean): void {
    instance.setEditable(editable)
  },
  map(instance: google.maps.Polygon, map: google.maps.Map): void {
    instance.setMap(map)
  },
  options(instance: google.maps.Polygon, options: google.maps.PolygonOptions): void {
    instance.setOptions(options)
  },
  path(
    instance: google.maps.Polygon,
    path:
      | google.maps.MVCArray<google.maps.LatLng>
      | google.maps.LatLng[]
      | google.maps.LatLngLiteral[]
  ): void {
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
  ): void {
    instance.setPaths(paths)
  },

  visible(instance: google.maps.Polygon, visible: boolean): void {
    instance.setVisible(visible)
  },
}

interface PolygonState {
  polygon: google.maps.Polygon | null
}

export interface PolygonProps {
  options?: google.maps.PolygonOptions | undefined
  /** If set to true, the user can drag this shape over the map. The geodesic property defines the mode of dragging. */
  draggable?: boolean | undefined
  /** If set to true, the user can edit this shape by dragging the control points shown at the vertices and on each segment. */
  editable?: boolean | undefined
  /** Hides this poly if set to false. */
  visible?: boolean | undefined
  /** Sets the first path. See Paths for more details. */
  path?:
    | google.maps.MVCArray<google.maps.LatLng>
    | google.maps.LatLng[]
    | google.maps.LatLngLiteral[]
    | undefined
  /** Sets the path for this polygon. The ordered sequence of coordinates that designates a closed loop. Unlike polylines, a polygon may consist of one or more paths. As a result, the paths property may specify one or more arrays of LatLng coordinates. Paths are closed automatically; do not repeat the first vertex of the path as the last vertex. Simple polygons may be defined using a single array of LatLngs. More complex polygons may specify an array of arrays. Any simple arrays are converted into MVCArrays. Inserting or removing LatLngs from the MVCArray will automatically update the polygon on the map. */
  paths?:
    | google.maps.MVCArray<google.maps.LatLng>
    | google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>>
    | google.maps.LatLng[]
    | google.maps.LatLng[][]
    | google.maps.LatLngLiteral[]
    | google.maps.LatLngLiteral[][]
    | undefined
  /** This event is fired when the DOM dblclick event is fired on the Polygon. */
  onDblClick?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the user stops dragging the polygon. */
  onDragEnd?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the user starts dragging the polygon. */
  onDragStart?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the DOM mousedown event is fired on the Polygon. */
  onMouseDown?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the DOM mousemove event is fired on the Polygon. */
  onMouseMove?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired on Polygon mouseout. */
  onMouseOut?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired on Polygon mouseover. */
  onMouseOver?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the DOM mouseup event is fired on the Polygon. */
  onMouseUp?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the Polygon is right-clicked on. */
  onRightClick?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the DOM click event is fired on the Polygon. */
  onClick?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is repeatedly fired while the user drags the polygon. */
  onDrag?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This callback is called when the polygon instance has loaded. It is called with the polygon instance. */
  onLoad?: ((polygon: google.maps.Polygon) => void) | undefined
  /** This callback is called when the component unmounts. It is called with the polygon instance. */
  onUnmount?: ((polygon: google.maps.Polygon) => void) | undefined
}

function PolygonFunctional({
  options,
  draggable,
  editable,
  visible,
  path,
  paths,
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
}: PolygonProps): null {
  const map = useContext<google.maps.Map | null>(MapContext)

  const [instance, setInstance] = useState<google.maps.Polygon | null>(null)

  const [dblclickListener, setDblclickListener] = useState<google.maps.MapsEventListener | null>(null)
  const [dragendListener, setDragendListener] = useState<google.maps.MapsEventListener | null>(null)
  const [dragstartListener, setDragstartListener] = useState<google.maps.MapsEventListener | null>(null)
  const [mousedownListener, setMousedownListener] = useState<google.maps.MapsEventListener | null>(null)
  const [mousemoveListener, setMousemoveListener] = useState<google.maps.MapsEventListener | null>(null)
  const [mouseoutListener, setMouseoutListener] = useState<google.maps.MapsEventListener | null>(null)
  const [mouseoverListener, setMouseoverListener] = useState<google.maps.MapsEventListener | null>(null)
  const [mouseupListener, setMouseupListener] = useState<google.maps.MapsEventListener | null>(null)
  const [rightclickListener, setRightclickListener] = useState<google.maps.MapsEventListener | null>(null)
  const [clickListener, setClickListener] = useState<google.maps.MapsEventListener | null>(null)
  const [dragListener, setDragListener] = useState<google.maps.MapsEventListener | null>(null)

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
    if (typeof paths !== 'undefined' && instance !== null) {
      instance.setPaths(paths)
    }
  }, [instance, paths])

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

      setDragListener(
        google.maps.event.addListener(instance, 'drag', onDrag)
      )
    }
  }, [onDrag])

  useEffect(() => {
    const polygon = new google.maps.Polygon({
      ...(options || {}),
      map,
    })

    if (path) {
      polygon.setPath(path)
    }

    if (paths) {
      polygon.setPaths(paths)
    }

    if (typeof visible !== 'undefined') {
      polygon.setVisible(visible)
    }

    if (typeof editable !== 'undefined') {
      polygon.setEditable(editable)
    }

    if (typeof draggable !== 'undefined') {
      polygon.setDraggable(draggable)
    }

    if (onDblClick) {
      setDblclickListener(
        google.maps.event.addListener(polygon, 'dblclick', onDblClick)
      )
    }

    if (onDragEnd) {
      setDragendListener(
        google.maps.event.addListener(polygon, 'dragend', onDragEnd)
      )
    }

    if (onDragStart) {
      setDragstartListener(
        google.maps.event.addListener(polygon, 'dragstart', onDragStart)
      )
    }

    if (onMouseDown) {
      setMousedownListener(
        google.maps.event.addListener(polygon, 'mousedown', onMouseDown)
      )
    }

    if (onMouseMove) {
      setMousemoveListener(
        google.maps.event.addListener(polygon, 'mousemove', onMouseMove)
      )
    }

    if (onMouseOut) {
      setMouseoutListener(
        google.maps.event.addListener(polygon, 'mouseout', onMouseOut)
      )
    }

    if (onMouseOver) {
      setMouseoverListener(
        google.maps.event.addListener(polygon, 'mouseover', onMouseOver)
      )
    }

    if (onMouseUp) {
      setMouseupListener(
        google.maps.event.addListener(polygon, 'mouseup', onMouseUp)
      )
    }

    if (onRightClick) {
      setRightclickListener(
        google.maps.event.addListener(polygon, 'rightclick', onRightClick)
      )
    }

    if (onClick) {
      setClickListener(
        google.maps.event.addListener(polygon, 'click', onClick)
      )
    }

    if (onDrag) {
      setDragListener(
        google.maps.event.addListener(polygon, 'drag', onDrag)
      )
    }

    setInstance(polygon)

    if (onLoad) {
      onLoad(polygon)
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
        onUnmount(polygon)
      }

      polygon.setMap(null)
    }
  }, [])

  return null
}

export const PolygonF = memo(PolygonFunctional)

export class Polygon extends PureComponent<PolygonProps, PolygonState> {
  static override contextType = MapContext
  declare context: ContextType<typeof MapContext>

  registeredEvents: google.maps.MapsEventListener[] = []

  override state: PolygonState = {
    polygon: null,
  }

  setPolygonCallback = (): void => {
    if (this.state.polygon !== null && this.props.onLoad) {
      this.props.onLoad(this.state.polygon)
    }
  }

  override componentDidMount(): void {
    const polygon = new google.maps.Polygon({
      ...(this.props.options || {}),
      map: this.context,
    })

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: polygon,
    })

    this.setState(function setPolygon() {
      return {
        polygon,
      }
    }, this.setPolygonCallback)
  }

  override componentDidUpdate(prevProps: PolygonProps): void {
    if (this.state.polygon !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.polygon,
      })
    }
  }

  override componentWillUnmount(): void {
    if (this.state.polygon !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.polygon)
      }

      unregisterEvents(this.registeredEvents)

      this.state.polygon && this.state.polygon.setMap(null)
    }
  }

  override render(): null {
    return null
  }
}

export default Polygon
