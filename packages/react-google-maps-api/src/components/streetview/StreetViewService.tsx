import { PureComponent } from "react"

import MapContext from "../../map-context"

interface StreetViewServiceProps {
  onLoad: (streetViewService: google.maps.StreetViewService) => void
}

interface StreetViewServiceState {
  streetViewService?: google.maps.StreetViewService
}

export class StreetViewService extends PureComponent<
  StreetViewServiceProps,
  StreetViewServiceState
> {
  static contextType = MapContext

  state = {
    streetViewService: null
  }

  componentDidMount = () => {
    const streetViewService = new google.maps.StreetViewService()

    this.setState(
      () => ({
        streetViewService
      }),
      () => {
        this.props.onLoad(this.state.streetViewService)
      }
    )
  }

  render = () => null

  getPanorama = (
    request:
      | google.maps.StreetViewLocationRequest
      | google.maps.StreetViewPanoRequest,
    callback: (
      data: google.maps.StreetViewPanoramaData,
      status: google.maps.StreetViewStatus
    ) => void
  ) => this.state.streetViewService.getPanorama(request, callback)
}

export default StreetViewService
