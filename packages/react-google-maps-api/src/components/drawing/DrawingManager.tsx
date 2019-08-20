/* globals google */
import * as React from "react"

import invariant from "invariant"

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "../../utils/helper"

import MapContext from "../../map-context"

const eventMap = {
  onCircleComplete: "circlecomplete",
  onMarkerComplete: "markercomplete",
  onOverlayComplete: "overlaycomplete",
  onPolygonComplete: "polygoncomplete",
  onPolylineComplete: "polylinecomplete",
  onRectangleComplete: "rectanglecomplete"
}

const updaterMap = {
  drawingMode(
    instance: google.maps.drawing.DrawingManager,
    drawingMode: google.maps.drawing.OverlayType | null
  ) {
    instance.setDrawingMode(drawingMode)
  },
  options(
    instance: google.maps.drawing.DrawingManager,
    options: google.maps.drawing.DrawingManagerOptions
  ) {
    instance.setOptions(options)
  }
}

interface DrawingManagerState {
  drawingManager: google.maps.drawing.DrawingManager | null;
}

export interface DrawingManagerProps {
  options?: google.maps.drawing.DrawingManagerOptions;
  /** Changes the DrawingManager's drawing mode, which defines the type of overlay to be added on the map. Accepted values are 'marker', 'polygon', 'polyline', 'rectangle', 'circle', or null. A drawing mode of null means that the user can interact with the map as normal, and clicks do not draw anything. */
  drawingMode?: google.maps.drawing.OverlayType | null;
  /** This event is fired when the user has finished drawing a circle. */
  onCircleComplete?: (circle: google.maps.Circle) => void;
  /** This event is fired when the user has finished drawing a marker. */
  onMarkerComplete?: (marker: google.maps.Marker) => void;
  /** This event is fired when the user has finished drawing an overlay of any type. */
  onOverlayComplete?: (e: google.maps.drawing.OverlayCompleteEvent) => void;
  /** This event is fired when the user has finished drawing a polygon. */
  onPolygonComplete?: (polygon: google.maps.Polygon) => void;
  /** This event is fired when the user has finished drawing a polyline. */
  onPolylineComplete?: (polyline: google.maps.Polyline) => void;
  /** This event is fired when the user has finished drawing a rectangle. */
  onRectangleComplete?: (rectangle: google.maps.Rectangle) => void;
  /** This callback is called when the drawingManager instance has loaded. It is called with the drawingManager instance. */
  onLoad?: (drawingManager: google.maps.drawing.DrawingManager) => void;
  /** This callback is called when the component unmounts. It is called with the drawingManager instance. */
  onUnmount?: (drawingManager: google.maps.drawing.DrawingManager) => void;
}

export class DrawingManager extends React.PureComponent<
DrawingManagerProps,
DrawingManagerState
> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: DrawingManagerState = {
    drawingManager: null
  }

  constructor(props: DrawingManagerProps) {
    super(props)

    invariant(
      !!google.maps.drawing,
      `Did you include prop libraries={['drawing']} in the URL? %s`,
      google.maps.drawing
    )
  }

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  setDrawingManagerCallback = () => {
    if (this.state.drawingManager !== null && this.props.onLoad) {
      this.props.onLoad(this.state.drawingManager)
    }
  }

  componentDidMount() {
    const drawingManager = new google.maps.drawing.DrawingManager({
      ...(this.props.options || {}),
      map: this.context
    })

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: drawingManager
    })

    function setDrawingManager() {
      return {
        drawingManager
      }
    }

    this.setState(
      setDrawingManager,
      this.setDrawingManagerCallback
    )
  }

  componentDidUpdate(prevProps: DrawingManagerProps) {
    if (this.state.drawingManager !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.drawingManager
      })
    }
  }

  componentWillUnmount() {
    if (this.state.drawingManager !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.drawingManager)
      }

      unregisterEvents(this.registeredEvents)

      this.state.drawingManager.setMap(null)
    }
  }

  render() {
    return <></>
  }
}

export default DrawingManager
