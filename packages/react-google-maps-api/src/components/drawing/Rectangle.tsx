/* global google */
import { Bounds } from '../../types'
import useMapComponent from '../../utils/use-map-component'

const eventMap = {
  onBoundsChanged: 'bounds_changed',
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
  bounds (instance: google.maps.Rectangle, bounds: Bounds) {
    instance.setBounds(bounds)
  },
  draggable (instance: google.maps.Rectangle, draggable: boolean) {
    instance.setDraggable(draggable)
  },
  editable (instance: google.maps.Rectangle, editable: boolean) {
    instance.setEditable(editable)
  },
  map (instance: google.maps.Rectangle, map: google.maps.Map) {
    instance.setMap(map)
  },
  options (
    instance: google.maps.Rectangle,
    options: google.maps.RectangleOptions
  ) {
    console.log('called options')
    instance.setOptions(options)
  },
  visible (instance: google.maps.Rectangle, visible: boolean) {
    instance.setVisible(visible)
  }
}

// prettier-ignore
interface RectangleProps {
  options?: google.maps.RectangleOptions;
  bounds?: Bounds;
  draggable?: boolean;
  editable?: boolean;
  visible?: boolean;
  clickable?: boolean;
  onDblClick?: (e: MouseEvent) => void;
  onDragEnd?: (e: MouseEvent) => void;
  onDragStart?: (e: MouseEvent) => void;
  onMouseDown?: (e: MouseEvent) => void;
  onMouseMove?: (e: MouseEvent) => void;
  onMouseOut?: (e: MouseEvent) => void;
  onMouseOver?: (e: MouseEvent) => void;
  onMouseUp?: (e: MouseEvent) => void;
  onRightClick?: (e: MouseEvent) => void;
  onClick?: (e: MouseEvent) => void;
  onDrag?: (e: MouseEvent) => void;
  onBoundsChanged?: () => void;
}

export default function Rectangle (props: RectangleProps) {
  return useMapComponent(props, updaterMap, eventMap, 'Rectangle')
}
