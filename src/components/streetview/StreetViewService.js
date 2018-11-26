/* global google */
import { PureComponent } from 'react'

import {
  construct,
  getDerivedStateFromProps,
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

    this.state = {
      [STREETVIEW_SERVICE]: streetViewService,
      prevProps: construct(
        StreetViewServicePropTypes,
        updaterMap,
        props,
        streetViewService
      )
    }
  }

  static getDerivedStateFromProps (props, state) {
    return getDerivedStateFromProps(
      props,
      state,
      this.state[STREETVIEW_SERVICE],
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

  getPanorama = () =>
    this.state[STREETVIEW_SERVICE].getPanorama()
}

export default StreetViewService
