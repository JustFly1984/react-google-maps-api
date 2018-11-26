/* global google */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  construct,
  componentDidMount,
  componentDidUpdate,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { MAP, MARKER, ANCHOR, MARKER_CLUSTERER } from '../../constants'

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

    construct(
      MarkerPropTypes,
      updaterMap,
      this.props,
      marker
    )

    const markerClusterer = this.context[MARKER_CLUSTERER]

    if (markerClusterer) {
      markerClusterer.addMarker(marker, !!props.noRedraw)
    } else {
      marker.setMap(this.context[MAP])
    }

    this.state = {
      [MARKER]: marker,
    }

    this.getAnimation = this.getAnimation.bind(this)
    this.getClickable = this.getClickable.bind(this)
    this.getCursor = this.getCursor.bind(this)
    this.getDraggable = this.getDraggable.bind(this)
    this.getIcon = this.getIcon.bind(this)
    this.getLabel = this.getLabel.bind(this)
    this.getMap = this.getMap(this)
    this.getOpacity = this.getOpacity.bind(this)
    this.getPosition = this.getPosition.bind(this)
    this.getShape = this.getShape.bind(this)
    this.getTitle = this.getTitle.bind(this)
    this.getVisible = this.getVisible.bind(this)
    this.getZIndex = this.getZIndex.bind(this)
  }

  getChildContext () {
    return {
      [ANCHOR]: this.context[ANCHOR] || this.state[MARKER],
    }
  }

  componentDidMount () {
    componentDidMount(this, this.state[MARKER], eventMap)
  }

  componentDidUpdate (prevProps) {
    componentDidUpdate(this, this.state[MARKER], eventMap, updaterMap, prevProps)
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

  getAnimation () {
    return this.state[MARKER].getAnimation()
  }

  getClickable () {
    return this.state[MARKER].getClickable()
  }

  getCursor () {
    return this.state[MARKER].getCursor()
  }

  getDraggable () {
    return this.state[MARKER].getDraggable()
  }

  getIcon () {
    return this.state[MARKER].getIcon()
  }

  getLabel () {
    return this.state[MARKER].getLabel()
  }

  getMap () {
    return this.state[MARKER].getMap()
  }

  getOpacity () {
    return this.state[MARKER].getOpacity()
  }

  getPosition () {
    return this.state[MARKER].getPosition()
  }

  getShape () {
    return this.state[MARKER].getShape()
  }

  getTitle () {
    return this.state[MARKER].getTitle()
  }

  getVisible () {
    return this.state[MARKER].getVisible()
  }

  getZIndex () {
    return this.state[MARKER].getZIndex()
  }
}

export default Marker
