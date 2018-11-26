/* global google */
import { PureComponent, Children } from 'react'
import {
  // eslint-disable-next-line camelcase
  unstable_renderSubtreeIntoContainer,
  unmountComponentAtNode
} from 'react-dom'
import PropTypes from 'prop-types'
import invariant from 'invariant'

import {
  componentDidMount,
  componentDidUpdate,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { getOffsetOverride, getLayoutStyles } from '../../utils/OverlayViewHelper'

import { MAP, ANCHOR, OVERLAY_VIEW } from '../../constants'

import { OverlayViewPropTypes } from '../../proptypes'

const eventMap = {}

const updaterMap = {
  map (instance, map) {
    instance.setMap(map)
  }
}

export class OverlayView extends PureComponent {
  static FLOAT_PANE = `floatPane`
  static MAP_PANE = `mapPane`
  static MARKER_LAYER = `markerLayer`
  static OVERLAY_LAYER = `overlayLayer`
  static OVERLAY_MOUSE_TARGET = `overlayMouseTarget`

  static propTypes = OverlayViewPropTypes

  static contextTypes = {
    [MAP]: PropTypes.object,
    [ANCHOR]: PropTypes.object,
  }

  constructor (props, context) {
    super(props, context)

    const overlayView = new google.maps.OverlayView()

    this.onAdd = this.onAdd.bind(this)
    this.draw = this.draw.bind(this)
    this.onRemove = this.onRemove.bind(this)
    this.onPositionElement = this.onPositionElement.bind(this)
    this.getPanes = this.getPanes.bind(this)
    this.getProjection = this.getProjection.bind(this)

    overlayView.onAdd = this.onAdd
    overlayView.draw = this.draw
    overlayView.onRemove = this.onRemove

    overlayView.setMap(context[MAP])

    this.state = {
      [OVERLAY_VIEW]: overlayView,
    }
  }

  componentDidMount () {
    componentDidMount(this, this.state[OVERLAY_VIEW], eventMap)
  }

  componentDidUpdate (prevProps) {
    componentDidUpdate(this, this.state[OVERLAY_VIEW], eventMap, updaterMap, prevProps)

    setTimeout(this.state[OVERLAY_VIEW].draw, 0)
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const overlayView = this.state[OVERLAY_VIEW]

    if (overlayView) {
      overlayView.setMap(null)
      overlayView.onAdd = null
      overlayView.draw = null
      overlayView.onRemove = null
    }
  }

  render () {
    return false
  }

  preventMapHitsAndGesturesFrom (element) {
    return this.state[OVERLAY_VIEW].preventMapHitsAndGesturesFrom(element)
  }

  preventMapHitsFrom (element) {
    return this.state[OVERLAY_VIEW].preventMapHitsFrom(element)
  }

  draw () {
    const { mapPaneName } = this.props

    invariant(
      !!mapPaneName,
      `OverlayView requires either props.mapPaneName or props.defaultMapPaneName but got %s`,
      mapPaneName
    )

    const mapPanes = this.state[OVERLAY_VIEW].getPanes()

    mapPanes[mapPaneName].appendChild(this.containerElement)

    unstable_renderSubtreeIntoContainer(
      this,
      Children.only(this.props.children),
      this.containerElement,
      this.onPositionElement
    )

    this.state[OVERLAY_VIEW].draw()
  }

  getMap () {
    return this.state[OVERLAY_VIEW].getMap()
  }

  getPanes () {
    return this.state[OVERLAY_VIEW].getPanes()
  }

  getProjection () {
    return this.state[OVERLAY_VIEW].getProjection()
  }

  onAdd () {
    this.containerElement = document.createElement(`div`)

    this.containerElement.style.position = `absolute`

    this.state[OVERLAY_VIEW].onAdd()
  }

  onPositionElement () {
    const mapCanvasProjection = this.state[OVERLAY_VIEW].getProjection()

    const offset = {
      x: 0,
      y: 0,
      ...getOffsetOverride(this.containerElement, this.props),
    }

    const layoutStyles = getLayoutStyles(mapCanvasProjection, offset, this.props)

    Object.assign(this.containerElement.style, layoutStyles)
  }

  onRemove () {
    this.containerElement.parentNode.removeChild(this.containerElement)

    unmountComponentAtNode(this.containerElement)

    this.containerElement = null

    this.state[OVERLAY_VIEW].onRemove()
  }
}

export default OverlayView
