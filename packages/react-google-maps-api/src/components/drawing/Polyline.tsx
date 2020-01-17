import * as React from 'react'

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
  draggable(instance: google.maps.Polyline, draggable: boolean): void {
    instance.setDraggable(draggable)
  },
  editable(instance: google.maps.Polyline, editable: boolean): void {
    instance.setEditable(editable)
  },
  map(instance: google.maps.Polyline, map: google.maps.Map): void {
    instance.setMap(map)
  },
  options(instance: google.maps.Polyline, options: google.maps.PolylineOptions): void {
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

interface PolylineState {
  polyline: google.maps.Polyline | null
}

export interface PolylineProps {
  options?: google.maps.PolylineOptions
  /** If set to true, the user can drag this shape over the map. The geodesic property defines the mode of dragging. */
  draggable?: boolean
  /** If set to true, the user can edit this shape by dragging the control points shown at the vertices and on each segment. */
  editable?: boolean
  /** Hides this poly if set to false. */
  visible?: boolean
  /** Sets the path. The ordered sequence of coordinates of the Polyline. This path may be specified using either a simple array of LatLngs, or an MVCArray of LatLngs. Note that if you pass a simple array, it will be converted to an MVCArray Inserting or removing LatLngs in the MVCArray will automatically update the polyline on the map. */
  path?:
    | google.maps.MVCArray<google.maps.LatLng>
    | google.maps.LatLng[]
    | google.maps.LatLngLiteral[]
  /** This event is fired when the DOM dblclick event is fired on the Polyline. */
  onDblClick?: (e: google.maps.MouseEvent) => void
  /** This event is fired when the user stops dragging the polyline. */
  onDragEnd?: (e: google.maps.MouseEvent) => void
  /** This event is fired when the user starts dragging the polyline. */
  onDragStart?: (e: google.maps.MouseEvent) => void
  /** This event is fired when the DOM mousedown event is fired on the Polyline. */
  onMouseDown?: (e: google.maps.MouseEvent) => void
  /** This event is fired when the DOM mousemove event is fired on the Polyline. */
  onMouseMove?: (e: google.maps.MouseEvent) => void
  /** This event is fired on Polyline mouseout. */
  onMouseOut?: (e: google.maps.MouseEvent) => void
  /** This event is fired on Polyline mouseover. */
  onMouseOver?: (e: google.maps.MouseEvent) => void
  /** This event is fired when the DOM mouseup event is fired on the Polyline. */
  onMouseUp?: (e: google.maps.MouseEvent) => void
  /** This event is fired when the Polyline is right-clicked on. */
  onRightClick?: (e: google.maps.MouseEvent) => void
  /** This event is fired when the DOM click event is fired on the Polyline. */
  onClick?: (e: google.maps.MouseEvent) => void
  /** This event is repeatedly fired while the user drags the polyline. */
  onDrag?: (e: google.maps.MouseEvent) => void
  /** This callback is called when the polyline instance has loaded. It is called with the polyline instance. */
  onLoad?: (polyline: google.maps.Polyline) => void
  /** This callback is called when the component unmounts. It is called with the polyline instance. */
  onUnmount?: (polyline: google.maps.Polyline) => void
}

export class Polyline extends React.PureComponent<PolylineProps, PolylineState> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: PolylineState = {
    polyline: null,
  }

  setPolylineCallback = (): void => {
    if (this.state.polyline !== null && this.props.onLoad) {
      this.props.onLoad(this.state.polyline)
    }
  }

  componentDidMount(): void {
    const polyline = new google.maps.Polyline({
      ...(this.props.options || {}),
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

  componentDidUpdate(prevProps: PolylineProps): void {
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

  componentWillUnmount(): void {
    if (this.state.polyline !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.polyline)
      }

      unregisterEvents(this.registeredEvents)

      this.state.polyline.setMap(null)
    }
  }

  render(): React.ReactNode {
    return <></>
  }
}

export default Polyline
