/* global google */
import React, { PureComponent } from 'react'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/helper'
import MapContext from '../../map-context'

import { RectanglePropTypes } from '../../proptypes'

const eventMap = {
  onBoundsChanged: 'bounds_changed',
  onClick: 'click',
  onDblClick: 'dblclick',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDragStart: 'dragstart',
  onMouseDown: 'mousedown',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onRightClick: 'rightclick',
}

const updaterMap = {
  bounds (instance, bounds) {
    instance.setBounds(bounds)
  },
  draggable (instance, draggable) {
    instance.setDraggable(draggable)
  },
  editable (instance, editable) {
    instance.setEditable(editable)
  },
  map (instance, map) {
    instance.setMap(map)
  },
  options (instance, options) {
    instance.setOptions(options)
  },
  visible (instance, visible) {
    instance.setVisible(visible)
  },
}

export class Rectangle extends PureComponent {
  static propTypes = RectanglePropTypes

  static contextType = MapContext

  constructor (props, context) {
    super(props, context)

    this.state = {
      rectangle: new google.maps.Rectangle(
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
    this.state.rectangle.setMap(this.context)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: this.state.rectangle
    })
  }

  componentDidUpdate (prevProps) {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.rectangle
    })
  }

  componentWillUnmount () {
    unregisterEvents(this.registeredEvents)

    if (this.state.rectangle) {
      this.state.rectangle.setMap(null)
    }
  }

  render () {
    return <></>
  }

  getBounds () {
    return this.state.rectangle.getBounds()
  }

  getDraggable () {
    return this.state.rectangle.getDraggable()
  }

  getEditable () {
    return this.state.rectangle.getEditable()
  }

  getMap () {
    return this.state.rectangle.getMap()
  }

  getVisible () {
    return this.state.rectangle.getVisible()
  }
}

export default Rectangle
