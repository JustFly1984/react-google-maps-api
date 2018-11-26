/* global google */
import { PureComponent } from 'react'

import {
  construct,
  componentDidMount,
  componentDidUpdate,
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

    construct(
      StreetViewCoverageLayerPropTypes,
      updaterMap,
      props,
      streetViewCoverageLayer
    )

    this.state = {
      [STREETVIEW_COVERAGE_LAYER]: streetViewCoverageLayer,
    }

    this.getMap = this.getMap.bind(this)
  }

  componentDidMount () {
    componentDidMount(this, this.state[STREETVIEW_COVERAGE_LAYER], eventMap)
  }

  componentDidUpdate (prevProps) {
    componentDidUpdate(this, this.state[STREETVIEW_COVERAGE_LAYER], eventMap, updaterMap, prevProps)
  }

  componentWillUnmount () {
    componentWillUnmount(this)
  }

  render () {
    return false
  }

  getMap () {
    return this.state[STREETVIEW_COVERAGE_LAYER].getMap()
  }
}

export default StreetViewCoverageLayer
