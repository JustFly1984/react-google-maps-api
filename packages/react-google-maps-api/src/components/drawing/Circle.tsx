/* global google */
import { LatLng } from '../../types'
import useMapComponent from '../../utils/use-map-component'

const eventMap = {
  onCenterChanged: 'center_changed',
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
  onRadiusChanged: 'radius_changed',
  onRightClick: 'rightclick'
}

const updaterMap = {
  center(instance: google.maps.Circle, center: google.maps.LatLng) {
    instance.setCenter(center)
  },
  draggable(instance: google.maps.Circle, draggable: boolean) {
    instance.setDraggable(draggable)
  },
  editable(instance: google.maps.Circle, editable: boolean) {
    instance.setEditable(editable)
  },
  map(instance: google.maps.Circle, map: google.maps.Map) {
    instance.setMap(map)
  },
  options(instance: google.maps.Circle, options: google.maps.CircleOptions) {
    instance.setOptions(options)
  },
  radius(instance: google.maps.Circle, radius: number) {
    instance.setRadius(radius)
  },
  visible(instance: google.maps.Circle, visible: boolean) {
    instance.setVisible(visible)
  }
}

interface CircleProps {
  options: google.maps.CircleOptions;
  center: LatLng;
  radius: number;
  draggable: boolean;
  editable: boolean;
  visible: boolean;
  onDblClick: (e: MouseEvent) => void;
  onDragEnd: (e: MouseEvent) => void;
  onDragStart: (e: MouseEvent) => void;
  onMouseDown: (e: MouseEvent) => void;
  onMouseMove: (e: MouseEvent) => void;
  onMouseOut: (e: MouseEvent) => void;
  onMouseOver: (e: MouseEvent) => void;
  onMouseUp: (e: MouseEvent) => void;
  onRightClick: (e: MouseEvent) => void;
  onCenterChanged: () => void;
  onClick: (e: MouseEvent) => void;
  onDrag: (e: MouseEvent) => void;
  onRadiusChanged: () => void;
}

export default function Circle(props: CircleProps) {
  return useMapComponent(props, updaterMap, eventMap, 'Circle')
}
