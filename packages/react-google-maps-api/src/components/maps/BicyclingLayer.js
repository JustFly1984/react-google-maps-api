/* global google */
import { PureComponent } from 'react'

import MapContext from '../../map-context'

import { BicyclingLayerPropTypes } from '../../proptypes'

export class BicyclingLayer extends PureComponent {
  static propTypes = BicyclingLayerPropTypes

  static contextType = MapContext

  state = {
    bicyclingLayer: null
  }

  componentDidMount = () => {
    const bicyclingLayer = new google.maps.BicyclingLayer(
      Object.assign(
        {
          map: this.context
        },
        this.props.options
      )
    )

    this.setState(
      () => ({
        bicyclingLayer
      }),
      () => {
        bicyclingLayer.setMap(this.context)
      }
    )
  }

  componentWillUnmount = () => {
    if (this.state.bicyclingLayer) {
      this.state.bicyclingLayer.setMap(null)
    }
  }

  render = () => null

  getMap = () => this.state.bicyclingLayer.getMap()
}

export default BicyclingLayer
