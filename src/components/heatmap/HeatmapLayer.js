/* global google */
import React, { PureComponent } from 'react'
import invariant from 'invariant'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/helper'

import MapContext from '../../map-context'

import { HeatmapLayerPropTypes } from '../../proptypes'

const eventMap = {}

const updaterMap = {
  data (instance, data) {
    instance.setData(data)
  },
  map (instance, map) {
    instance.setMap(map)
  },
  options (instance, options) {
    instance.setOptions(options)
  },
}

export class HeatmapLayer extends PureComponent {
  static propTypes = HeatmapLayerPropTypes

  static contextType = MapContext

  constructor (props, context) {
    super(props, context)

    invariant(
      google.maps.visualization,
      'Did you include "visualization" in the libraries array prop in <LoadScript />?'
    )

    this.state = {
      heatmapLayer: new google.maps.visualization.HeatmapLayer(
        Object.assign(
          {
            map: context
          },
          props.options
        )
      )
    }

    this.registeredEvents = []
  }

  componentDidMount () {
    // this.state.heatmapLayer.setMap(this.context)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: this.state.heatmapLayer
    })
  }

  componentDidUpdate (prevProps) {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.heatmapLayer
    })
  }

  componentWillUnmount () {
    unregisterEvents(this.registeredEvents)

    if (this.state.heatmapLayer) {
      this.state.heatmapLayer.setMap(null)
    }
  }

  render () {
    return <></>
  }

  getData () {
    return this.state.heatmapLayer.getData()
  }

  getMap () {
    return this.state.heatmapLayer.getMap()
  }
}

export default HeatmapLayer
