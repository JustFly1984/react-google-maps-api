/* global google */
import { PureComponent } from 'react'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/helper'

import MapContext from '../../map-context'

import { PolylinePropTypes } from '../../proptypes'

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
  map (instance, map) {
    instance.setMap(map)
  },
  options (instance, options) {
    instance.setOptions(options)
  },
  path (instance, path) {
    instance.setPath(path)
  },
  visible (instance, visible) {
    instance.setVisible(visible)
  }
}

export class Polyline extends PureComponent {
  static propTypes = PolylinePropTypes

  static contextType = MapContext

  constructor (props, context) {
    super(props, context)

    this.state = {
      polyline: new google.maps.Polyline(
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
    this.state.polyline.setMap(this.context)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: this.state.polyline
    })
  }

  componentDidUpdate (prevProps) {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.polyline
    })
  }

  componentWillUnmount () {
    unregisterEvents(this.registeredEvents)

    if (this.state.polyline) {
      this.state.polyline.setMap(null)
    }
  }

  render () {
    return <></>
  }

  getDraggable () {
    return this.state.polyline.getDraggable()
  }

  getEditable () {
    return this.state.polyline.getEditable()
  }

  getPath () {
    return this.state.polyline.getPath()
  }

  getVisible () {
    return this.state.polyline.getVisible()
  }

  getMap () {
    return this.state.polyline.getMap()
  }
}

export default Polyline
