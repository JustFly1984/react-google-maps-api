/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  construct,
  componentDidMount,
  componentDidUpdate,
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

    construct(
      TrafficLayerPropTypes,
      updaterMap,
      props,
      trafficLayer
    )

    trafficLayer.setMap(context[MAP])

    this.state = {
      [TRAFFIC_LAYER]: trafficLayer,
    }

    this.getMap = this.getMap.bind(this)
  }

  componentDidMount () {
    componentDidMount(this, this.state[TRAFFIC_LAYER], eventMap)
  }

  componentDidUpdate (prevProps) {
    componentDidUpdate(this, this.state[TRAFFIC_LAYER], eventMap, updaterMap, prevProps)
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const trafficLayer = this.state[TRAFFIC_LAYER]

    if (trafficLayer) {
      trafficLayer.setMap(null)
    }
  }

  render () {
    return false
  }

  getMap () {
    return this.state[TRAFFIC_LAYER].getMap()
  }
}

export default TrafficLayer
