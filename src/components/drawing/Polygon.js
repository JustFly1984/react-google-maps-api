/* global google */
import React, { PureComponent } from 'react'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/helper'

import MapContext from '../../map-context'

import { PolygonPropTypes } from '../../proptypes'

const eventMap = {
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
  onRightClick: 'rightclick'
}

const updaterMap = {
  draggable (instance, draggable) {
    instance.setDraggable(draggable)
  },

  editable (instance, editable) {
    instance.setEditable(editable)
  },

  options (instance, options) {
    instance.setOptions(options)
  },

  map (instance, map) {
    instance.setMap(map)
  },

  path (instance, path) {
    instance.setPath(path)
  },

  paths (instance, paths) {
    instance.setPaths(paths)
  },

  visible (instance, visible) {
    instance.setVisible(visible)
  },
}

export class Polygon extends PureComponent {
  static propTypes = PolygonPropTypes

  static contextType = MapContext

  constructor (props, context) {
    super(props, context)

    this.state = {
      polygon: new google.maps.Polygon(
        Object.assign(
          {
            map: context
          },
          props.options
        )
      )
    }

    this.registeredEvents = []
  }

  componentDidMount () {
    this.state.polygon.setMap(this.context)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: this.state.polygon
    })
  }

  componentDidUpdate (prevProps) {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.polygon
    })
  }

  componentWillUnmount () {
    unregisterEvents(this.registeredEvents)

    if (this.state.polygon) {
      this.state.polygon.setMap(null)
    }
  }

  render () {
    return <></>
  }

  getDraggable () {
    return this.state.polygon.getDraggable()
  }

  getEditable () {
    return this.state.polygon.getEditable()
  }

  getMap () {
    return this.state.polygon.getEditable()
  }

  getPath () {
    return this.state.polygon.getMap()
  }

  getPaths () {
    return this.state.polygon.getPaths()
  }

  getVisible () {
    return this.state.polygon.getVisible()
  }
}

export default Polygon
