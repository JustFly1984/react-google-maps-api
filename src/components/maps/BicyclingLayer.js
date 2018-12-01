/* global google */
import { PureComponent } from 'react'

import MapContext from '../../mapcontext'

import { BicyclingLayerPropTypes } from '../../proptypes'

export class BicyclingLayer extends PureComponent {
  static propTypes = BicyclingLayerPropTypes
  static contextType = MapContext

  state = {
    polyline: null
  }

  componentDidMount = () => {
    const bicyclingLayer = new google.maps.BicyclingLayer()

    bicyclingLayer.setMap(this.context)
    this.setState({ bicyclingLayer })
  }

  componentWillUnmount () {
    if (this.state.bicyclingLayer) {
      this.state.bicyclingLayer.setMap(null)
    }
  }

  render () {
    return null
  }

  getMap = () => this.state.bicyclingLayer.getMap()
}

export default BicyclingLayer
