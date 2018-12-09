/* global google */
import { PureComponent } from 'react'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/helper'

import MapContext from '../../map-context'

import { FusionTablesLayerPropTypes } from '../../proptypes'

const eventMap = {
  onClick: 'click',
}

const updaterMap = {
  map (instance, map) {
    instance.setMap(map)
  },
  options (instance, options) {
    instance.setOptions(options)
  },
}

export class FusionTablesLayer extends PureComponent {
  static propTypes = FusionTablesLayerPropTypes

  static contextType = MapContext

  registeredEvents = []

  state = {
    fusionTablesLayer: null
  }

  componentDidMount = () => {
    const fusionTablesLayer = new google.maps.FusionTablesLayer(
      Object.assign(
        {
          map: this.context
        },
        this.props.options
      )
    )

    this.setState(
      () => ({
        fusionTablesLayer
      }),
      () => {
        this.state.fusionTablesLayer.setMap(this.context)
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
      instance: this.state.fusionTablesLayer
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)

    if (this.state.fusionTablesLayer) {
      this.state.fusionTablesLayer.setMap(null)
    }
  }

  render = () => null

  getMap = () =>
    this.state.fusionTablesLayer.getMap()
}

export default FusionTablesLayer
