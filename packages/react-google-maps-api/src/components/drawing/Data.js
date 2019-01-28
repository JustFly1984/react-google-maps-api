/* global google */
import { PureComponent } from 'react'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/helper'

import MapContext from '../../map-context'

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

  static contextType = MapContext

  registeredEvents = []

  state = {
    data: null
  }

  componentDidMount = () => {
    const data = new google.maps.Data(
      Object.assign({
        map: this.context
      },
      this.props.options
      )
    )

    this.setState(
      () => ({
        data
      }),
      () => {
        this.state.data.setMap(this.context)
      }
    )
  }

  componentDidUpdate = prevProps => {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.data
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)

    if (this.props.data) {
      this.props.data.setMap(null)
    }
  }

  render = () => null

  getControlPosition = () =>
    this.state.data.getControlPosition()

  getControls = () =>
    this.state.data.getControls()

  getDrawingMode = () =>
    this.state.data.getDrawingMode()

  getFeatureById = () =>
    this.state.data.getFeatureById()

  getMap = () =>
    this.state.data.getMap()

  getStyle = () =>
    this.state.data.getStyle()
}

export default Data
