/* global google */
import React, { PureComponent } from 'react'

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

  constructor (props, context) {
    super(props, context)

    this.state = {
      marker: new google.maps.Marker(
        Object.assign(
          {
            map: context
          },
          props.options
        )
      )
    }

    this.registerEvents = []
  }

  componentDidMount () {
    this.state.marker.setMap(this.context)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: this.state.marker
    })
  }

  componentDidUpdate (prevProps) {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.marker
    })
  }

  componentWillUnmount () {
    unregisterEvents(this.registeredEvents)

    if (this.state.marker) {
      this.state.marker.setMap(null)
    }
  }

  render () {
    return (
      <>
        {this.props.children}
      </>
    )
  }

  getAnimation () {
    return this.state.marker.getAnimation()
  }

  getClickable () {
    return this.state.marker.getClickable()
  }

  getCursor () {
    return this.state.marker.getCursor()
  }

  getDraggable () {
    return this.state.marker.getDraggable()
  }

  getIcon () {
    return this.state.marker.getIcon()
  }

  getLabel () {
    return this.state.marker.getLabel()
  }

  getMap () {
    return this.state.marker.getMap()
  }

  getOpacity () {
    return this.state.marker.getOpacity()
  }

  getPosition () {
    return this.state.marker.getPosition()
  }

  getShape () {
    return this.state.marker.getShape()
  }

  getTitle () {
    return this.state.marker.getTitle()
  }

  getVisible () {
    return this.state.marker.getVisible()
  }

  getZIndex () {
    return this.state.marker.getZIndex()
  }
}

export default Marker
