/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  construct,
  getDerivedStateFromProps,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { MAP, TRAFFIC_LAYER } from '../../constants'
import { TrafficLayerPropTypes } from '../../proptypes'

const eventMap = {}

const updaterMap = {
  options (instance, options) {
    instance.setOptions(options)
  },
  map (instance, map) {
    instance.setMap(map)
  }
}

export class TrafficLayer extends PureComponent {
  static propTypes = TrafficLayerPropTypes

  static contextTypes = {
    [MAP]: PropTypes.object,
  }

  constructor (props, context) {
    super(props, context)

    const trafficLayer = new google.maps.TrafficLayer(
      props.options
    )

    this.state = {
      [TRAFFIC_LAYER]: trafficLayer,
      prevProps: construct(
        TrafficLayerPropTypes,
        updaterMap,
        props,
        trafficLayer
      )
    }

    trafficLayer.setMap(context[MAP])
  }

  static getDerivedStateFromProps (props, state) {
    return getDerivedStateFromProps(
      props,
      state,
      this.state[TRAFFIC_LAYER],
      eventMap,
      updaterMap
    )
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const trafficLayer = this.state[TRAFFIC_LAYER]

    if (trafficLayer) {
      trafficLayer.setMap(null)
    }
  }

  render () {
    return null
  }

  getMap = () =>
    this.state[TRAFFIC_LAYER].getMap()
}

export default TrafficLayer
