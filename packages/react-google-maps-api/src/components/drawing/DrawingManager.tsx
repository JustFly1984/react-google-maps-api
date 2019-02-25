import { PureComponent } from "react"
// @ts-ignore
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
  ondrawingManagerComplete: "drawingManagercomplete",
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
  drawingManager?: google.maps.drawing.DrawingManager
}

interface DrawingManagerProps {
  options?: google.maps.drawing.DrawingManagerOptions
  drawingMode?: google.maps.drawing.OverlayType | null
  onCircleComplete?: (circle: google.maps.Circle) => void
  onMarkerComplete?: (marker: google.maps.Marker) => void
  onOverlayComplete?: (e: google.maps.drawing.OverlayCompleteEvent) => void
  onPolygonComplete?: (polygon: google.maps.Polygon) => void
  onPolylineComplete?: (polyline: google.maps.Polyline) => void
  onRectangleComplete?: (rectangle: google.maps.Rectangle) => void
}

export class DrawingManager extends PureComponent<
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
      google.maps.drawing,
      'Did you include "libraries=drawing" in the URL?'
    )
  }

  componentDidMount = () => {
    const drawingManager = new google.maps.drawing.DrawingManager({
      ...this.props.options,
      map: this.context
    })

    this.setState(
      () => ({
        drawingManager
      }),
      () => {
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap,
          eventMap,
          prevProps: {},
          nextProps: this.props,
          instance: this.state.drawingManager
        })
      }
    )
  }

  componentDidUpdate = (prevProps: DrawingManagerProps) => {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.drawingManager
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)

    this.state.drawingManager && this.state.drawingManager.setMap(null)
  }

  render = () => null

  getDrawingMode = () => this.state.drawingManager.getDrawingMode()

  getMap = () => this.state.drawingManager.getMap()
}

export default DrawingManager
