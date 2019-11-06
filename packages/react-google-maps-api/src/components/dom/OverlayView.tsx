import * as React from "react"
// @ts-ignore
import { createPortal } from "react-dom"

import invariant from "invariant"

import MapContext from "../../map-context"

import { getOffsetOverride, getLayoutStyles } from "./dom-helper"

interface OverlayViewState {
  overlayView: google.maps.OverlayView | null;
}

export interface OverlayViewProps {
  // required
  mapPaneName: string;
  getPixelPositionOffset?: (
    offsetWidth: number,
    offsetHeight: number
  ) => { x: number; y: number };
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
  position?: google.maps.LatLng | google.maps.LatLngLiteral;
  onLoad?: (overlayView: google.maps.OverlayView) => void;
  onUnmount?: (overlayView: google.maps.OverlayView) => void;
}

interface ContentMountHandlerProps {
  onLoad?: () => void;
}

class ContentMountHandler extends React.Component<ContentMountHandlerProps> {
  componentDidMount() {
    if (this.props.onLoad) this.props.onLoad();
  }

  render() {
    return this.props.children;
  }
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

  state: OverlayViewState = {
    overlayView: null
  }

  containerElement: HTMLElement | null = null

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  setOverlayViewCallback = () => {
    if (this.state.overlayView !== null && this.props.onLoad) {
      this.props.onLoad(this.state.overlayView)
    }

    this.onPositionElement();
  }

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  onAdd = () => {
    this.containerElement = document.createElement("div")

    this.containerElement.style.position = "absolute"
  }

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  onPositionElement = () => {
    if (this.state.overlayView !== null && this.containerElement !== null) {
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
  }

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
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

    if (this.containerElement) {
      mapPanes[this.props.mapPaneName].appendChild(this.containerElement)
    }

    this.onPositionElement()

    this.forceUpdate()
  }

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  onRemove = () => {
    if (this.containerElement !== null && this.containerElement.parentNode) {
      this.containerElement.parentNode.removeChild(this.containerElement)

      delete this.containerElement
    }
  }

  componentDidMount() {
    const overlayView = new google.maps.OverlayView()

    // You must implement three methods: onAdd(), draw(), and onRemove().
    overlayView.onAdd = this.onAdd
    overlayView.draw = this.draw
    overlayView.onRemove = this.onRemove

    overlayView.setMap(this.context)

    // You must call setMap() with a valid Map object to trigger the call to
    // the onAdd() method and setMap(null) in order to trigger the onRemove() method.

    function setOverlayView() {
      return {
        overlayView
      }
    }

    this.setState(setOverlayView)
  }

  componentDidUpdate(prevProps: OverlayViewProps) {
    if (
      prevProps.position !== this.props.position ||
      prevProps.bounds !== this.props.bounds
    ) {
      setTimeout(() => {
        this.state.overlayView !== null && this.state.overlayView.draw()
      }, 0)
    }
  }

  componentWillUnmount() {
    if (this.state.overlayView !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.overlayView)
      }

      this.state.overlayView.setMap(null)
    }
  }

  render() {
    return this.containerElement !== null ? (
      createPortal(
        <ContentMountHandler onLoad={this.setOverlayViewCallback}>
          {React.Children.only(this.props.children)}
        </ContentMountHandler>,
        this.containerElement
      )
    ) : (
      <></>
    )
  }
}

export default OverlayView
