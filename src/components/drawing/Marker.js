/* global google */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  construct,
  getDerivedStateFromProps,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { MarkerPropTypes } from '../../proptypes'

const eventMap = {
  onAnimationChanged: 'animation_changed',
  onClick: 'click',
  onClickableChanged: 'clickable_changed',
  onCursorChanged: 'cursor_changed',
  onDblClick: 'dblclick',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDraggableChanged: 'draggable_changed',
  onDragStart: 'dragstart',
  onFlatChanged: 'flat_changed',
  onIconChanged: 'icon_changed',
  onMouseDown: 'mousedown',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onPositionChanged: 'position_changed',
  onRightClick: 'rightclick',
  onShapeChanged: 'shape_changed',
  onTitleChanged: 'title_changed',
  onVisibleChanged: 'visible_changed',
  onZindexChanged: 'zindex_changed',
}

const updaterMap = {
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
  map (instance, map) {
    instance.setMap(map)
  },
  opacity (instance, opacity) {
    instance.setOpacity(opacity)
  },
  options (instance, options) {
    instance.setOptions(options)
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

export class Marker extends PureComponent {
  static propTypes = MarkerPropTypes

  static contextTypes = {
    [MAP]: PropTypes.object,
    [MARKER_CLUSTERER]: PropTypes.object,
  }

  static childContextTypes = {
    [ANCHOR]: PropTypes.object,
  }

  constructor (props, context) {
    super(props, context)

    const marker = new google.maps.Marker(
      props.options
    )

    this.state = {
      [MARKER]: marker,
      prevProps: construct(
        MarkerPropTypes,
        updaterMap,
        this.props,
        marker
      )
    }

    const markerClusterer = this.context[MARKER_CLUSTERER]

    if (markerClusterer) {
      markerClusterer.addMarker(marker, !!props.noRedraw)
    } else {
      marker.setMap(this.context[MAP])
    }
  }

  getChildContext = () => {
    return {
      [ANCHOR]: this.context[ANCHOR] || this.state[MARKER],
    }
  }

  static getDerivedStateFromProps (props, state) {
    return getDerivedStateFromProps(
      props,
      state,
      this.state[MARKER],
      eventMap,
      updaterMap
    )
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const marker = this.state[MARKER]

    if (marker) {
      const markerClusterer = this.context[MARKER_CLUSTERER]

      if (markerClusterer) {
        markerClusterer.removeMarker(marker, !!this.props.noRedraw)
      }

      marker.setMap(null)
    }
  }

  render () {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }

  getAnimation = () =>
    this.state[MARKER].getAnimation()

  getClickable = () =>
    this.state[MARKER].getClickable()

  getCursor = () =>
    this.state[MARKER].getCursor()

  getDraggable = () =>
    this.state[MARKER].getDraggable()

  getIcon = () =>
    this.state[MARKER].getIcon()

  getLabel = () =>
    this.state[MARKER].getLabel()

  getMap = () =>
    this.state[MARKER].getMap()

  getOpacity = () =>
    this.state[MARKER].getOpacity()

  getPosition = () =>
    this.state[MARKER].getPosition()

  getShape = () =>
    this.state[MARKER].getShape()

  getTitle = () =>
    this.state[MARKER].getTitle()

  getVisible = () =>
    this.state[MARKER].getVisible()

  getZIndex = () =>
    this.state[MARKER].getZIndex()
}

export default Marker
