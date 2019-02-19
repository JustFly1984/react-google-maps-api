import { PureComponent } from "react"

import MapContext from "../../map-context"

export class BicyclingLayer extends PureComponent {
  static contextType = MapContext

  state = {
    bicyclingLayer: null
  }

  componentDidMount = () => {
    const bicyclingLayer = new google.maps.BicyclingLayer()

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
