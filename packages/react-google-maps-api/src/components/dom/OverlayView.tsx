import * as React from 'react'
import * as ReactDOM from 'react-dom'

import invariant from 'invariant'

import MapContext from '../../map-context'

import { getOffsetOverride, getLayoutStyles } from './dom-helper'

import ContentMountHandler from './CountMountHandler'

interface OverlayViewState {
  overlayView: google.maps.OverlayView | null
  containerStyle: React.CSSProperties
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
    containerStyle: {},
  }

  mapPaneEl: Element | null = null

  containerRef: React.RefObject<HTMLDivElement>

  setOverlayViewCallback = (): void => {
    if (this.state.overlayView !== null && this.props.onLoad) {
      this.props.onLoad(this.state.overlayView)
    }

    this.onPositionElement()
  }

  onAdd = (): void => {
    invariant(
      !!this.props.mapPaneName,
      `OverlayView requires props.mapPaneName but got %s`,
      this.props.mapPaneName
    )

    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapPanes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapPanes: any = this.state.overlayView?.getPanes()

    if (!mapPanes) {
      return
    }

    this.mapPaneEl = mapPanes[this.props.mapPaneName]
  }

  onPositionElement = (): void => {
    if (this.state.overlayView !== null) {
      const mapCanvasProjection = this.state.overlayView.getProjection()

      const offset = {
        x: 0,
        y: 0,
        ...(this.containerRef.current
          ? getOffsetOverride(this.containerRef.current, this.props.getPixelPositionOffset)
          : {}),
      }

      const layoutStyles = getLayoutStyles(
        mapCanvasProjection,
        offset,
        this.props.bounds,
        this.props.position
      )

      this.setState({
        containerStyle: layoutStyles,
      })
    }
  }

  draw = (): void => {
    this.onPositionElement()
  }

  onRemove = (): void => {
    this.mapPaneEl = null
  }

  constructor(props: OverlayViewProps) {
    super(props)

    this.containerRef = React.createRef()
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
    return this.mapPaneEl ? (
      ReactDOM.createPortal(
        <div ref={this.containerRef} style={{ ...this.state.containerStyle, position: 'absolute' }}>
          <ContentMountHandler onLoad={this.setOverlayViewCallback}>
            {React.Children.only(this.props.children)}
          </ContentMountHandler>
        </div>,
        this.mapPaneEl,
      )
    ) : (
      <></>
    )
  }
}

export default OverlayView
