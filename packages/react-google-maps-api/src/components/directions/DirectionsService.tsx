import { PureComponent } from "react"

interface DirectionsServiceState {
  directionsService?: google.maps.DirectionsService
}

interface DirectionsServiceProps {
  options?: google.maps.DirectionsRequest
  callback?: (
    result: google.maps.DirectionsResult,
    status: google.maps.DirectionsStatus
  ) => void
}

export class DirectionsService extends PureComponent<
  DirectionsServiceProps,
  DirectionsServiceState
> {
  state: DirectionsServiceState = {
    directionsService: null
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
    this.state.directionsService.route(this.props.options, this.props.callback)
  }

  render = () => null
}

export default DirectionsService
