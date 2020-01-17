import * as React from 'react'
import * as ReactDOM from 'react-dom'

import invariant from 'invariant'

import MapContext from '../../map-context'

import { getOffsetOverride, getLayoutStyles } from './dom-helper'

import ContentMountHandler from './CountMountHandler'

interface OverlayViewState {
  overlayView: google.maps.OverlayView | null
}

export interface OverlayViewProps {
  // required
  mapPaneName: string
  getPixelPositionOffset?: (offsetWidth: number, offsetHeight: number) => { x: number; y: number }
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral
  position?: google.maps.LatLng | google.maps.LatLngLiteral
  onLoad?: (overlayView: google.maps.OverlayView) => void
  onUnmount?: (overlayView: google.maps.OverlayView) => void
}

export class OverlayView extends React.PureComponent<OverlayViewProps, OverlayViewState> {
  static FLOAT_PANE = `floatPane`
  static MAP_PANE = `mapPane`
  static MARKER_LAYER = `markerLayer`
  static OVERLAY_LAYER = `overlayLayer`
  static OVERLAY_MOUSE_TARGET = `overlayMouseTarget`

  static contextType = MapContext

  state: OverlayViewState = {
    overlayView: null,
  }

  containerElement: HTMLElement | null = null

  setOverlayViewCallback = (): void => {
    if (this.state.overlayView !== null && this.props.onLoad) {
      this.props.onLoad(this.state.overlayView)
    }

    this.onPositionElement()
  }

  onAdd = (): void => {
    this.containerElement = document.createElement('div')

    this.containerElement.style.position = 'absolute'
  }

  onPositionElement = (): void => {
    if (this.state.overlayView !== null && this.containerElement !== null) {
      const mapCanvasProjection = this.state.overlayView.getProjection()

      const offset = {
        x: 0,
        y: 0,
        ...getOffsetOverride(this.containerElement, this.props.getPixelPositionOffset),
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

  draw = (): void => {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  onRemove = (): void => {
    if (this.containerElement !== null && this.containerElement.parentNode) {
      this.containerElement.parentNode.removeChild(this.containerElement)

      delete this.containerElement
    }
  }

  componentDidMount(): void {
    const overlayView = new google.maps.OverlayView()

    // You must implement three methods: onAdd(), draw(), and onRemove().
    overlayView.onAdd = this.onAdd
    overlayView.draw = this.draw
    overlayView.onRemove = this.onRemove

    overlayView.setMap(this.context)

    // You must call setMap() with a valid Map object to trigger the call to
    // the onAdd() method and setMap(null) in order to trigger the onRemove() method.

    this.setState(function setOverlayView() {
      return {
        overlayView,
      }
    })
  }

  componentDidUpdate(prevProps: OverlayViewProps): void {
    if (prevProps.position !== this.props.position || prevProps.bounds !== this.props.bounds) {
      setTimeout(() => {
        this.state.overlayView !== null && this.state.overlayView.draw()
      }, 0)
    }
  }

  componentWillUnmount(): void {
    if (this.state.overlayView !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.overlayView)
      }

      this.state.overlayView.setMap(null)
    }
  }

  render(): React.ReactPortal | React.ReactNode {
    return this.containerElement !== null ? (
      ReactDOM.createPortal(
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
