/* global google */
import React, { Fragment, PureComponent } from 'react'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/helper'

import MapContext from '../../map-context'

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
  onZindexChanged: 'zindex_changed'
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
  }
}

export class Marker extends PureComponent {
  static propTypes = MarkerPropTypes

  static contextType = MapContext

  registerEvents = []

  state = {
    marker: null
  }

  componentDidMount = () => {
    const marker = new google.maps.Marker(
      Object.assign(
        {
          map: this.context
        },
        this.props.options
      )
    )

    this.setState(
      () => ({
        marker
      }),
      () => {
        this.state.marker.setMap(this.context)

        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap,
          eventMap,
          prevProps: {},
          nextProps: this.props,
          instance: this.state.marker
        })
      }
    )
  }

  componentDidUpdate = prevProps => {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.marker
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)

    this.state.marker &&
      this.state.marker.setMap(null)
  }

  render = () => (
    <Fragment>
      {this.props.children}
    </Fragment>
  )

  getAnimation = () => this.state.marker.getAnimation()

  getClickable = () => this.state.marker.getClickable()

  getCursor = () => this.state.marker.getCursor()

  getDraggable = () => this.state.marker.getDraggable()

  getIcon = () => this.state.marker.getIcon()

  getLabel = () => this.state.marker.getLabel()

  getMap = () => this.state.marker.getMap()

  getOpacity = () => this.state.marker.getOpacity()

  getPosition = () => this.state.marker.getPosition()

  getShape = () => this.state.marker.getShape()

  getTitle = () => this.state.marker.getTitle()

  getVisible = () => this.state.marker.getVisible()

  getZIndex = () => this.state.marker.getZIndex()
}

export default Marker
