/* global google */
import { PureComponent } from 'react'

import MapContext from '../../map-context'

import { DirectionsServicePropTypes } from '../../proptypes'

export class DirectionsService extends PureComponent {
  static propTypes = DirectionsServicePropTypes

  static contextType = MapContext

  state = {
    directionsRenderer: null
  }

  componentDidMount = () => {
    const directionsService = new google.maps.DirectionsService()

    this.setState(
      () => ({
        directionsService
      }),
      () => {
        this.state.directionsService.route(
          this.props.options,
          this.props.callback
        )
      }
    )
  }

  componentDidUpdate = () => {
    this.state.directionsService.route(
      this.props.options,
      this.props.callback
    )
  }

  render = () => null
}

export default DirectionsService
