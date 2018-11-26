/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  construct,
  componentDidMount,
  componentDidUpdate,
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

    construct(
      PolylinePropTypes,
      updaterMap,
      this.props,
      polyline
    )

    polyline.setMap(this.context[MAP])

    this.state = {
      [POLYLINE]: polyline,
    }

    this.getDraggable = this.getDraggable.bind(this)
    this.getEditable = this.getEditable.bind(this)
    this.getMap = this.getMap.bind(this)
    this.getPath = this.getPath.bind(this)
    this.getVisible = this.getVisible.bind(this)
  }

  componentDidMount () {
    componentDidMount(this, this.state[POLYLINE], eventMap)
  }

  componentDidUpdate (prevProps) {
    componentDidUpdate(this, this.state[POLYLINE], eventMap, updaterMap, prevProps)
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const polyline = this.state[POLYLINE]

    if (polyline) {
      polyline.setMap(null)
    }
  }

  render () {
    return false
  }

  getDraggable () {
    return this.state[POLYLINE].getDraggable()
  }

  getEditable () {
    return this.state[POLYLINE].getEditable()
  }

  getPath () {
    return this.state[POLYLINE].getPath()
  }

  getVisible () {
    return this.state[POLYLINE].getVisible()
  }

  getMap () {
    return this.state[POLYLINE].getMap()
  }
}

export default Polyline
