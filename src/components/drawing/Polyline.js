/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  construct,
  getDerivedStateFromProps,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { MAP, POLYLINE } from '../../constants'

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
  },
}

export class Polyline extends PureComponent {
  static propTypes = PolylinePropTypes

  static contextTypes = {
    [MAP]: PropTypes.object,
  }

  constructor (props, context) {
    super(props, context)

    const polyline = new google.maps.Polyline(
      props.options
    )

    this.state = {
      [POLYLINE]: polyline,
      prevProps: construct(
        PolylinePropTypes,
        updaterMap,
        this.props,
        polyline
      )
    }

    polyline.setMap(this.context[MAP])
  }

  static getDerivedStateFromProps (props, state) {
    return getDerivedStateFromProps(
      props,
      state,
      this.state[POLYLINE],
      eventMap,
      updaterMap
    )
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const polyline = this.state[POLYLINE]

    if (polyline) {
      polyline.setMap(null)
    }
  }

  render () {
    return null
  }

  getDraggable = () =>
    this.state[POLYLINE].getDraggable()

  getEditable = () =>
    this.state[POLYLINE].getEditable()

  getPath = () =>
    this.state[POLYLINE].getPath()

  getVisible = () =>
    this.state[POLYLINE].getVisible()

  getMap = () =>
    this.state[POLYLINE].getMap()
}

export default Polyline
