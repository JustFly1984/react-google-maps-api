import * as React from "react"

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "../../utils/helper"

import MapContext from "../../map-context"

import { Clusterer } from "@react-google-maps/marker-clusterer"

const eventMap = {
  onAnimationChanged: "animation_changed",
  onClick: "click",
  onClickableChanged: "clickable_changed",
  onCursorChanged: "cursor_changed",
  onDblClick: "dblclick",
  onDrag: "drag",
  onDragEnd: "dragend",
  onDraggableChanged: "draggable_changed",
  onDragStart: "dragstart",
  onFlatChanged: "flat_changed",
  onIconChanged: "icon_changed",
  onMouseDown: "mousedown",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseUp: "mouseup",
  onPositionChanged: "position_changed",
  onRightClick: "rightclick",
  onShapeChanged: "shape_changed",
  onTitleChanged: "title_changed",
  onVisibleChanged: "visible_changed",
  onZindexChanged: "zindex_changed"
}

const updaterMap = {
  animation(instance: google.maps.Marker, animation: google.maps.Animation) {
    instance.setAnimation(animation)
  },
  clickable(instance: google.maps.Marker, clickable: boolean) {
    instance.setClickable(clickable)
  },
  cursor(instance: google.maps.Marker, cursor: string) {
    instance.setCursor(cursor)
  },
  draggable(instance: google.maps.Marker, draggable: boolean) {
    instance.setDraggable(draggable)
  },
  icon(
    instance: google.maps.Marker,
    icon: string | google.maps.Icon | google.maps.Symbol
  ) {
    instance.setIcon(icon)
  },
  label(instance: google.maps.Marker, label: string | google.maps.MarkerLabel) {
    instance.setLabel(label)
  },
  map(instance: google.maps.Marker, map: google.maps.Map) {
    instance.setMap(map)
  },
  opacity(instance: google.maps.Marker, opacity: number) {
    instance.setOpacity(opacity)
  },
  options(instance: google.maps.Marker, options: google.maps.MarkerOptions) {
    instance.setOptions(options)
  },
  position(
    instance: google.maps.Marker,
    position: google.maps.LatLng | google.maps.LatLngLiteral
  ) {
    instance.setPosition(position)
  },
  shape(instance: google.maps.Marker, shape: google.maps.MarkerShape) {
    instance.setShape(shape)
  },
  title(instance: google.maps.Marker, title: string) {
    instance.setTitle(title)
  },
  visible(instance: google.maps.Marker, visible: boolean) {
    instance.setVisible(visible)
  },
  zIndex(instance: google.maps.Marker, zIndex: number) {
    instance.setZIndex(zIndex)
  }
}

interface MarkerState {
  marker: google.maps.Marker | null;
}

export interface MarkerProps {
  options?: google.maps.MapOptions;
  animation?: google.maps.Animation;
  clickable?: boolean;
  cursor?: string;
  draggable?: boolean;
  icon?: string | google.maps.Icon | google.maps.Symbol;
  label?: string | google.maps.MarkerLabel;
  opacity?: number;
  position: google.maps.LatLng | google.maps.LatLngLiteral;
  shape?: google.maps.MarkerShape;
  title?: string;
  visible?: boolean;
  zIndex?: number;
  clusterer?: Clusterer;
  noClustererRedraw?: boolean;
  onClick?: (e: google.maps.MouseEvent) => void;
  onClickableChanged?: () => void;
  onCursorChanged?: () => void;
  onAnimationChanged?: () => void;
  onDblClick?: (e: google.maps.MouseEvent) => void;
  onDrag?: (e: google.maps.MouseEvent) => void;
  onDragEnd?: (e: google.maps.MouseEvent) => void;
  onDraggableChanged?: () => void;
  onDragStart?: (e: google.maps.MouseEvent) => void;
  onFlatChanged?: () => void;
  onIconChanged?: () => void;
  onMouseDown?: (e: google.maps.MouseEvent) => void;
  onMouseOut?: (e: google.maps.MouseEvent) => void;
  onMouseOver?: (e: google.maps.MouseEvent) => void;
  onMouseUp?: (e: google.maps.MouseEvent) => void;
  onPositionChanged?: () => void;
  onRightClick?: (e: google.maps.MouseEvent) => void;
  onShapeChanged?: () => void;
  onTitleChanged?: () => void;
  onVisibleChanged?: () => void;
  onZindexChanged?: () => void;
  onLoad?: (marker: google.maps.Marker) => void;
  onUnmount?: (marker: google.maps.Marker) => void;
}

export class Marker extends React.PureComponent<MarkerProps, MarkerState> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: MarkerState = {
    marker: null
  }

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  setMarkerCallback = () => {
    if (this.state.marker !== null && this.props.onLoad) {
      this.props.onLoad(this.state.marker)
    }
  }

  componentDidMount() {
    const markerOptions = {
      ...(this.props.options || {}),
      ...(this.props.clusterer ? {} : { map: this.context }),
      position: this.props.position
    }

    const marker = new google.maps.Marker(markerOptions)

    if (this.props.clusterer) {
      this.props.clusterer.addMarker(
        // @ts-ignore
        marker,
        !!this.props.noClustererRedraw
      )
    } else {
      marker.setMap(this.context)
    }

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: marker
    })

    function setMarker() {
      return {
        marker
      }
    }

    this.setState(
      setMarker,
      this.setMarkerCallback
    )
  }

  componentDidUpdate(prevProps: MarkerProps) {
    if (this.state.marker !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.marker
      })
    }
  }

  componentWillUnmount() {
    if (this.state.marker !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.marker)
      }

      unregisterEvents(this.registeredEvents)

      if (this.props.clusterer) {
        this.props.clusterer.removeMarker(
          // @ts-ignore
          this.state.marker,
          !!this.props.noClustererRedraw
        )
      } else {
        this.state.marker && this.state.marker.setMap(null)
      }
    }
  }

  render() {
    return this.props.children || null
  }
}

export default Marker
