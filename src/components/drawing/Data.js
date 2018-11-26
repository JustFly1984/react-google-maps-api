/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  construct,
  getDerivedStateFromProps,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { MAP, DATA } from '../../constants'
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

    this.state = {
      [DATA]: circle,
      prevProps: construct(
        DataPropTypes,
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
      this.state[DATA],
      eventMap,
      updaterMap
    )
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const circle = this.state[DATA]

    if (circle) {
      circle.setMap(null)
    }
  }

  render () {
    return null
  }

  getControlPosition = () =>
    this.state[DATA].getControlPosition()

  getControls = () =>
    this.state[DATA].getControls()

  getDrawingMode = () =>
    this.state[DATA].getDrawingMode()

  getFeatureById = () =>
    this.state[DATA].getFeatureById()

  getMap = () =>
    this.state[DATA].getMap()

  getStyle = () =>
    this.state[DATA].getStyle()
}

export default Data
