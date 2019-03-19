import * as React from "react"
// @ts-ignore
import { createPortal } from "react-dom"

import * as invariant from "invariant"

import MapContext from "../../map-context"

import {
  getOffsetOverride,
  getLayoutStyles
} from "./dom-helper"

interface OverlayViewState {
  overlayView: google.maps.OverlayView | null;
}

interface OverlayViewProps {
  mapPaneName: string;
  getPixelPositionOffset?: (
    offsetWidth: number,
    offsetHeight: number
  ) => { x: number; y: number };
  bounds?: google.maps.LatLngBounds;
  position?: google.maps.LatLng;
  onLoad?: (overlayView: google.maps.OverlayView) => void;
}

export class OverlayView extends React.PureComponent<
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

  containerElement: HTMLElement | null = null

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
        if (this.state.overlayView !== null && this.props.onLoad) {
          this.props.onLoad(this.state.overlayView)
        }
      }
    )
  }

  componentWillUnmount = () => {
    this.state.overlayView !== null && this.state.overlayView.setMap(null)
  }

  render = () =>
    this.containerElement !== null
      ? createPortal(React.Children.only(this.props.children), this.containerElement)
      : (<></>)

  preventMapHitsAndGesturesFrom = (element: HTMLElement) =>
    //@ts-ignore
    this.state.overlayView.preventMapHitsAndGesturesFrom(element)

  preventMapHitsFrom = (element: HTMLElement) =>
    //@ts-ignore
    this.state.overlayView.preventMapHitsFrom(element)

  draw = () => {
    invariant(
      !!this.props.mapPaneName,
      `OverlayView requires props.mapPaneName but got %s`,
      this.props.mapPaneName
    )
    const overlayView = this.state.overlayView

    if (overlayView === null) {
      return
    }

    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapPanes
    const mapPanes: any = overlayView.getPanes()

    if (!mapPanes) {
      return
    }

    mapPanes[this.props.mapPaneName].appendChild(this.containerElement)

    this.onPositionElement()

    this.forceUpdate()
  }

  onAdd = () => {
    this.containerElement = document.createElement("div")

    this.containerElement.style.position = "absolute"
  }

  onPositionElement = () => {
    if (
      this.state.overlayView !== null &&
      this.containerElement !== null
    ) {
      const mapCanvasProjection = this.state.overlayView!.getProjection()

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
  }

  onRemove = () => {
    if (
      this.containerElement !== null &&
      this.containerElement.parentNode

    ) {
      this.containerElement.parentNode.removeChild(this.containerElement)

      delete this.containerElement
    }
  }
}

export default OverlayView
