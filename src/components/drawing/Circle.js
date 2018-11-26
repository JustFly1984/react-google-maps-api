/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  construct,
  getDerivedStateFromProps,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { MAP, CIRCLE } from '../../constants'
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
  onRightClick: 'rightclick',
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
  },
}

export class Circle extends PureComponent {
  static propTypes = CirclePropTypes

  static contextTypes = {
    [MAP]: PropTypes.object,
  }

  constructor (props, context) {
    super(props, context)

    const circle = new google.maps.Circle(
      props.options
    )

    this.state = {
      [CIRCLE]: circle,
      prevProps: construct(
        CirclePropTypes,
        updaterMap,
        props,
        circle
      )
    }

    circle.setMap(context[MAP])
  }

  static getDerivedStateFromProps (props, state) {
    return getDerivedStateFromProps(
      props,
      state,
      this.state[CIRCLE],
      eventMap,
      updaterMap
    )
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const circle = this.state[CIRCLE]

    if (circle) {
      circle.setMap(null)
    }
  }

  render () {
    return null
  }

  getBounds = () =>
    this.state[CIRCLE].getBounds()

  getCenter = () =>
    this.state[CIRCLE].getCenter()

  getDraggable = () => {
    return this.state[CIRCLE].getDraggable()
  }

  getEditable = () =>
    this.state[CIRCLE].getEditable()

  getMap = () =>
    this.state[CIRCLE].getMap()

  getRadius = () =>
    this.state[CIRCLE].getRadius()

  getVisible = () =>
    this.state[CIRCLE].getVisible()
}

export default Circle
