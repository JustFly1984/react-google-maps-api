import * as React from "react"

import * as invariant from "invariant"

interface DirectionsServiceState {
  directionsService: google.maps.DirectionsService | null;
}

interface DirectionsServiceProps {
  options: google.maps.DirectionsRequest; // required for default functionality
  callback: (  // required for default functionality
    result: google.maps.DirectionsResult,
    status: google.maps.DirectionsStatus
  ) => void;
  onLoad: (directionsService: google.maps.DirectionsService) => void;
}

export class DirectionsService extends React.PureComponent<
  DirectionsServiceProps,
  DirectionsServiceState
> {
  state: DirectionsServiceState = {
    directionsService: null
  }

  componentDidMount = () => {
    invariant(
      !!this.props.options,
      "DirectionsService expected options object as parameter, but got %s",
      this.props.options
    )

    const directionsService = new google.maps.DirectionsService()

    this.setState(
      () => ({
        directionsService
      }),
      () => {
        if (this.state.directionsService !== null) {
          this.state.directionsService.route(
            this.props.options,
            this.props.callback
          )
        }
      }
    )
  }

  componentDidUpdate = () => {
    if (this.state.directionsService !== null) {
      this.state.directionsService.route(
        this.props.options,
        this.props.callback
      )
    }
  }

  render () {
    return null
  }
}

export default DirectionsService
