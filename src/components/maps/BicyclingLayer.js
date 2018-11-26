/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  construct,
  componentDidMount,
  componentDidUpdate,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { MAP, BICYCLING_LAYER } from '../../constants'

const eventMap = {}

const updaterMap = {
  map (instance, map) {
    instance.setMap(map)
  }
}

export class BicyclingLayer extends PureComponent {
  static propTypes = {}

  static contextTypes = {
    [MAP]: PropTypes.object,
  }

  constructor (props, context) {
    super(props, context)

    const bicyclingLayer = new google.maps.BicyclingLayer()

    construct(
      BicyclingLayer.propTypes,
      updaterMap,
      props,
      bicyclingLayer
    )

    bicyclingLayer.setMap(context[MAP])

    this.state = {
      [BICYCLING_LAYER]: bicyclingLayer,
    }

    this.getMap = this.getMap.bind(this)
  }

  componentDidMount () {
    componentDidMount(this, this.state[BICYCLING_LAYER], eventMap)
  }

  componentDidUpdate (prevProps) {
    componentDidUpdate(this, this.state[BICYCLING_LAYER], eventMap, updaterMap, prevProps)
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const bicyclingLayer = this.state[BICYCLING_LAYER]

    if (bicyclingLayer) {
      bicyclingLayer.setMap(null)
    }
  }

  render () {
    return false
  }

  getMap () {
    return this.state[BICYCLING_LAYER].getMap()
  }
}

export default BicyclingLayer
