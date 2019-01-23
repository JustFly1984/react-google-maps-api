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

  constructor (props, context) {
    super(props, context)

    this.state = {
      fusionTablesLayer: new google.maps.FusionTablesLayer(
        Object.assign(
          {
            map: context
          },
          props.options
        )
      )
    }

    this.registeredEvents = []
  }

  componentDidMount () {
    this.state.fusionTablesLayer.setMap(this.context)
  }

  componentDidUpdate (prevProps) {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.fusionTablesLayer
    })
  }

  componentWillUnmount () {
    unregisterEvents(this.registeredEvents)

    if (this.state.fusionTablesLayer) {
      this.state.fusionTablesLayer.setMap(null)
    }
  }

  render () {
    return <></>
  }

  getMap () {
    return this.state.fusionTablesLayer.getMap()
  }
}

export default FusionTablesLayer
