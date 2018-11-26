/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  construct,
  getDerivedStateFromProps,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { MAP, RECTANGLE } from '../../constants'

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

  static contextTypes = {
    [MAP]: PropTypes.object,
  }

  constructor (props, context) {
    super(props, context)

    const rectangle = new google.maps.Rectangle(
      props.options
    )

    this.state = {
      [RECTANGLE]: rectangle,
      prevProps: construct(
        RectanglePropTypes,
        updaterMap,
        props,
        rectangle
      )
    }

    rectangle.setMap(context[MAP])
  }

  static getDerivedStateFromProps (props, state) {
    return getDerivedStateFromProps(
      props,
      state,
      this.state[RECTANGLE],
      eventMap,
      updaterMap
    )
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const rectangle = this.state[RECTANGLE]

    if (rectangle) {
      rectangle.setMap(null)
    }
  }

  render () {
    return null
  }

  getBounds = () =>
    this.state[RECTANGLE].getBounds()

  getDraggable = () =>
    this.state[RECTANGLE].getDraggable()

  getEditable = () =>
    this.state[RECTANGLE].getEditable()

  getMap = () =>
    this.state[RECTANGLE].getMap()

  getVisible = () =>
    this.state[RECTANGLE].getVisible()
}

export default Rectangle
