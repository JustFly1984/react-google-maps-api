/* global google */
import { PureComponent, Children } from 'react'
import PropTypes from 'prop-types'
import makeMarkerWithLabel from 'markerwithlabel'
import { createPortal } from 'react-dom'

import {
  construct,
  getDerivedStateFromProps,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { MAP, MARKER_CLUSTERER, MARKER_WITH_LABEL } from '../../constants'
import { MarkerWithLabelPropTypes } from '../../proptypes'

const eventMap = {
  onDblClick: 'dblclick',
  onDragEnd: 'dragend',
  onDragStart: 'dragstart',
  onMouseDown: 'mousedown',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onRightClick: 'rightclick',
  onAnimationChanged: 'animation_changed',
  onClick: 'click',
  onClickableChanged: 'clickable_changed',
  onCursorChanged: 'cursor_changed',
  onDrag: 'drag',
  onDraggableChanged: 'draggable_changed',
  onFlatChanged: 'flat_changed',
  onIconChanged: 'icon_changed',
  onPositionChanged: 'position_changed',
  onShapeChanged: 'shape_changed',
  onTitleChanged: 'title_changed',
  onVisibleChanged: 'visible_changed',
  onZindexChanged: 'zindex_changed',
}

const updaterMap = {
  labelAnchor (instance, labelAnchor) {
    instance.set(`labelAnchor`, labelAnchor)
  },
  labelClass (instance, labelClass) {
    instance.set(`labelClass`, labelClass)
  },
  labelStyle (instance, labelStyle) {
    instance.set(`labelStyle`, labelStyle)
  },
  labelVisible (instance, labelVisible) {
    instance.set(`labelVisible`, labelVisible)
  },
  animation (instance, animation) {
    instance.setAnimation(animation)
  },
  clickable (instance, clickable) {
    instance.setClickable(clickable)
  },
  cursor (instance, cursor) {
    instance.setCursor(cursor)
  },
  draggable (instance, draggable) {
    instance.setDraggable(draggable)
  },
  icon (instance, icon) {
    instance.setIcon(icon)
  },
  label (instance, label) {
    instance.setLabel(label)
  },
  opacity (instance, opacity) {
    instance.setOpacity(opacity)
  },
  options (instance, options) {
    instance.setOptions(options)
  },
  place (instance, place) {
    instance.setPlace(place)
  },
  position (instance, position) {
    instance.setPosition(position)
  },
  shape (instance, shape) {
    instance.setShape(shape)
  },
  title (instance, title) {
    instance.setTitle(title)
  },
  visible (instance, visible) {
    instance.setVisible(visible)
  },
  zIndex (instance, zIndex) {
    instance.setZIndex(zIndex)
  },
}

export class MarkerWithLabel extends PureComponent {
  static propTypes = MarkerWithLabelPropTypes

  static defaultProps = {
    labelVisible: true,
  }

  static contextTypes = {
    [MAP]: PropTypes.object,
    [MARKER_CLUSTERER]: PropTypes.object,
  }

  constructor (props, context) {
    super(props, context)

    const NativeMarkerWithLabel = makeMarkerWithLabel(google.maps)

    const markerWithLabel = new NativeMarkerWithLabel()

    this.state = {
      [MARKER_WITH_LABEL]: markerWithLabel,
      prevProps: construct(
        MarkerWithLabelPropTypes,
        updaterMap,
        props,
        markerWithLabel
      )
    }

    const markerClusterer = this.context[MARKER_CLUSTERER]

    if (markerClusterer) {
      markerClusterer.addMarker(markerWithLabel, !!props.noRedraw)
    } else {
      markerWithLabel.setMap(this.context[MAP])
    }

    this.containerElement = document.createElement('div')
    this.state[MARKER_WITH_LABEL].set('labelContent', this.containerElement)
  }

  static getDerivedStateFromProps (props, state) {
    return getDerivedStateFromProps(
      props,
      state,
      this.state[MARKER_WITH_LABEL],
      eventMap,
      updaterMap
    )
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const markerWithLabel = this.state[MARKER_WITH_LABEL]

    if (markerWithLabel) {
      const markerClusterer = this.context[MARKER_CLUSTERER]

      if (markerClusterer) {
        markerClusterer.removeMarker(markerWithLabel, !!this.props.noRedraw)
      }

      markerWithLabel.setMap(null)
    }
  }

  render () {
    return createPortal(
      Children.only(this.props.children),
      this.containerElement
    )
  }

  getAnimation = () =>
    this.state[MARKER_WITH_LABEL].getAnimation()

  getClickable = () =>
    this.state[MARKER_WITH_LABEL].getClickable()

  getCursor = () =>
    this.state[MARKER_WITH_LABEL].getCursor()

  getDraggable = () =>
    this.state[MARKER_WITH_LABEL].getDraggable()

  getIcon = () =>
    this.state[MARKER_WITH_LABEL].getIcon()

  getLabel = () =>
    this.state[MARKER_WITH_LABEL].getLabel()

  getOpacity = () =>
    this.state[MARKER_WITH_LABEL].getOpacity()

  getPlace = () =>
    this.state[MARKER_WITH_LABEL].getPlace()

  getPosition = () =>
    this.state[MARKER_WITH_LABEL].getPosition()

  getShape = () =>
    this.state[MARKER_WITH_LABEL].getShape()

  getTitle = () =>
    this.state[MARKER_WITH_LABEL].getTitle()

  getVisible = () =>
    this.state[MARKER_WITH_LABEL].getVisible()

  getZIndex = () =>
    this.state[MARKER_WITH_LABEL].getZIndex()
}

export default MarkerWithLabel
