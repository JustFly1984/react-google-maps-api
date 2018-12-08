/* global google */
import { PureComponent } from 'react'
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

  registeredEvents = []

  state = {
    heatmapLayer: null
  }

  constructor (props) {
    super(props)

    invariant(
      google.maps.visualization,
      'Did you include "visualization" in the libraries array prop in <LoadScript />?'
    )
  }

  componentDidMount = () => {
    const heatmapLayer = new google.maps.visualization.HeatmapLayer(
      Object.assign(
        {
          map: this.context
        },
        this.props.options
      )
    )

    this.setState(
      () => ({
        heatmapLayer
      }),
      () => {
        // this.state.heatmapLayer.setMap(this.context)

        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap,
          eventMap,
          prevProps: {},
          nextProps: this.props,
          instance: this.state.heatmapLayer
        })
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
      instance: this.state.heatmapLayer
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)

    if (this.state.heatmapLayer) {
      this.state.heatmapLayer.setMap(null)
    }
  }

  render = () => null

  getData = () =>
    this.state.heatmapLayer.getData()

  getMap = () =>
    this.state.heatmapLayer.getMap()
}

export default HeatmapLayer
