import {
  memo,
  useMemo,
  Children,
  useState,
  useEffect,
  useContext,
  cloneElement,
  PureComponent,
  isValidElement,
  type ReactNode,
  type ContextType,
  type ReactElement,
} from 'react'

import { unregisterEvents, applyUpdatersToPropsAndRegisterEvents } from '../../utils/helper'

import MapContext from '../../map-context'
import { HasMarkerAnchor } from '../../types'

import { Clusterer } from '@react-google-maps/marker-clusterer'
import { MarkerClusterer as GoogleClusterer} from '@googlemaps/markerclusterer'

const eventMap = {
  onAnimationChanged: 'animation_changed',
  onClick: 'click',
  onClickableChanged: 'clickable_changed',
  onCursorChanged: 'cursor_changed',
  onDblClick: 'dblclick',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDraggableChanged: 'draggable_changed',
  onDragStart: 'dragstart',
  onFlatChanged: 'flat_changed',
  onIconChanged: 'icon_changed',
  onMouseDown: 'mousedown',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onPositionChanged: 'position_changed',
  onRightClick: 'rightclick',
  onShapeChanged: 'shape_changed',
  onTitleChanged: 'title_changed',
  onVisibleChanged: 'visible_changed',
  onZindexChanged: 'zindex_changed',
}

const updaterMap = {
  animation(instance: google.maps.Marker, animation: google.maps.Animation): void {
    instance.setAnimation(animation)
  },
  clickable(instance: google.maps.Marker, clickable: boolean): void {
    instance.setClickable(clickable)
  },
  cursor(instance: google.maps.Marker, cursor: string): void {
    instance.setCursor(cursor)
  },
  draggable(instance: google.maps.Marker, draggable: boolean): void {
    instance.setDraggable(draggable)
  },
  icon(instance: google.maps.Marker, icon: string | google.maps.Icon | google.maps.Symbol): void {
    instance.setIcon(icon)
  },
  label(instance: google.maps.Marker, label: string | google.maps.MarkerLabel): void {
    instance.setLabel(label)
  },
  map(instance: google.maps.Marker, map: google.maps.Map): void {
    instance.setMap(map)
  },
  opacity(instance: google.maps.Marker, opacity: number): void {
    instance.setOpacity(opacity)
  },
  options(instance: google.maps.Marker, options: google.maps.MarkerOptions): void {
    instance.setOptions(options)
  },
  position(
    instance: google.maps.Marker,
    position: google.maps.LatLng | google.maps.LatLngLiteral
  ): void {
    instance.setPosition(position)
  },
  shape(instance: google.maps.Marker, shape: google.maps.MarkerShape): void {
    instance.setShape(shape)
  },
  title(instance: google.maps.Marker, title: string): void {
    instance.setTitle(title)
  },
  visible(instance: google.maps.Marker, visible: boolean): void {
    instance.setVisible(visible)
  },
  zIndex(instance: google.maps.Marker, zIndex: number): void {
    instance.setZIndex(zIndex)
  },
}

export interface MarkerProps {
  // required
  /** Marker position. */
  position: google.maps.LatLng | google.maps.LatLngLiteral

  children?: ReactNode | undefined
  options?: google.maps.MarkerOptions | undefined
  /** Start an animation. Any ongoing animation will be cancelled. Currently supported animations are: BOUNCE, DROP. Passing in null will cause any animation to stop. */
  animation?: google.maps.Animation | undefined
  /** If true, the marker receives mouse and touch events. Default value is true. */
  clickable?: boolean | undefined
  /** Mouse cursor to show on hover */
  cursor?: string | undefined
  /** If true, the marker can be dragged. Default value is false. */
  draggable?: boolean | undefined
  /** Icon for the foreground. If a string is provided, it is treated as though it were an Icon with the string as url. */
  icon?: string | google.maps.Icon | google.maps.Symbol | undefined
  /** Adds a label to the marker. The label can either be a string, or a MarkerLabel object. */
  label?: string | google.maps.MarkerLabel | undefined
  /** The marker's opacity between 0.0 and 1.0. */
  opacity?: number | undefined

  /** Image map region definition used for drag/click. */
  shape?: google.maps.MarkerShape | undefined
  /** Rollover text */
  title?: string | undefined
  /** If true, the marker is visible */
  visible?: boolean | undefined
  /** All markers are displayed on the map in order of their zIndex, with higher values displaying in front of markers with lower values. By default, markers are displayed according to their vertical position on screen, with lower markers appearing in front of markers further up the screen. */
  zIndex?: number | undefined
  /** Render prop that handles clustering markers */
  clusterer?: Clusterer | GoogleClusterer | undefined
  /** Clusters are redrawn when a Marker is added unless noClustererRedraw? is set to true. */
  noClustererRedraw?: boolean | undefined
  /** This event is fired when the marker icon was clicked. */
  onClick?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the marker's clickable property changes. */
  onClickableChanged?: (() => void)  | undefined
  /** This event is fired when the marker's cursor property changes. */
  onCursorChanged?: (() => void)  | undefined
  /** This event is fired when the marker's animation property changes. */
  onAnimationChanged?: (() => void)  | undefined
  /** This event is fired when the marker icon was double clicked. */
  onDblClick?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is repeatedly fired while the user drags the marker. */
  onDrag?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the user stops dragging the marker. */
  onDragEnd?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the marker's draggable property changes. */
  onDraggableChanged?: (() => void)  | undefined
  /** This event is fired when the user starts dragging the marker. */
  onDragStart?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the marker's flat property changes. */
  onFlatChanged?: (() => void)  | undefined
  /** This event is fired when the marker icon property changes. */
  onIconChanged?: (() => void)  | undefined
  /** This event is fired for a mousedown on the marker. */
  onMouseDown?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the mouse leaves the area of the marker icon. */
  onMouseOut?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the mouse enters the area of the marker icon. */
  onMouseOver?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired for a mouseup on the marker. */
  onMouseUp?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the marker position property changes. */
  onPositionChanged?: (() => void)  | undefined
  /** This event is fired for a rightclick on the marker. */
  onRightClick?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the marker's shape property changes. */
  onShapeChanged?: (() => void)  | undefined
  /** This event is fired when the marker title property changes. */
  onTitleChanged?: (() => void)  | undefined
  /** This event is fired when the marker's visible property changes. */
  onVisibleChanged?: (() => void)  | undefined
  /** This event is fired when the marker's zIndex property changes. */
  onZindexChanged?: (() => void)  | undefined
  /** This callback is called when the marker instance has loaded. It is called with the marker instance. */
  onLoad?: ((marker: google.maps.Marker) => void)  | undefined
  /** This callback is called when the component unmounts. It is called with the marker instance. */
  onUnmount?: ((marker: google.maps.Marker) => void)  | undefined
}

const defaultOptions = {}

function MarkerFunctional({
  position,
  options,
  clusterer,
  noClustererRedraw,

  children,

  draggable,
  visible,
  animation,
  clickable,
  cursor,
  icon,
  label,
  opacity,
  shape,
  title,
  zIndex,
  onClick,
  onDblClick,
  onDrag,
  onDragEnd,
  onDragStart,
  onMouseOut,
  onMouseOver,
  onMouseUp,
  onMouseDown,
  onRightClick,
  onClickableChanged,
  onCursorChanged,
  onAnimationChanged,
  onDraggableChanged,
  onFlatChanged,
  onIconChanged,
  onPositionChanged,
  onShapeChanged,
  onTitleChanged,
  onVisibleChanged,
  onZindexChanged,
  onLoad,
  onUnmount
}: MarkerProps): JSX.Element | null {
  const map = useContext<google.maps.Map | null>(MapContext)

  const [instance, setInstance] = useState<google.maps.Marker | null>(null)

  const [dblclickListener, setDblclickListener] = useState<google.maps.MapsEventListener | null>(null)
  const [dragendListener, setDragendListener] = useState<google.maps.MapsEventListener | null>(null)
  const [dragstartListener, setDragstartListener] = useState<google.maps.MapsEventListener | null>(null)
  const [mousedownListener, setMousedownListener] = useState<google.maps.MapsEventListener | null>(null)
  const [mouseoutListener, setMouseoutListener] = useState<google.maps.MapsEventListener | null>(null)
  const [mouseoverListener, setMouseoverListener] = useState<google.maps.MapsEventListener | null>(null)
  const [mouseupListener, setMouseupListener] = useState<google.maps.MapsEventListener | null>(null)
  const [rightclickListener, setRightclickListener] = useState<google.maps.MapsEventListener | null>(null)
  const [clickListener, setClickListener] = useState<google.maps.MapsEventListener | null>(null)
  const [dragListener, setDragListener] = useState<google.maps.MapsEventListener | null>(null)

  const [clickableChangedListener, setClickableChangedListener] = useState<google.maps.MapsEventListener | null>(null)
  const [cursorChangedListener, setCursorChangedListener] = useState<google.maps.MapsEventListener | null>(null)
  const [animationChangedListener, setAnimationChangedListener] = useState<google.maps.MapsEventListener | null>(null)
  const [draggableChangedListener, setDraggableChangedListener] = useState<google.maps.MapsEventListener | null>(null)
  const [flatChangedListener, setFlatChangedListener] = useState<google.maps.MapsEventListener | null>(null)
  const [iconChangedListener, setIconChangedListener] = useState<google.maps.MapsEventListener | null>(null)
  const [positionChangedListener, setPositionChangedListener] = useState<google.maps.MapsEventListener | null>(null)
  const [shapeChangedListener, setShapeChangedListener] = useState<google.maps.MapsEventListener | null>(null)
  const [titleChangedListener, setTitleChangedListener] = useState<google.maps.MapsEventListener | null>(null)
  const [visibleChangedListener, setVisibleChangedListener] = useState<google.maps.MapsEventListener | null>(null)
  const [zIndexChangedListener, setZindexChangedListener] = useState<google.maps.MapsEventListener | null>(null)

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
    if (position && instance !== null) {
      instance.setPosition(position)
    }
  }, [instance, position])

    useEffect(() => {
      if (typeof visible !== 'undefined' && instance !== null) {
        instance.setVisible(visible)
      }
    }, [instance, visible])

  useEffect(() => {
    if (animation && instance !== null) {
      instance.setAnimation(animation)
    }
  }, [instance, animation])

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
    if (instance && onClickableChanged) {
      if (clickableChangedListener !== null) {
        google.maps.event.removeListener(clickableChangedListener)
      }

      setClickableChangedListener(
        google.maps.event.addListener(instance, 'clickable_changed', onClickableChanged)
      )
    }
  }, [onClickableChanged])

  useEffect(() => {
    if (instance && onCursorChanged) {
      if (cursorChangedListener !== null) {
        google.maps.event.removeListener(cursorChangedListener)
      }

      setCursorChangedListener(
        google.maps.event.addListener(instance, 'cursor_changed', onCursorChanged)
      )
    }
  }, [onCursorChanged])

  useEffect(() => {
    if (instance && onAnimationChanged) {
      if (animationChangedListener !== null) {
        google.maps.event.removeListener(animationChangedListener)
      }

      setAnimationChangedListener(
        google.maps.event.addListener(instance, 'animation_changed', onAnimationChanged)
      )
    }
  }, [onAnimationChanged])

  useEffect(() => {
    if(instance && onDraggableChanged) {
      if (draggableChangedListener !== null) {
        google.maps.event.removeListener(draggableChangedListener)
      }

      setDraggableChangedListener(
        google.maps.event.addListener(instance, 'draggable_changed', onDraggableChanged)
      )
    }
  }, [onDraggableChanged])

  useEffect(() => {
    if (instance && onFlatChanged) {
      if (flatChangedListener !== null) {
        google.maps.event.removeListener(flatChangedListener)
      }

      setFlatChangedListener(
        google.maps.event.addListener(instance, 'flat_changed', onFlatChanged)
      )
    }
  }, [onFlatChanged])

  useEffect(() => {
    if (instance && onIconChanged) {
      if (iconChangedListener !== null) {
        google.maps.event.removeListener(iconChangedListener)
      }

      setIconChangedListener(
        google.maps.event.addListener(instance, 'icon_changed', onIconChanged)
      )
    }
  }, [onIconChanged])

  useEffect(() => {
    if (instance && onPositionChanged) {
      if (positionChangedListener !== null) {
        google.maps.event.removeListener(positionChangedListener)
      }

      setPositionChangedListener(
        google.maps.event.addListener(instance, 'position_changed', onPositionChanged)
      )
    }
  }, [onPositionChanged])

  useEffect(() => {
    if (instance && onShapeChanged) {
      if (shapeChangedListener !== null) {
        google.maps.event.removeListener(shapeChangedListener)
      }

      setShapeChangedListener(
        google.maps.event.addListener(instance, 'shape_changed', onShapeChanged)
      )
    }
  }, [onShapeChanged])

  useEffect(() => {
    if (instance && onTitleChanged) {
      if (titleChangedListener !== null) {
        google.maps.event.removeListener(titleChangedListener)
      }

      setTitleChangedListener(
        google.maps.event.addListener(instance, 'title_changed', onTitleChanged)
      )
    }
  }, [onTitleChanged])

  useEffect(() => {
    if (instance && onVisibleChanged) {
      if (visibleChangedListener !== null) {
        google.maps.event.removeListener(visibleChangedListener)
      }

      setVisibleChangedListener(
        google.maps.event.addListener(instance, 'visible_changed', onVisibleChanged)
      )
    }
  }, [onVisibleChanged])

  useEffect(() => {
    if (instance && onZindexChanged) {
      if (zIndexChangedListener !== null) {
        google.maps.event.removeListener(zIndexChangedListener)
      }

      setZindexChangedListener(
        google.maps.event.addListener(instance, 'zindex_changed', onZindexChanged)
      )
    }
  }, [onZindexChanged])

  useEffect(() => {
    const markerOptions = {
      ...(options || defaultOptions),
      ...(clusterer ? defaultOptions : { map }),
      position: position,
    }

    const marker = new google.maps.Marker(markerOptions)

    if (clusterer) {
      clusterer.addMarker(marker, !!noClustererRedraw)
    } else {
      marker.setMap(map)
    }

    if (position) {
      marker.setPosition(position)
    }

    if (typeof visible !== 'undefined') {
      marker.setVisible(visible)
    }

    if (typeof draggable !== 'undefined') {
      marker.setDraggable(draggable)
    }

    if (typeof clickable !== 'undefined') {
      marker.setClickable(clickable)
    }

    if (typeof cursor === 'string') {
      marker.setCursor(cursor)
    }

    if (icon) {
      marker.setIcon(icon)
    }

    if (typeof label !== 'undefined') {
      marker.setLabel(label)
    }

    if (typeof opacity !== 'undefined') {
      marker.setOpacity(opacity)
    }

    if (shape) {
      marker.setShape(shape)
    }

    if (typeof title === 'string') {
      marker.setTitle(title)
    }

    if (typeof zIndex === 'number') {
      marker.setZIndex(zIndex)
    }

    if (onDblClick) {
      setDblclickListener(
        google.maps.event.addListener(marker, 'dblclick', onDblClick)
      )
    }

    if (onDragEnd) {
      setDragendListener(
        google.maps.event.addListener(marker, 'dragend', onDragEnd)
      )
    }

    if (onDragStart) {
      setDragstartListener(
        google.maps.event.addListener(marker, 'dragstart', onDragStart)
      )
    }

    if (onMouseDown) {
      setMousedownListener(
        google.maps.event.addListener(marker, 'mousedown', onMouseDown)
      )
    }

    if (onMouseOut) {
      setMouseoutListener(
        google.maps.event.addListener(marker, 'mouseout', onMouseOut)
      )
    }

    if (onMouseOver) {
      setMouseoverListener(
        google.maps.event.addListener(marker, 'mouseover', onMouseOver)
      )
    }

    if (onMouseUp) {
      setMouseupListener(
        google.maps.event.addListener(marker, 'mouseup', onMouseUp)
      )
    }

    if (onRightClick) {
      setRightclickListener(
        google.maps.event.addListener(marker, 'rightclick', onRightClick)
      )
    }

    if (onClick) {
      setClickListener(
        google.maps.event.addListener(marker, 'click', onClick)
      )
    }

    if (onDrag) {
      setDragListener(
        google.maps.event.addListener(marker, 'drag', onDrag)
      )
    }

    if (onClickableChanged) {
      setClickableChangedListener(
        google.maps.event.addListener(marker, 'clickable_changed', onClickableChanged)
      )
    }

    if (onCursorChanged) {
      setCursorChangedListener(
        google.maps.event.addListener(marker, 'cursor_changed', onCursorChanged)
      )
    }

    if (onAnimationChanged) {
      setAnimationChangedListener(
        google.maps.event.addListener(marker, 'animation_changed', onAnimationChanged)
      )
    }

    if (onDraggableChanged) {
      setDraggableChangedListener(
        google.maps.event.addListener(marker, 'draggable_changed', onDraggableChanged)
      )
    }

    if (onFlatChanged) {
      setFlatChangedListener(
        google.maps.event.addListener(marker, 'flat_changed', onFlatChanged)
      )
    }

    if (onIconChanged) {
      setIconChangedListener(
        google.maps.event.addListener(marker, 'icon_changed', onIconChanged)
      )
    }

    if (onPositionChanged) {
      setPositionChangedListener(
        google.maps.event.addListener(marker, 'position_changed', onPositionChanged)
      )
    }

    if (onShapeChanged) {
      setShapeChangedListener(
        google.maps.event.addListener(marker, 'shape_changed', onShapeChanged)
      )
    }

    if (onTitleChanged) {
      setTitleChangedListener(
        google.maps.event.addListener(marker, 'title_changed', onTitleChanged)
      )
    }

    if (onVisibleChanged) {
      setVisibleChangedListener(
        google.maps.event.addListener(marker, 'visible_changed', onVisibleChanged)
      )
    }

    if (onZindexChanged) {
      setZindexChangedListener(
        google.maps.event.addListener(marker, 'zindex_changed', onZindexChanged)
      )
    }

    setInstance(marker)

    if (onLoad) {
      onLoad(marker)
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

      if (clickableChangedListener !== null) {
        google.maps.event.removeListener(clickableChangedListener)
      }

      if (cursorChangedListener !== null) {
        google.maps.event.removeListener(cursorChangedListener)
      }

      if (animationChangedListener !== null) {
        google.maps.event.removeListener(animationChangedListener)
      }

      if (draggableChangedListener !== null) {
        google.maps.event.removeListener(draggableChangedListener)
      }

      if (flatChangedListener !== null) {
        google.maps.event.removeListener(flatChangedListener)
      }

      if (iconChangedListener !== null) {
        google.maps.event.removeListener(iconChangedListener)
      }

      if (positionChangedListener !== null) {
        google.maps.event.removeListener(positionChangedListener)
      }

      if (titleChangedListener !== null) {
        google.maps.event.removeListener(titleChangedListener)
      }

      if (visibleChangedListener !== null) {
        google.maps.event.removeListener(visibleChangedListener)
      }

      if (zIndexChangedListener !== null) {
        google.maps.event.removeListener(zIndexChangedListener)
      }

      if (onUnmount) {
        onUnmount(marker)
      }

      if (clusterer) {
        clusterer.removeMarker(marker, !!noClustererRedraw)
      } else if (marker) {
        marker.setMap(null)
      }
    }
  }, [])

  const chx = useMemo<ReactNode | null>(() => {
    return children
    ?  Children.map(children, child => {
      if (!isValidElement<HasMarkerAnchor>(child)) {
        return child
      }

      const elementChild: ReactElement<HasMarkerAnchor> = child

      return cloneElement(elementChild, { anchor: instance })
    })
    : null
  }, [children, instance])

  return <>{chx}</> || null
}

export const MarkerF = memo(MarkerFunctional)

export class Marker extends PureComponent<MarkerProps> {
  static contextType = MapContext
  declare context: ContextType<typeof MapContext>

  registeredEvents: google.maps.MapsEventListener[] = []

  marker: google.maps.Marker | undefined

  componentDidMount(): void {
    const markerOptions = {
      ...(this.props.options || defaultOptions),
      ...(this.props.clusterer ? defaultOptions : { map: this.context }),
      position: this.props.position,
    }

    // Unfortunately we can't just do this in the contstructor, because the
    // `MapContext` might not be filled in yet.
    this.marker = new google.maps.Marker(markerOptions)

    if (this.props.clusterer) {
      this.props.clusterer.addMarker(this.marker, !!this.props.noClustererRedraw)
    } else {
      this.marker.setMap(this.context)
    }

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: this.marker,
    })

    if (this.props.onLoad) {
      this.props.onLoad(this.marker)
    }
  }

  componentDidUpdate(prevProps: MarkerProps): void {
    if (this.marker) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.marker,
      })
    }
  }

  componentWillUnmount(): void {
    if (this.marker) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.marker)
      }

      unregisterEvents(this.registeredEvents)

      if (this.props.clusterer) {
        this.props.clusterer.removeMarker(this.marker, !!this.props.noClustererRedraw)
      } else {
        this.marker && this.marker.setMap(null)
      }
    }
  }

  render(): ReactNode {
    let children: ReactNode | null = null

    if (this.props.children) {
      children = Children.map(this.props.children, child => {
        if (!isValidElement<HasMarkerAnchor>(child)) {
          return child
        }

        let elementChild: ReactElement<HasMarkerAnchor> = child

        return cloneElement(elementChild, { anchor: this.marker })
      })
    }

    return children || null
  }
}

export default Marker
