/* global google */
import { PureComponent } from 'react'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/helper'

import MapContext from '../../map-context'

const eventMap = {
  onClick: 'click',
}

const updaterMap = {
  map (instance: google.maps.FusionTablesLayer, map: google.maps.Map) {
    instance.setMap(map)
  },
  options (instance: google.maps.FusionTablesLayer, options: google.maps.FusionTablesLayerOptions) {
    instance.setOptions(options)
  },
}

interface FusionTablesLayerState {
  fusionTablesLayer?: google.maps.FusionTablesLayer;
}

interface FusionTablesLayerProps {
  options?: google.maps.FusionTablesLayerOptions;
  onClick?: (e: MouseEvent) => void;
}

export class FusionTablesLayer extends PureComponent<FusionTablesLayerProps, FusionTablesLayerState> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state = {
    fusionTablesLayer: null
  }

  componentDidMount = () => {
    const fusionTablesLayer = new google.maps.FusionTablesLayer(
      this.props.options
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

  componentDidUpdate = (prevProps: FusionTablesLayerProps) => {
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
