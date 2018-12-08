/* global google */
import { PureComponent } from 'react'

import MapContext from '../../map-context'

const StreetViewServicePropTypes = {}

export class StreetViewService extends PureComponent {
  static propTypes = StreetViewServicePropTypes

  static contextType = MapContext

  state = {
    streetViewService: null
  }

  componentDidMount = () => {
    const streetViewService = new google.maps.StreetViewService()

    this.setState(
      () => ({
        streetViewService
      })
    )
  }

  render = () => null

  getPanorama = () =>
    this.state.streetViewService.getPanorama()
}

export default StreetViewService
