/* global google */
import * as React from "react"

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "../../utils/helper"

import MapContext from "../../map-context"

const eventMap = {
  onClick: "click",
  onDblClick: "dblclick",
  onDrag: "drag",
  onDragEnd: "dragend",
  onDragStart: "dragstart",
  onMouseDown: "mousedown",
  onMouseMove: "mousemove",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseUp: "mouseup",
  onRightClick: "rightclick"
}

const updaterMap = {
  draggable(instance: google.maps.Polygon, draggable: boolean) {
    instance.setDraggable(draggable)
  },
  editable(instance: google.maps.Polygon, editable: boolean) {
    instance.setEditable(editable)
  },
  map(instance: google.maps.Polygon, map: google.maps.Map) {
    instance.setMap(map)
  },
  options(instance: google.maps.Polygon, options: google.maps.PolygonOptions) {
    instance.setOptions(options)
  },
  path(
    instance: google.maps.Polygon,
    path: google.maps.MVCArray<google.maps.LatLng> | google.maps.LatLng[] | google.maps.LatLngLiteral[]
  ) {
    instance.setPath(path)
  },

  paths(
    instance: google.maps.Polygon,
    paths: google.maps.MVCArray<google.maps.LatLng> | google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>> | google.maps.LatLng[] | google.maps.LatLng[][] | google.maps.LatLngLiteral[] | google.maps.LatLngLiteral[][]
  ) {
    instance.setPaths(paths)
  },

  visible(instance: google.maps.Polygon, visible: boolean) {
    instance.setVisible(visible)
  }
}

interface PolygonState {
  polygon: google.maps.Polygon | null;
}

export interface PolygonProps {
  options?: google.maps.PolygonOptions;
  draggable?: boolean;
  editable?: boolean;
  visible?: boolean;
  path?: google.maps.MVCArray<google.maps.LatLng> | google.maps.LatLng[] | google.maps.LatLngLiteral[];
  paths?: google.maps.MVCArray<google.maps.LatLng> | google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>> | google.maps.LatLng[] | google.maps.LatLng[][] | google.maps.LatLngLiteral[] | google.maps.LatLngLiteral[][];
  onDblClick?: (e: google.maps.MouseEvent) => void;
  onDragEnd?: (e: google.maps.MouseEvent) => void;
  onDragStart?: (e: google.maps.MouseEvent) => void;
  onMouseDown?: (e: google.maps.MouseEvent) => void;
  onMouseMove?: (e: google.maps.MouseEvent) => void;
  onMouseOut?: (e: google.maps.MouseEvent) => void;
  onMouseOver?: (e: google.maps.MouseEvent) => void;
  onMouseUp?: (e: google.maps.MouseEvent) => void;
  onRightClick?: (e: google.maps.MouseEvent) => void;
  onClick?: (e: google.maps.MouseEvent) => void;
  onDrag?: (e: google.maps.MouseEvent) => void;
  onLoad?: (polygon: google.maps.Polygon) => void;
  onUnmount?: (polygon: google.maps.Polygon) => void;
}

export class Polygon extends React.PureComponent<PolygonProps, PolygonState> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: PolygonState = {
    polygon: null
  }

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  setPolygonCallback = () => {
    if (this.state.polygon !== null && this.props.onLoad) {
      this.props.onLoad(this.state.polygon)
    }
  }

  componentDidMount() {
    const polygon = new google.maps.Polygon({
      ...(this.props.options || {}),
      map: this.context
    })

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: polygon
    })

    function setPolygon() {
      return {
        polygon
      }
    }

    this.setState(
      setPolygon,
      this.setPolygonCallback
    )
  }

  componentDidUpdate(prevProps: PolygonProps) {
    if (this.state.polygon !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.polygon
      })
    }
  }

  componentWillUnmount() {
    if (this.state.polygon !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.polygon)
      }

      unregisterEvents(this.registeredEvents)

      this.state.polygon && this.state.polygon.setMap(null)
    }
  }

  render = () => null
}

export default Polygon
