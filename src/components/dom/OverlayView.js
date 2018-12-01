/* global google */
import { PureComponent, Children } from 'react'
import { createPortal } from 'react-dom'
import invariant from 'invariant'

import { unregisterEvents, applyUpdatersToPropsAndRegisterEvents } from '../../utils/MapChildHelper'
import MapContext from '../../mapcontext'

import { getOffsetOverride, getLayoutStyles } from '../../utils/OverlayViewHelper'

import { OverlayViewPropTypes } from '../../proptypes'

const eventMap = {}

const updaterMap = {}

export class OverlayView extends PureComponent {
  static FLOAT_PANE = `floatPane`
  static MAP_PANE = `mapPane`
  static MARKER_LAYER = `markerLayer`
  static OVERLAY_LAYER = `overlayLayer`
  static OVERLAY_MOUSE_TARGET = `overlayMouseTarget`

  static propTypes = OverlayViewPropTypes

  static contextType = MapContext

  state = {
    overlayView: null
  }

  componentDidMount = () => {
    const overlayView = new google.maps.OverlayView()
    // You must implement three methods: onAdd(), draw(), and onRemove().
    overlayView.onAdd = this.onAdd
    overlayView.draw = this.draw
    overlayView.onRemove = this.onRemove

    overlayView.setMap(this.context)

    // You must call setMap() with a valid Map object to trigger the call to
    // the onAdd() method and setMap(null) in order to trigger the onRemove() method.

    this.setState({ overlayView }, () => {
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps: {},
        nextProps: this.props,
        instance: this.state.overlayView
      })
    })
  }

  componentDidUpdate (prevProps) {
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

  render () {
    if (this.containerElement) {
      return createPortal(Children.only(this.props.children), this.containerElement)
    }

    return null
  }

  preventMapHitsAndGesturesFrom = element =>
    this.state.overlayView.preventMapHitsAndGesturesFrom(element)

  preventMapHitsFrom = element => this.state.overlayView.preventMapHitsFrom(element)

  draw = () => {
    const { mapPaneName } = this.props
    invariant(
      !!mapPaneName,
      `OverlayView requires either props.mapPaneName or props.defaultMapPaneName but got %s`,
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
    this.containerElement = document.createElement('div')
    this.containerElement.style.position = 'absolute'
  }

  onPositionElement = () => {
    const mapCanvasProjection = this.state.overlayView.getProjection()

    const offset = {
      x: 0,
      y: 0,
      ...getOffsetOverride(this.containerElement, this.props)
    }

    const layoutStyles = getLayoutStyles(mapCanvasProjection, offset, this.props)

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
