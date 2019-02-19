import { PureComponent, Children } from "react"
import { createPortal } from "react-dom"
//@ts-ignore
import invariant from "invariant" // Do wee really need this dependency?

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "../../utils/helper"

import MapContext from "../../map-context"

import { getOffsetOverride, getLayoutStyles } from "./dom-helper"

const eventMap = {}

const updaterMap = {}

interface OverlayViewState {
  overlayView?: google.maps.OverlayView
}

interface OverlayViewProps {
  mapPaneName: string
  getPixelPositionOffset?: (
    offsetWidth: number,
    offsetHeight: number
  ) => { x: number; y: number }
  bounds?: google.maps.LatLngBounds
  position?: google.maps.LatLng
}

export class OverlayView extends PureComponent<
  OverlayViewProps,
  OverlayViewState
> {
  static FLOAT_PANE = `floatPane`
  static MAP_PANE = `mapPane`
  static MARKER_LAYER = `markerLayer`
  static OVERLAY_LAYER = `overlayLayer`
  static OVERLAY_MOUSE_TARGET = `overlayMouseTarget`

  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: OverlayViewState = {
    overlayView: null
  }

  containerElement: HTMLElement

  componentDidMount = () => {
    const overlayView = new google.maps.OverlayView()

    // You must implement three methods: onAdd(), draw(), and onRemove().
    overlayView.onAdd = this.onAdd
    overlayView.draw = this.draw
    overlayView.onRemove = this.onRemove

    overlayView.setMap(this.context)

    // You must call setMap() with a valid Map object to trigger the call to
    // the onAdd() method and setMap(null) in order to trigger the onRemove() method.

    this.setState(
      () => ({
        overlayView
      }),
      () => {
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap,
          eventMap,
          prevProps: {},
          nextProps: this.props,
          instance: this.state.overlayView
        })
      }
    )
  }

  componentDidUpdate = (prevProps: OverlayViewProps) => {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.overlayView
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)

    this.state.overlayView && this.state.overlayView.setMap(null)
  }

  render = () =>
    this.containerElement
      ? createPortal(Children.only(this.props.children), this.containerElement)
      : null

  preventMapHitsAndGesturesFrom = (element: HTMLElement) =>
    //@ts-ignore
    this.state.overlayView.preventMapHitsAndGesturesFrom(element)

  //@ts-ignore
  preventMapHitsFrom = (element: HTMLElement) =>
    this.state.overlayView.preventMapHitsFrom(element)

  draw = () => {
    const { mapPaneName } = this.props
    invariant(
      !!mapPaneName,
      `OverlayView requires props.mapPaneName but got %s`,
      mapPaneName
    )
    const overlayView = this.state.overlayView

    if (!overlayView) {
      return
    }

    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapPanes
    const mapPanes = overlayView.getPanes()

    if (!mapPanes) {
      return
    }

    mapPanes[mapPaneName].appendChild(this.containerElement)

    this.onPositionElement()

    this.forceUpdate()
  }

  getMap = () => this.state.overlayView.getMap()

  getPanes = () => this.state.overlayView.getPanes()

  getProjection = () => this.state.overlayView.getProjection()

  onAdd = () => {
    this.containerElement = document.createElement("div")

    this.containerElement.style.position = "absolute"
  }

  onPositionElement = () => {
    const mapCanvasProjection = this.state.overlayView.getProjection()

    const offset = {
      x: 0,
      y: 0,
      ...getOffsetOverride(
        this.containerElement,
        this.props.getPixelPositionOffset
      )
    }

    const layoutStyles = getLayoutStyles(
      mapCanvasProjection,
      offset,
      this.props.bounds,
      this.props.position
    )

    Object.assign(this.containerElement.style, layoutStyles)
  }

  onRemove = () => {
    if (this.containerElement) {
      this.containerElement.parentNode.removeChild(this.containerElement)
    }

    this.containerElement = null
  }
}

export default OverlayView
