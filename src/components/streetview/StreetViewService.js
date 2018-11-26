/* global google */
import { PureComponent } from 'react'

import {
  construct,
  componentDidMount,
  componentDidUpdate,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { STREETVIEW_SERVICE } from '../../constants'

const eventMap = {}

const updaterMap = {}

const StreetViewServicePropTypes = {}

export class StreetViewService extends PureComponent {
  static propTypes = StreetViewServicePropTypes

  constructor (props) {
    super(props)

    const streetViewService = new google.maps.StreetViewService()

    construct(
      StreetViewServicePropTypes,
      updaterMap,
      props,
      streetViewService
    )

    this.state = {
      [STREETVIEW_SERVICE]: streetViewService,
    }

    this.getPanorama = this.getPanorama.bind(this)
  }

  componentDidMount () {
    componentDidMount(this, this.state[STREETVIEW_SERVICE], eventMap)
  }

  componentDidUpdate (prevProps) {
    componentDidUpdate(this, this.state[STREETVIEW_SERVICE], eventMap, updaterMap, prevProps)
  }

  componentWillUnmount () {
    componentWillUnmount(this)
  }

  render () {
    return false
  }

  getPanorama () {
    return this.state[STREETVIEW_SERVICE].getPanorama()
  }
}

export default StreetViewService
