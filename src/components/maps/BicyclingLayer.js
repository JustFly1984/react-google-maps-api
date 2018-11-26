/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  construct,
  getDerivedStateFromProps,
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

    this.state = {
      [BICYCLING_LAYER]: bicyclingLayer,
      prevProps: construct(
        BicyclingLayer.propTypes,
        updaterMap,
        props,
        bicyclingLayer
      )
    }

    bicyclingLayer.setMap(context[MAP])
  }

  static getDerivedStateFromProps (props, state) {
    return getDerivedStateFromProps(
      props,
      state,
      this.state[BICYCLING_LAYER],
      eventMap,
      updaterMap
    )
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const bicyclingLayer = this.state[BICYCLING_LAYER]

    if (bicyclingLayer) {
      bicyclingLayer.setMap(null)
    }
  }

  render () {
    return null
  }

  getMap = () =>
    this.state[BICYCLING_LAYER].getMap()
}

export default BicyclingLayer
