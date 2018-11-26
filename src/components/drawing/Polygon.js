/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  construct,
  componentDidMount,
  componentDidUpdate,
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

    construct(
      PolygonPropTypes,
      updaterMap,
      props,
      polygon
    )

    polygon.setMap(context[MAP])

    this.state = {
      [POLYGON]: polygon,
    }

    this.getDraggable = this.getDraggable.bind(this)
    this.getEditable = this.getEditable.bind(this)
    this.getMap = this.getMap.bind(this)
    this.getPath = this.getPath.bind(this)
    this.getPaths = this.getPaths.bind(this)
    this.getVisible = this.getVisible.bind(this)
  }

  componentDidMount () {
    componentDidMount(this, this.state[POLYGON], eventMap)
  }

  componentDidUpdate (prevProps) {
    componentDidUpdate(this, this.state[POLYGON], eventMap, updaterMap, prevProps)
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const polygon = this.state[POLYGON]

    if (polygon) {
      polygon.setMap(null)
    }
  }

  render () {
    return false
  }

  getDraggable () {
    return this.state[POLYGON].getDraggable()
  }

  getEditable () {
    return this.state[POLYGON].getEditable()
  }

  getMap () {
    return this.state[POLYGON].getEditable()
  }

  getPath () {
    return this.state[POLYGON].getMap()
  }

  getPaths () {
    return this.state[POLYGON].getPaths()
  }

  getVisible () {
    return this.state[POLYGON].getVisible()
  }
}

export default Polygon
