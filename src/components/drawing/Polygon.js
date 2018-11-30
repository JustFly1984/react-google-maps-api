/* global google */
import { PureComponent } from 'react'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/MapChildHelper'

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

  registeredEvents = []

  state = {
    polygon: null
  }

  initializePoligon = () => {
    const polygon = new google.maps.Polygon(
      Object.assign(this.props.options, {
        map: this.props.map
      })
    )

    this.setState(
      () => ({
        polygon
      }),
      () => {
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap,
          eventMap,
          prevProps: {},
          nextProps: this.props,
          instance: this.state.polygon
        })
      })
  }

  componentDidMount = () => {
    if (this.props.map !== null) {
      this.initializePoligon()
    }
  }

  componentDidUpdate = prevProps => {
    if (this.props.map !== null && this.state.polygon === null) {
      this.initializePoligon()
    }

    if (this.state.polygon !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.polygon
      })
    }
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)

    if (this.state.polygon !== 'undefined') {
      this.state.polygon.setMap(null)
    }
  }

  render = () => null

  getDraggable = () =>
    this.state.polygon.getDraggable()

  getEditable = () =>
    this.state.polygon.getEditable()

  getMap = () =>
    this.state.polygon.getEditable()

  getPath = () =>
    this.state.polygon.getMap()

  getPaths = () =>
    this.state.polygon.getPaths()

  getVisible = () =>
    this.state.polygon.getVisible()
}

export default Polygon
