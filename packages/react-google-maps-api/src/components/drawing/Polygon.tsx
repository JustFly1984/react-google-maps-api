/* global google */
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
  options?: google.maps.PolygonOptions
  /** If set to true, the user can drag this shape over the map. The geodesic property defines the mode of dragging. */
  draggable?: boolean
  /** If set to true, the user can edit this shape by dragging the control points shown at the vertices and on each segment. */
  editable?: boolean
  /** Hides this poly if set to false. */
  visible?: boolean
  /** Sets the first path. See Paths for more details. */
  path?:
    | google.maps.MVCArray<google.maps.LatLng>
    | google.maps.LatLng[]
    | google.maps.LatLngLiteral[]
  /** Sets the path for this polygon. The ordered sequence of coordinates that designates a closed loop. Unlike polylines, a polygon may consist of one or more paths. As a result, the paths property may specify one or more arrays of LatLng coordinates. Paths are closed automatically; do not repeat the first vertex of the path as the last vertex. Simple polygons may be defined using a single array of LatLngs. More complex polygons may specify an array of arrays. Any simple arrays are converted into MVCArrays. Inserting or removing LatLngs from the MVCArray will automatically update the polygon on the map. */
  paths?:
    | google.maps.MVCArray<google.maps.LatLng>
    | google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>>
    | google.maps.LatLng[]
    | google.maps.LatLng[][]
    | google.maps.LatLngLiteral[]
    | google.maps.LatLngLiteral[][]
  /** This event is fired when the DOM dblclick event is fired on the Polygon. */
  onDblClick?: (e: google.maps.MouseEvent) => void
  /** This event is fired when the user stops dragging the polygon. */
  onDragEnd?: (e: google.maps.MouseEvent) => void
  /** This event is fired when the user starts dragging the polygon. */
  onDragStart?: (e: google.maps.MouseEvent) => void
  /** This event is fired when the DOM mousedown event is fired on the Polygon. */
  onMouseDown?: (e: google.maps.MouseEvent) => void
  /** This event is fired when the DOM mousemove event is fired on the Polygon. */
  onMouseMove?: (e: google.maps.MouseEvent) => void
  /** This event is fired on Polygon mouseout. */
  onMouseOut?: (e: google.maps.MouseEvent) => void
  /** This event is fired on Polygon mouseover. */
  onMouseOver?: (e: google.maps.MouseEvent) => void
  /** This event is fired when the DOM mouseup event is fired on the Polygon. */
  onMouseUp?: (e: google.maps.MouseEvent) => void
  /** This event is fired when the Polygon is right-clicked on. */
  onRightClick?: (e: google.maps.MouseEvent) => void
  /** This event is fired when the DOM click event is fired on the Polygon. */
  onClick?: (e: google.maps.MouseEvent) => void
  /** This event is repeatedly fired while the user drags the polygon. */
  onDrag?: (e: google.maps.MouseEvent) => void
  /** This callback is called when the polygon instance has loaded. It is called with the polygon instance. */
  onLoad?: (polygon: google.maps.Polygon) => void
  /** This callback is called when the component unmounts. It is called with the polygon instance. */
  onUnmount?: (polygon: google.maps.Polygon) => void
}

export class Polygon extends React.PureComponent<PolygonProps, PolygonState> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: PolygonState = {
    polygon: null,
  }

  setPolygonCallback = (): void => {
    if (this.state.polygon !== null && this.props.onLoad) {
      this.props.onLoad(this.state.polygon)
    }
  }

  componentDidMount(): void {
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

  componentDidUpdate(prevProps: PolygonProps): void {
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

  componentWillUnmount(): void {
    if (this.state.polygon !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.polygon)
      }

      unregisterEvents(this.registeredEvents)

      this.state.polygon && this.state.polygon.setMap(null)
    }
  }

  render(): React.ReactNode {
    return null
  }
}

export default Polygon
