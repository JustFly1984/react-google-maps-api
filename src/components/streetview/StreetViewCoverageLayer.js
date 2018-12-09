/* global google */
import { PureComponent } from 'react'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/helper'

import MapContext from '../../map-context'

const eventMap = {}

const updaterMap = {
  map (instance, map) {
    instance.setMap(map)
  },
}

const StreetViewCoverageLayerPropTypes = {}

export class StreetViewCoverageLayer extends PureComponent {
  static propTypes = StreetViewCoverageLayerPropTypes

  static contextType = MapContext

  registerEvents = []

  state = {
    streetViewCoverageLayer: null
  }

  componentDidMount = () => {
    const streetViewCoverageLayer = new google.maps.StreetViewCoverageLayer()

    this.setState(
      () => ({
        streetViewCoverageLayer
      }),
      () => {
        this.state.streetViewCoverageLayer.setMap(this.context)

        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap,
          eventMap,
          prevProps: {},
          nextProps: this.props,
          instance: this.state.streetViewCoverageLayer
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
      instance: this.state.streetViewCoverageLayer
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)

    this.state.streetViewCoverageLayer &&
      this.state.streetViewCoverageLayer.setMap(null)
  }

  render = () => null

  getMap = () =>
    this.state.streetViewCoverageLayer.getMap()
}

export default StreetViewCoverageLayer
