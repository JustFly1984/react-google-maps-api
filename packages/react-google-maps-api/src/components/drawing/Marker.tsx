import * as React from 'react'

import { unregisterEvents, applyUpdatersToPropsAndRegisterEvents } from '../../utils/helper'

import MapContext from '../../map-context'
import { HasMarkerAnchor } from '../../types'

import { Clusterer } from '@react-google-maps/marker-clusterer'
import { ReactNode } from 'react'

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
  options?: google.maps.MarkerOptions
  /** Start an animation. Any ongoing animation will be cancelled. Currently supported animations are: BOUNCE, DROP. Passing in null will cause any animation to stop. */
  animation?: google.maps.Animation
  /** If true, the marker receives mouse and touch events. Default value is true. */
  clickable?: boolean
  /** Mouse cursor to show on hover */
  cursor?: string
  /** If true, the marker can be dragged. Default value is false. */
  draggable?: boolean
  /** Icon for the foreground. If a string is provided, it is treated as though it were an Icon with the string as url. */
  icon?: string | google.maps.Icon | google.maps.Symbol
  /** Adds a label to the marker. The label can either be a string, or a MarkerLabel object. */
  label?: string | google.maps.MarkerLabel
  /** The marker's opacity between 0.0 and 1.0. */
  opacity?: number

  // required
  /** Marker position. */
  position: google.maps.LatLng | google.maps.LatLngLiteral
  /** Image map region definition used for drag/click. */
  shape?: google.maps.MarkerShape
  /** Rollover text */
  title?: string
  /** If true, the marker is visible */
  visible?: boolean
  /** All markers are displayed on the map in order of their zIndex, with higher values displaying in front of markers with lower values. By default, markers are displayed according to their vertical position on screen, with lower markers appearing in front of markers further up the screen. */
  zIndex?: number
  /** Render prop that handles clustering markers */
  clusterer?: Clusterer
  /** Clusters are redrawn when a Marker is added unless noClustererRedraw? is set to true. */
  noClustererRedraw?: boolean
  /** This event is fired when the marker icon was clicked. */
  onClick?: (e: google.maps.MapMouseEvent) => void
  /** This event is fired when the marker's clickable property changes. */
  onClickableChanged?: () => void
  /** This event is fired when the marker's cursor property changes. */
  onCursorChanged?: () => void
  /** This event is fired when the marker's animation property changes. */
  onAnimationChanged?: () => void
  /** This event is fired when the marker icon was double clicked. */
  onDblClick?: (e: google.maps.MapMouseEvent) => void
  /** This event is repeatedly fired while the user drags the marker. */
  onDrag?: (e: google.maps.MapMouseEvent) => void
  /** This event is fired when the user stops dragging the marker. */
  onDragEnd?: (e: google.maps.MapMouseEvent) => void
  /** This event is fired when the marker's draggable property changes. */
  onDraggableChanged?: () => void
  /** This event is fired when the user starts dragging the marker. */
  onDragStart?: (e: google.maps.MapMouseEvent) => void
  /** This event is fired when the marker's flat property changes. */
  onFlatChanged?: () => void
  /** This event is fired when the marker icon property changes. */
  onIconChanged?: () => void
  /** This event is fired for a mousedown on the marker. */
  onMouseDown?: (e: google.maps.MapMouseEvent) => void
  /** This event is fired when the mouse leaves the area of the marker icon. */
  onMouseOut?: (e: google.maps.MapMouseEvent) => void
  /** This event is fired when the mouse enters the area of the marker icon. */
  onMouseOver?: (e: google.maps.MapMouseEvent) => void
  /** This event is fired for a mouseup on the marker. */
  onMouseUp?: (e: google.maps.MapMouseEvent) => void
  /** This event is fired when the marker position property changes. */
  onPositionChanged?: () => void
  /** This event is fired for a rightclick on the marker. */
  onRightClick?: (e: google.maps.MapMouseEvent) => void
  /** This event is fired when the marker's shape property changes. */
  onShapeChanged?: () => void
  /** This event is fired when the marker title property changes. */
  onTitleChanged?: () => void
  /** This event is fired when the marker's visible property changes. */
  onVisibleChanged?: () => void
  /** This event is fired when the marker's zIndex property changes. */
  onZindexChanged?: () => void
  /** This callback is called when the marker instance has loaded. It is called with the marker instance. */
  onLoad?: (marker: google.maps.Marker) => void
  /** This callback is called when the component unmounts. It is called with the marker instance. */
  onUnmount?: (marker: google.maps.Marker) => void
}

export class Marker extends React.PureComponent<MarkerProps> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []
  marker: google.maps.Marker | undefined

  componentDidMount(): void {
    const markerOptions = {
      ...(this.props.options || {}),
      ...(this.props.clusterer ? {} : { map: this.context }),
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

  render(): React.ReactNode {
    let children: ReactNode | null = null
    if (this.props.children) {
      children = React.Children.map(this.props.children, child => {
        if (!React.isValidElement<HasMarkerAnchor>(child)) {
          return child
        }

        let elementChild: React.ReactElement<HasMarkerAnchor> = child
        return React.cloneElement(elementChild, { anchor: this.marker })
      })
    }
    return children || null
  }
}

export default Marker
