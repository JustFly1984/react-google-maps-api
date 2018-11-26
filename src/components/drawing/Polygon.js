/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  construct,
  getDerivedStateFromProps,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { MAP, POLYGON } from '../../constants'

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

  static contextTypes = {
    [MAP]: PropTypes.object,
  }

  constructor (props, context) {
    super(props, context)

    const polygon = new google.maps.Polygon(
      props.options
    )

    this.state = {
      [POLYGON]: polygon,
      prevProps: construct(
        PolygonPropTypes,
        updaterMap,
        props,
        polygon
      )
    }

    polygon.setMap(context[MAP])
  }

  static getDerivedStateFromProps (props, state) {
    return getDerivedStateFromProps(
      props,
      state,
      this.state[POLYGON],
      eventMap,
      updaterMap
    )
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const polygon = this.state[POLYGON]

    if (polygon) {
      polygon.setMap(null)
    }
  }

  render () {
    return null
  }

  getDraggable = () =>
    this.state[POLYGON].getDraggable()

  getEditable = () =>
    this.state[POLYGON].getEditable()

  getMap = () =>
    this.state[POLYGON].getEditable()

  getPath = () =>
    this.state[POLYGON].getMap()

  getPaths = () =>
    this.state[POLYGON].getPaths()

  getVisible = () =>
    this.state[POLYGON].getVisible()
}

export default Polygon
