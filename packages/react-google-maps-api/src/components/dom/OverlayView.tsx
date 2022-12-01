import {
  memo,
  useMemo,
  Children,
  createRef,
  useEffect,
  useContext,
  PureComponent,
  type ReactNode,
  type RefObject,
  type ReactPortal,
  type CSSProperties,
} from 'react'
import * as ReactDOM from 'react-dom'
import invariant from 'invariant'

import MapContext from '../../map-context'

import {
  getLayoutStyles,
  arePositionsEqual,
  getOffsetOverride,
} from './dom-helper'

import { createOverlay } from './Overlay'

interface OverlayViewState {
  paneEl: Element | null
  containerStyle: CSSProperties
}

function convertToLatLngString(
  latLngLike?: google.maps.LatLng | google.maps.LatLngLiteral | null
) {
  if (!latLngLike) {
    return ''
  }

  const latLng =
    latLngLike instanceof google.maps.LatLng
      ? latLngLike
      : new google.maps.LatLng(latLngLike.lat, latLngLike.lng)

  return latLng + ''
}

function convertToLatLngBoundsString(
  latLngBoundsLike?:
    | google.maps.LatLngBounds
    | google.maps.LatLngBoundsLiteral
    | null
) {
  if (!latLngBoundsLike) {
    return ''
  }

  const latLngBounds =
    latLngBoundsLike instanceof google.maps.LatLngBounds
      ? latLngBoundsLike
      : new google.maps.LatLngBounds(
          new google.maps.LatLng(latLngBoundsLike.south, latLngBoundsLike.east),
          new google.maps.LatLng(latLngBoundsLike.north, latLngBoundsLike.west)
        )

  return latLngBounds + ''
}

export type PaneNames = keyof google.maps.MapPanes
export interface OverlayViewProps {
  children?: ReactNode | undefined
  // required
  mapPaneName: PaneNames
  position?: google.maps.LatLng | google.maps.LatLngLiteral | undefined
  getPixelPositionOffset?:
    | ((offsetWidth: number, offsetHeight: number) => { x: number; y: number })
    | undefined
  bounds?:
    | google.maps.LatLngBounds
    | google.maps.LatLngBoundsLiteral
    | undefined
  zIndex?: number
  onLoad?: ((overlayView: google.maps.OverlayView) => void) | undefined
  onUnmount?: ((overlayView: google.maps.OverlayView) => void) | undefined
}
export const FLOAT_PANE: PaneNames = `floatPane`
export const MAP_PANE: PaneNames = `mapPane`
export const MARKER_LAYER: PaneNames = `markerLayer`
export const OVERLAY_LAYER: PaneNames = `overlayLayer`
export const OVERLAY_MOUSE_TARGET: PaneNames = `overlayMouseTarget`

function OverlayViewFunctional({
  position,
  bounds,
  mapPaneName,
  zIndex,
  onLoad,
  onUnmount,
  getPixelPositionOffset,
  children,
}: OverlayViewProps) {
  const map = useContext(MapContext)
  const container = useMemo(() => {
    const div = document.createElement('div')
    div.style.position = 'absolute'
    return div
  }, [])

  const overlay = useMemo(() => {
    return createOverlay(
      container,
      mapPaneName,
      position,
      bounds,
      getPixelPositionOffset
    )
  }, [container, mapPaneName, position, bounds])

  useEffect(() => {
    onLoad?.(overlay)
    overlay?.setMap(map)
    return () => {
      onUnmount?.(overlay)
      overlay?.setMap(null)
    }
  }, [map, overlay])

  // to move the container to the foreground and background
  useEffect(() => {
    container.style.zIndex = `${zIndex}`
  }, [zIndex, container])

  return ReactDOM.createPortal(children, container)
}

export const OverlayViewF = memo(OverlayViewFunctional)

export class OverlayView extends PureComponent<
  OverlayViewProps,
  OverlayViewState
> {
  static FLOAT_PANE: PaneNames = `floatPane`
  static MAP_PANE: PaneNames = `mapPane`
  static MARKER_LAYER: PaneNames = `markerLayer`
  static OVERLAY_LAYER: PaneNames = `overlayLayer`
  static OVERLAY_MOUSE_TARGET: PaneNames = `overlayMouseTarget`

  static contextType = MapContext

  state: OverlayViewState = {
    paneEl: null,
    containerStyle: {
      // set initial position
      position: 'absolute',
    },
  }

  overlayView: google.maps.OverlayView
  containerRef: RefObject<HTMLDivElement>

  updatePane = (): void => {
    const mapPaneName = this.props.mapPaneName

    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapPanes
    const mapPanes = this.overlayView.getPanes()
    invariant(
      !!mapPaneName,
      `OverlayView requires props.mapPaneName but got %s`,
      mapPaneName
    )

    if (mapPanes) {
      this.setState({
        paneEl: mapPanes[mapPaneName],
      })
    } else {
      this.setState({
        paneEl: null,
      })
    }
  }

  onAdd = (): void => {
    this.updatePane()
    this.props.onLoad?.(this.overlayView)
  }

  onPositionElement = (): void => {
    const mapCanvasProjection = this.overlayView.getProjection()

    const offset = {
      x: 0,
      y: 0,
      ...(this.containerRef.current
        ? getOffsetOverride(
            this.containerRef.current,
            this.props.getPixelPositionOffset
          )
        : {}),
    }

    const layoutStyles = getLayoutStyles(
      mapCanvasProjection,
      offset,
      this.props.bounds,
      this.props.position
    )

    const { left, top, width, height } = this.state.containerStyle
    if (!arePositionsEqual(layoutStyles, { left, top, width, height })) {
      this.setState({
        containerStyle: {
          ...layoutStyles,
          position: 'absolute',
        },
      })
    }
  }

  draw = (): void => {
    this.onPositionElement()
  }

  onRemove = (): void => {
    this.setState(() => ({
      paneEl: null,
    }))
    // this.mapPaneEl = null
    this.props.onUnmount?.(this.overlayView)
  }

  constructor(props: OverlayViewProps) {
    super(props)

    this.containerRef = createRef()
    // You must implement three methods: onAdd(), draw(), and onRemove().
    const overlayView = new google.maps.OverlayView()
    overlayView.onAdd = this.onAdd
    overlayView.draw = this.draw
    overlayView.onRemove = this.onRemove
    this.overlayView = overlayView
  }

  componentDidMount(): void {
    // You must call setMap() with a valid Map object to trigger the call to
    // the onAdd() method and setMap(null) in order to trigger the onRemove() method.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.overlayView.setMap(this.context)
  }

  componentDidUpdate(prevProps: OverlayViewProps): void {
    const prevPositionString = convertToLatLngString(prevProps.position)
    const positionString = convertToLatLngString(this.props.position)
    const prevBoundsString = convertToLatLngBoundsString(prevProps.bounds)
    const boundsString = convertToLatLngBoundsString(this.props.bounds)

    if (
      prevPositionString !== positionString ||
      prevBoundsString !== boundsString
    ) {
      this.overlayView.draw()
    }
    if (prevProps.mapPaneName !== this.props.mapPaneName) {
      this.updatePane()
    }
  }

  componentWillUnmount(): void {
    this.overlayView.setMap(null)
  }

  render(): ReactPortal | ReactNode {
    const paneEl = this.state.paneEl
    if (paneEl) {
      return ReactDOM.createPortal(
        <div ref={this.containerRef} style={this.state.containerStyle}>
          {Children.only(this.props.children)}
        </div>,
        paneEl
      )
    } else {
      return null
    }
  }
}

export default OverlayView
