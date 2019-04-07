import * as React from "react"

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "../../utils/helper"

import MapContext from "../../map-context"

const eventMap = {
  onCenterChanged: "center_changed",
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
  onRadiusChanged: "radius_changed",
  onRightClick: "rightclick"
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

interface CircleState {
  circle: google.maps.Circle | null;
}

export interface CircleProps {
  options?: google.maps.CircleOptions;

  // required
  center: google.maps.LatLng | google.maps.LatLngLiteral;

  // required
  radius: number;
  draggable?: boolean;
  editable?: boolean;
  visible?: boolean;
  onDblClick?: (e: google.maps.MouseEvent) => void;
  onDragEnd?: (e: google.maps.MouseEvent) => void;
  onDragStart?: (e: google.maps.MouseEvent) => void;
  onMouseDown?: (e: google.maps.MouseEvent) => void;
  onMouseMove?: (e: google.maps.MouseEvent) => void;
  onMouseOut?: (e: google.maps.MouseEvent) => void;
  onMouseOver?: (e: google.maps.MouseEvent) => void;
  onMouseUp?: (e: google.maps.MouseEvent) => void;
  onRightClick?: (e: google.maps.MouseEvent) => void;
  onCenterChanged?: () => void;
  onClick?: (e: google.maps.MouseEvent) => void;
  onDrag?: (e: google.maps.MouseEvent) => void;
  onRadiusChanged?: () => void;
  onLoad?: (circle: google.maps.Circle) => void;
  onUnmount?: (circle: google.maps.Circle) => void;
}

export class Circle extends React.PureComponent<CircleProps, CircleState> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: CircleState = {
    circle: null
  }

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  setCircleCallback = () => {
    if (this.state.circle !== null && this.props.onLoad) {
      this.props.onLoad(this.state.circle)
    }
  }

  componentDidMount() {
    const circle = new google.maps.Circle({
      ...(this.props.options || {}),
      map: this.context
    })

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: circle
    })

    function setCircle() {
      return {
        circle
      }
    }

    this.setState(setCircle, this.setCircleCallback)
  }

  componentDidUpdate(prevProps: CircleProps) {
    if (this.state.circle !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.circle
      })
    }
  }

  componentWillUnmount() {
    if (this.state.circle !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.circle)
      }

      unregisterEvents(this.registeredEvents)

      this.state.circle && this.state.circle.setMap(null)
    }
  }

  render() {
    return <></>
  }
}

export default Circle
