/* global google */
import { PureComponent } from 'react'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/helper'

import MapContext from '../../map-context'
import useMapComponent from '../../utils/use-map-component';

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
  onRightClick: 'rightclick'
}

const updaterMap = {
  draggable(instance: google.maps.Polyline, draggable: boolean) {
    instance.setDraggable(draggable)
  },
  editable(instance: google.maps.Polyline, editable: boolean) {
    instance.setEditable(editable)
  },
  map(instance: google.maps.Polyline, map: google.maps.Map) {
    instance.setMap(map)
  },
  options(instance: google.maps.Polyline, options: google.maps.PolylineOptions) {
    instance.setOptions(options)
  },
  path(instance: google.maps.Polyline, path: google.maps.MVCArray<google.maps.LatLng> | google.maps.LatLng[] | google.maps.LatLngLiteral[]) {
    instance.setPath(path)
  },
  visible(instance: google.maps.Polyline, visible: boolean) {
    instance.setVisible(visible)
  }
}

interface PolylineProps {
  options: google.maps.PolylineOptions;
  draggable: boolean;
  editable: boolean;
  visible: boolean;
  path: google.maps.MVCArray<google.maps.LatLng> | google.maps.LatLng[] | google.maps.LatLngLiteral[];
  onDblClick: (e: MouseEvent) => void;
  onDragEnd: (e: MouseEvent) => void;
  onDragStart: (e: MouseEvent) => void;
  onMouseDown: (e: MouseEvent) => void;
  onMouseMove: (e: MouseEvent) => void;
  onMouseOut: (e: MouseEvent) => void;
  onMouseOver: (e: MouseEvent) => void;
  onMouseUp: (e: MouseEvent) => void;
  onRightClick: (e: MouseEvent) => void;
  onClick: (e: MouseEvent) => void;
  onDrag: (e: MouseEvent) => void;
}

export default function Polyline(props: PolylineProps) {
  return useMapComponent(props, updaterMap, eventMap, 'Polyline')
}