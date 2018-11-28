/* global google */
import { PureComponent } from 'react'
import { BicyclingLayerPropTypes } from '../../proptypes'

export class BicyclingLayer extends PureComponent {
  static propTypes = BicyclingLayerPropTypes

  constructor (props) {
    super(props)

    this.state = {
      bicyclingLayer: null
    }
  }

  static getDerivedStateFromProps (props, state) {
    if (props.map !== null) {
      const bicyclingLayer = state.bicyclingLayer === null
        ? new google.maps.BicyclingLayer()
        : state.bicyclingLayer

      if (state.bicyclingLayer === null) {
        bicyclingLayer.setMap(props.map)
      }

      return {
        bicyclingLayer
      }
    }

    return {
      bicyclingLayer: state.bicyclingLayer
    }
  }

  componentWillUnmount () {
    if (this.state.bicyclingLayer !== null) {
      this.state.bicyclingLayer.setMap(null)
    }
  }

  render () {
    return null
  }

  getMap = () =>
    this.state.bicyclingLayer.getMap()
}

export default BicyclingLayer
