/* global google */
import React, { PureComponent } from 'react'

import MapContext from '../../map-context'

import { BicyclingLayerPropTypes } from '../../proptypes'

export class BicyclingLayer extends PureComponent {
  static propTypes = BicyclingLayerPropTypes

  static contextType = MapContext

  constructor (props, context) {
    super(props, context)

    this.state = {
      bicyclingLayer: new google.maps.BicyclingLayer(
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
    this.state.bicyclingLayer.setMap(this.context)
  }

  componentWillUnmount () {
    if (this.state.bicyclingLayer) {
      this.state.bicyclingLayer.setMap(null)
    }
  }

  render () {
    return <></>
  }

  getMap () {
    return this.state.bicyclingLayer.getMap()
  }
}

export default BicyclingLayer
