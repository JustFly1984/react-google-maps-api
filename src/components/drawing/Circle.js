/* global google */
import React, { PureComponent } from 'react'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/helper'

import MapContext from '../../map-context'

import { CirclePropTypes } from '../../proptypes'

const eventMap = {
  onCenterChanged: 'center_changed',
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
  onRadiusChanged: 'radius_changed',
  onRightClick: 'rightclick'
}

const updaterMap = {
  center (instance, center) {
    instance.setCenter(center)
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
  radius (instance, radius) {
    instance.setRadius(radius)
  },
  visible (instance, visible) {
    instance.setVisible(visible)
  }
}

export class Circle extends PureComponent {
  static propTypes = CirclePropTypes

  static contextType = MapContext

  constructor (props, context) {
    super(props, context)

    this.state = {
      circle: new google.maps.Circle(
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
    this.state.circle.setMap(this.context)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: this.state.circle
    })
  }

  componentDidUpdate (prevProps) {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.circle
    })
  }

  componentWillUnmount () {
    unregisterEvents(this.registeredEvents)

    if (this.state.circle) {
      this.state.circle.setMap(null)
    }
  }

  render () {
    return <></>
  }

  getBounds () {
    return this.state.circle.getBounds()
  }

  getCenter () {
    return this.state.circle.getCenter()
  }

  getDraggable () {
    return this.state.circle.getDraggable()
  }

  getEditable () {
    return this.state.circle.getEditable()
  }

  getMap () {
    return this.state.circle.getMap()
  }

  getRadius () {
    return this.state.circle.getRadius()
  }

  getVisible () {
    return this.state.circle.getVisible()
  }
}

export default Circle
