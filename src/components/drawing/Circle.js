/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  construct,
  componentDidMount,
  componentDidUpdate,
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

    construct(
      CirclePropTypes,
      updaterMap,
      props,
      circle
    )

    circle.setMap(context[MAP])

    this.state = {
      [CIRCLE]: circle,
    }

    this.getBounds = this.getBounds.bind(this)
    this.getCenter = this.getCenter.bind(this)
    this.getDraggable = this.getDraggable.bind(this)
    this.getEditable = this.getEditable.bind(this)
    this.getMap = this.getMap.bind(this)
    this.getRadius = this.getRadius.bind(this)
    this.getVisible = this.getVisible.bind(this)
  }

  componentDidMount () {
    componentDidMount(this, this.state[CIRCLE], eventMap)
  }

  componentDidUpdate (prevProps) {
    componentDidUpdate(this, this.state[CIRCLE], eventMap, updaterMap, prevProps)
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const circle = this.state[CIRCLE]

    if (circle) {
      circle.setMap(null)
    }
  }

  render () {
    return false
  }

  getBounds () {
    return this.state[CIRCLE].getBounds()
  }

  getCenter () {
    return this.state[CIRCLE].getCenter()
  }

  getDraggable () {
    return this.state[CIRCLE].getDraggable()
  }

  getEditable () {
    return this.state[CIRCLE].getEditable()
  }

  getMap () {
    return this.state[CIRCLE].getMap()
  }

  getRadius () {
    return this.state[CIRCLE].getRadius()
  }

  getVisible () {
    return this.state[CIRCLE].getVisible()
  }
}

export default Circle
