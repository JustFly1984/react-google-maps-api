import * as React from "react"

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "../../utils/helper"
import MapContext from "../../map-context"

const eventMap = {
  onBoundsChanged: "bounds_changed",
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
  bounds(
    instance: google.maps.Rectangle,
    bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral
  ) {
    instance.setBounds(bounds)
  },
  draggable(instance: google.maps.Rectangle, draggable: boolean) {
    instance.setDraggable(draggable)
  },
  editable(instance: google.maps.Rectangle, editable: boolean) {
    instance.setEditable(editable)
  },
  map(instance: google.maps.Rectangle, map: google.maps.Map) {
    instance.setMap(map)
  },
  options(
    instance: google.maps.Rectangle,
    options: google.maps.RectangleOptions
  ) {
    instance.setOptions(options)
  },
  visible(instance: google.maps.Rectangle, visible: boolean) {
    instance.setVisible(visible)
  }
}

interface RectangleState {
  rectangle: google.maps.Rectangle | null;
}

export interface RectangleProps {
  options?: google.maps.RectangleOptions;
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
  draggable?: boolean;
  editable?: boolean;
  visible?: boolean;
  clickable?: boolean;
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
  onBoundsChanged?: () => void;
  onLoad?: (rectangle: google.maps.Rectangle) => void;
  onUnmount?: (rectangle: google.maps.Rectangle) => void;
}

export class Rectangle extends React.PureComponent<
  RectangleProps,
  RectangleState
> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: RectangleState = {
    rectangle: null
  }

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  setRectangleCallback = () => {
    if (this.state.rectangle !== null && this.props.onLoad) {
      this.props.onLoad(this.state.rectangle)
    }
  }

  componentDidMount() {
    const rectangle = new google.maps.Rectangle({
      ...(this.props.options || {}),
      map: this.context
    })

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: rectangle
    })

    function setRectangle() {
      return {
        rectangle
      }
    }

    this.setState(
      setRectangle,
      this.setRectangleCallback
    )
  }


  componentDidUpdate(prevProps: RectangleProps) {
    if (this.state.rectangle !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.rectangle
      })
    }
  }

  componentWillUnmount() {
    if (this.state.rectangle !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.rectangle)
      }

      unregisterEvents(this.registeredEvents)

      this.state.rectangle.setMap(null)
    }
  }

  render() {
    return <></>
  }
}

export default Rectangle
