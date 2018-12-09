/* global google */
import { PureComponent } from 'react'

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

  registerEvents = []

  state = {
    rectangle: null
  }

  componentDidMount = () => {
    const rectangle = new google.maps.Rectangle(
      Object.assign(
        {
          map: this.context
        },
        this.props.options
      )
    )

    this.setState(
      () => ({
        rectangle
      }),
      () => {
        this.state.rectangle.setMap(this.context)

        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap,
          eventMap,
          prevProps: {},
          nextProps: this.props,
          instance: this.state.rectangle
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
      instance: this.state.rectangle
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)

    this.state.rectangle && this.state.rectangle.setMap(null)
  }

  render = () => null

  getBounds = () =>
    this.state.rectangle.getBounds()

  getDraggable = () =>
    this.state.rectangle.getDraggable()

  getEditable = () =>
    this.state.rectangle.getEditable()

  getMap = () =>
    this.state.rectangle.getMap()

  getVisible = () =>
    this.state.rectangle.getVisible()
}

export default Rectangle
