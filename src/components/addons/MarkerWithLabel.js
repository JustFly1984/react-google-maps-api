/* global google */
import { PureComponent, Children } from 'react'
import makeMarkerWithLabel from 'markerwithlabel'
import { createPortal } from 'react-dom'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/helper'

import { MarkerClusterContext } from './MarkerCluster'

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

  static contextType = MarkerClusterContext

  registeredEvents = []

  state = {
    markerWithLabel: null
  }

  componentDidMount = () => {
    const NativeMarkerWithLabel = makeMarkerWithLabel(google.maps)

    const markerWithLabel = new NativeMarkerWithLabel()

    this.setState(
      () => ({
        markerWithLabel
      }),
      () => {
        this.state.markerWithLabel
          .setMap(this.context.map)

        this.context.cluster
          .addMarker(
            this.state.markerWithLabel,
            this.props.noRedraw
          )

        this.containerElement = document.createElement('div')

        this.state.markerWithLabel.set('labelContent', this.containerElement)
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
      instance: this.state.markerWithLabel
    })

    this.state.markerWithLabel.repaint()
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)

    if (this.state.markerWithLabel) {
      if (this.context.cluster) {
        this.context.cluster.removeMarker(
          this.state.markerWithLabel,
          this.props.noRedraw
        )
      }

      this.state.markerWithLabel.setMap(null)
    }
  }

  render = () =>
    createPortal(
      Children.only(this.props.children),
      this.containerElement
    )

  getAnimation = () =>
    this.state.markerWithLabel.getAnimation()

  getClickable = () =>
    this.state.markerWithLabel.getClickable()

  getCursor = () =>
    this.state.markerWithLabel.getCursor()

  getDraggable = () =>
    this.state.markerWithLabel.getDraggable()

  getIcon = () =>
    this.state.markerWithLabel.getIcon()

  getLabel = () =>
    this.state.markerWithLabel.getLabel()

  getOpacity = () =>
    this.state.markerWithLabel.getOpacity()

  getPlace = () =>
    this.state.markerWithLabel.getPlace()

  getPosition = () =>
    this.state.markerWithLabel.getPosition()

  getShape = () =>
    this.state.markerWithLabel.getShape()

  getTitle = () =>
    this.state.markerWithLabel.getTitle()

  getVisible = () =>
    this.state.markerWithLabel.getVisible()

  getZIndex = () =>
    this.state.markerWithLabel.getZIndex()
}

export default MarkerWithLabel
