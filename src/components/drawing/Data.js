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
import { DataPropTypes } from '../../proptypes'

const eventMap = {
  onAddFeature: 'addfeature',
  onClick: 'click',
  onDblClick: 'dblclick',
  onMouseDown: 'mousedown',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onRemoveFeature: 'removefeature',
  onRemoveProperty: 'removeproperty',
  onRightClick: 'rightclick',
  onSetGeometry: 'setgeometry',
  onSetProperty: 'setproperty'
}

const updaterMap = {
  add (instance, features) {
    instance.add(features)
  },
  addgeojson (instance, geojson, options) {
    instance.addGeoJson(geojson, options)
  },
  contains (instance, feature) {
    instance.contains(feature)
  },
  foreach (instance, callback) {
    instance.forEach(callback)
  },
  loadgeojson (instance, url, options, callback) {
    instance.loadGeoJson(url, options, callback)
  },
  overridestyle (instance, feature, style) {
    instance.overrideStyle(feature, style)
  },
  remove (instance, feature) {
    instance.remove(feature)
  },
  revertstyle (instance, features) {
    instance.revertStyle(features)
  },
  controlposition (instance, controlPosition) {
    instance.setControlPosition(controlPosition)
  },
  controls (instance, controls) {
    instance.setControls(controls)
  },
  drawingmode (instance, mode) {
    instance.setDrawingMode(mode)
  },
  map (instance, map) {
    instance.setMap(map)
  },
  style (instance, style) {
    instance.setStyle(style)
  },
  togeojson (instance, callback) {
    instance.toGeoJson(callback)
  }
}

export class Data extends PureComponent {
  static propTypes = DataPropTypes

  static contextTypes = {
    [MAP]: PropTypes.object,
  }

  constructor (props, context) {
    super(props, context)

    const circle = new google.maps.Data(
      props.options
    )

    construct(
      DataPropTypes,
      updaterMap,
      props,
      circle
    )

    circle.setMap(context[MAP])

    this.state = {
      [CIRCLE]: circle,
    }

    this.getControlPosition = this.getControlPosition.bind(this)
    this.getControls = this.getControls.bind(this)
    this.getDrawingMode = this.getDrawingMode.bind(this)
    this.getFeatureById = this.getFeatureById.bind(this)
    this.getMap = this.getMap.bind(this)
    this.getStyle = this.getStyle.bind(this)
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

  getControlPosition () {
    return this.state[CIRCLE].getControlPosition()
  }
  getControls () {
    return this.state[CIRCLE].getControls()
  }
  getDrawingMode () {
    return this.state[CIRCLE].getDrawingMode()
  }
  getFeatureById () {
    return this.state[CIRCLE].getFeatureById()
  }
  getMap () {
    return this.state[CIRCLE].getMap()
  }
  getStyle () {
    return this.state[CIRCLE].getStyle()
  }
}

export default Data
