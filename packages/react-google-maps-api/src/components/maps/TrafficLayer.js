/* global google */
import { PureComponent } from 'react'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/helper'
import MapContext from '../../map-context'

import { TrafficLayerPropTypes } from '../../proptypes'

const eventMap = {}

const updaterMap = {
  options (instance, options) {
    instance.setOptions(options)
  }
}

export class TrafficLayer extends PureComponent {
  static propTypes = TrafficLayerPropTypes

  static contextType = MapContext

  state = {
    trafficLayer: null
  }

  componentDidMount = () => {
    const trafficLayer = new google.maps.TrafficLayer(
      Object.assign(
        {
          map: this.context
        },
        this.props.options
      )
    )

    this.setState(
      () => ({
        trafficLayer
      }),
      () => {
        this.state.trafficLayer.setMap(this.context)

        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap,
          eventMap,
          prevProps: {},
          nextProps: this.props,
          instance: this.state.trafficLayer
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
      instance: this.state.trafficLayer
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)

    this.state.trafficLayer && this.state.trafficLayer.setMap(null)
  }

  render = () => null

  getMap = () => this.state.trafficLayer.getMap()
}

export default TrafficLayer
