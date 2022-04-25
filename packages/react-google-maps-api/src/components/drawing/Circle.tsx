import { type ContextType, PureComponent, memo, useContext, useState, useEffect } from 'react'

import { unregisterEvents, applyUpdatersToPropsAndRegisterEvents } from '../../utils/helper'

import MapContext from '../../map-context'

const eventMap = {
  onCenterChanged: 'center_changed',
  onRadiusChanged: 'radius_changed',
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
  center(instance: google.maps.Circle, center: google.maps.LatLng): void {
    instance.setCenter(center)
  },
  draggable(instance: google.maps.Circle, draggable: boolean): void {
    instance.setDraggable(draggable)
  },
  editable(instance: google.maps.Circle, editable: boolean): void {
    instance.setEditable(editable)
  },
  map(instance: google.maps.Circle, map: google.maps.Map): void {
    instance.setMap(map)
  },
  options(instance: google.maps.Circle, options: google.maps.CircleOptions): void {
    instance.setOptions(options)
  },
  radius(instance: google.maps.Circle, radius: number): void {
    instance.setRadius(radius)
  },
  visible(instance: google.maps.Circle, visible: boolean): void {
    instance.setVisible(visible)
  },
}

interface CircleState {
  circle: google.maps.Circle | null
}

export interface CircleProps {
  options?: google.maps.CircleOptions | undefined

  /** sets the center of the circle */
  center?: google.maps.LatLng | google.maps.LatLngLiteral | undefined

  // required
  /** Sets the radius of this circle (in meters) */
  radius?: number | undefined
  /** If set to true, the user can drag this circle over the map */
  draggable?: boolean | undefined
  /** If set to true, the user can edit this circle by dragging the control points shown at the center and around the circumference of the circle. */
  editable?: boolean | undefined
  /** Hides this circle if set to false. */
  visible?: boolean | undefined
  /** This event is fired when the DOM dblclick event is fired on the circle. */
  onDblClick?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the user stops dragging the circle. */
  onDragEnd?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /**  This event is fired when the user starts dragging the circle. */
  onDragStart?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the DOM mousedown event is fired on the circle. */
  onMouseDown?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the DOM mousemove event is fired on the circle. */
  onMouseMove?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired on circle mouseout. */
  onMouseOut?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired on circle mouseover. */
  onMouseOver?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the DOM mouseup event is fired on the circle. */
  onMouseUp?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the circle is right-clicked on. */
  onRightClick?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the DOM click event is fired on the circle. */
  onClick?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is repeatedly fired while the user drags the circle. */
  onDrag?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the circle's center is changed. */
  onCenterChanged?: (() => void) | undefined
  /** This event is fired when the circle's radius is changed. */
  onRadiusChanged?: (() => void) | undefined
  /** This callback is called when the circle instance has loaded. It is called with the circle instance. */
  onLoad?: ((circle: google.maps.Circle) => void) | undefined
  /** This callback is called when the component unmounts. It is called with the circle instance. */
  onUnmount?: ((circle: google.maps.Circle) => void) | undefined
}

const defaultOptions = {}

function CircleFunctional({
  options,
  center,
  radius,
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
  onCenterChanged,
  onRadiusChanged,
  onLoad,
  onUnmount,
}: CircleProps): null {
  const map = useContext<google.maps.Map | null>(MapContext)

  const [instance, setInstance] = useState<google.maps.Circle | null>(null)

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
  const [centerChangedListener, setCenterChangedListener] = useState<google.maps.MapsEventListener | null>(null)
  const [radiusChangedListener, setRadiusChangedListener] = useState<google.maps.MapsEventListener | null>(null)

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
    if (typeof radius === 'number' && instance !== null) {
      instance.setRadius(radius)
    }
  }, [instance, radius])

  useEffect(() => {
    if (typeof center !== 'undefined' && instance !== null) {
      instance.setCenter(center)
    }
  }, [instance, center])

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
  }, [onDblClick])

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
    if (instance && onCenterChanged) {
      if (centerChangedListener !== null) {
        google.maps.event.removeListener(centerChangedListener)
      }

      setCenterChangedListener(
        google.maps.event.addListener(instance, 'center_changed', onCenterChanged)
      )
    }
  }, [onClick])

  useEffect(() => {
    if (instance && onRadiusChanged) {
      if (radiusChangedListener !== null) {
        google.maps.event.removeListener(radiusChangedListener)
      }

      setRadiusChangedListener(
        google.maps.event.addListener(instance, 'radius_changed', onRadiusChanged)
      )
    }
  }, [onRadiusChanged])

  useEffect(() => {
    const circle = new google.maps.Circle({
      ...(options || defaultOptions),
      map,
    })

    if (typeof radius === 'number') {
      circle.setRadius(radius)
    }

    if (typeof center !== 'undefined') {
      circle.setCenter(center)
    }

    if (typeof radius === 'number') {
      circle.setRadius(radius)
    }

    if (typeof visible !== 'undefined') {
      circle.setVisible(visible)
    }

    if (typeof editable !== 'undefined') {
      circle.setEditable(editable)
    }

    if (typeof draggable !== 'undefined') {
      circle.setDraggable(draggable)
    }

    if (onDblClick) {
      setDblclickListener(
        google.maps.event.addListener(circle, 'dblclick', onDblClick)
      )
    }

    if (onDragEnd) {
      setDragendListener(
        google.maps.event.addListener(circle, 'dragend', onDragEnd)
      )
    }

    if (onDragStart) {
      setDragstartListener(
        google.maps.event.addListener(circle, 'dragstart', onDragStart)
      )
    }

    if (onMouseDown) {
      setMousedownListener(
        google.maps.event.addListener(circle, 'mousedown', onMouseDown)
      )
    }

    if (onMouseMove) {
      setMousemoveListener(
        google.maps.event.addListener(circle, 'mousemove', onMouseMove)
      )
    }

    if (onMouseOut) {
      setMouseoutListener(
        google.maps.event.addListener(circle, 'mouseout', onMouseOut)
      )
    }

    if (onMouseOver) {
      setMouseoverListener(
        google.maps.event.addListener(circle, 'mouseover', onMouseOver)
      )
    }

    if (onMouseUp) {
      setMouseupListener(
        google.maps.event.addListener(circle, 'mouseup', onMouseUp)
      )
    }

    if (onRightClick) {
      setRightclickListener(
        google.maps.event.addListener(circle, 'rightclick', onRightClick)
      )
    }

    if (onClick) {
      setClickListener(
        google.maps.event.addListener(circle, 'click', onClick)
      )
    }

    if (onDrag) {
      setDragListener(
        google.maps.event.addListener(circle, 'drag', onDrag)
      )
    }

    if (onCenterChanged) {
      setCenterChangedListener(
        google.maps.event.addListener(circle, 'center_changed', onCenterChanged)
      )
    }

    if (onRadiusChanged) {
      setRadiusChangedListener(
        google.maps.event.addListener(circle, 'radius_changed', onRadiusChanged)
      )
    }

    setInstance(circle)

    if (onLoad) {
      onLoad(circle)
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

      if (centerChangedListener !== null) {
        google.maps.event.removeListener(centerChangedListener)
      }

      if (radiusChangedListener !== null) {
        google.maps.event.removeListener(radiusChangedListener)
      }

      if (onUnmount) {
        onUnmount(circle)
      }

      circle.setMap(null)
    }
  }, [])

  return null
}

export const CircleF = memo(CircleFunctional)

export class Circle extends PureComponent<CircleProps, CircleState> {
  static contextType = MapContext
  declare context: ContextType<typeof MapContext>

  registeredEvents: google.maps.MapsEventListener[] = []

  state: CircleState = {
    circle: null,
  }

  setCircleCallback = (): void => {
    if (this.state.circle !== null && this.props.onLoad) {
      this.props.onLoad(this.state.circle)
    }
  }

  componentDidMount(): void {
    const circle = new google.maps.Circle({
      ...(this.props.options || {}),
    // @ts-ignore
      map: this.context,
    })

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: circle,
    })

    this.setState(function setCircle() {
      return {
        circle,
      }
    }, this.setCircleCallback)
  }

  componentDidUpdate(prevProps: CircleProps): void {
    if (this.state.circle !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.circle,
      })
    }
  }

  componentWillUnmount(): void {
    if (this.state.circle !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.circle)
      }

      unregisterEvents(this.registeredEvents)

      this.state.circle && this.state.circle.setMap(null)
    }
  }

  render(): null {
    return null
  }
}

export default Circle
