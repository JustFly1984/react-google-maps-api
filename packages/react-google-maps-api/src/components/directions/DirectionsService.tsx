import * as React from "react"

import invariant from "invariant"

interface DirectionsServiceState {
  directionsService: google.maps.DirectionsService | null;
}

export interface DirectionsServiceProps {
  // required for default functionality
  options: google.maps.DirectionsRequest;

  // required for default functionality
  callback: (
    result: google.maps.DirectionsResult,
    status: google.maps.DirectionsStatus
  ) => void;
  onLoad?: (directionsService: google.maps.DirectionsService) => void;
  onUnmount?: (directionsService: google.maps.DirectionsService) => void;
}

export class DirectionsService extends React.PureComponent<
  DirectionsServiceProps,
  DirectionsServiceState
> {
  state: DirectionsServiceState = {
    directionsService: null
  }

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  setDirectionsServiceCallback = () => {
    if (this.state.directionsService !== null && this.props.onLoad) {
      this.props.onLoad(this.state.directionsService)
    }
  }

  componentDidMount() {
    invariant(
      !!this.props.options,
      "DirectionsService expected options object as parameter, but got %s",
      this.props.options
    )

    const directionsService = new google.maps.DirectionsService()

    function setDirectionsService() {
      return {
        directionsService
      }
    }

    this.setState(setDirectionsService, this.setDirectionsServiceCallback)
  }

  componentDidUpdate() {
    if (this.state.directionsService !== null) {
      this.state.directionsService.route(
        this.props.options,
        this.props.callback
      )
    }
  }

  componentWillUnmount() {
    if (this.state.directionsService !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.directionsService)
      }
    }
  }

  render() {
    return <></>
  }
}

export default DirectionsService
