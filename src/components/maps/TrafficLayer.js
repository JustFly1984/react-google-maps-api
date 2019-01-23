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

  constructor (props, context) {
    super(props, context)

    this.state = {
      trafficLayer: new google.maps.TrafficLayer(
        Object.assign(
          {
            map: context
          },
          props.options
        )
      )
    }
  }

  componentDidMount () {
    this.state.trafficLayer.setMap(this.context)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: this.state.trafficLayer
    })
  }

  componentDidUpdate (prevProps) {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.trafficLayer
    })
  }

  componentWillUnmount () {
    unregisterEvents(this.registeredEvents)

    if (this.state.trafficLayer) {
      this.state.trafficLayer.setMap(null)
    }
  }

  render () {
    return <></>
  }

  getMap () {
    return this.state.trafficLayer.getMap()
  }
}

export default TrafficLayer
