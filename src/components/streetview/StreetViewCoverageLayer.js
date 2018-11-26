/* global google */
import { PureComponent } from 'react'

import {
  construct,
  getDerivedStateFromProps,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { STREETVIEW_COVERAGE_LAYER } from '../../constants'

const eventMap = {}

const updaterMap = {
  map (instance, map) {
    instance.setMap(map)
  },
}

const StreetViewCoverageLayerPropTypes = {}

export class StreetViewCoverageLayer extends PureComponent {
  static propTypes = StreetViewCoverageLayerPropTypes

  constructor (props) {
    super(props)

    const streetViewCoverageLayer = new google.maps.StreetViewCoverageLayer()

    this.state = {
      [STREETVIEW_COVERAGE_LAYER]: streetViewCoverageLayer,
      prevProps: construct(
        StreetViewCoverageLayerPropTypes,
        updaterMap,
        props,
        streetViewCoverageLayer
      )
    }
  }

  static getDerivedStateFromProps (props, state) {
    return getDerivedStateFromProps(
      props,
      state,
      this.state[STREETVIEW_COVERAGE_LAYER],
      eventMap,
      updaterMap
    )
  }

  componentWillUnmount () {
    componentWillUnmount(this)
  }

  render () {
    return null
  }

  getMap = () =>
    this.state[STREETVIEW_COVERAGE_LAYER].getMap()
}

export default StreetViewCoverageLayer
