import * as React from 'react'
import invariant from 'invariant'

interface DirectionsServiceState {
  directionsService: google.maps.DirectionsService | null
}

export interface DirectionsServiceProps {
  // required for default functionality
  options: google.maps.DirectionsRequest

  // required for default functionality
  callback: (
    // required
    /** The directions response retrieved from the directions server. You can render these using a DirectionsRenderer or parse this object and render it yourself. You must display the warnings and copyrights as noted in the Google Maps Platform Terms of Service. Note that though this result is "JSON-like," it is not strictly JSON, as it indirectly includes LatLng objects */
    result: google.maps.DirectionsResult | null,
    // required
    /** The status returned by the DirectionsService on the completion of a call to route(). Specify these by value, or by using the constant's name. For example, 'OK' or google.maps.DirectionsStatus.OK */
    status: google.maps.DirectionsStatus
  ) => void
  /** This callback is called when the directionsService instance has loaded. It is called with the directionsService instance. */
  onLoad?: (directionsService: google.maps.DirectionsService) => void
  /** This callback is called when the component unmounts. It is called with the directionsService instance. */
  onUnmount?: (directionsService: google.maps.DirectionsService) => void
}

export class DirectionsService extends React.PureComponent<
  DirectionsServiceProps,
  DirectionsServiceState
> {
  state: DirectionsServiceState = {
    directionsService: null,
  }

  setDirectionsServiceCallback = (): void => {
    if (this.state.directionsService !== null && this.props.onLoad) {
      this.props.onLoad(this.state.directionsService)
    }
  }

  componentDidMount(): void {
    invariant(
      !!this.props.options,
      'DirectionsService expected options object as parameter, but got %s',
      this.props.options
    )

    const directionsService = new google.maps.DirectionsService()

    this.setState(function setDirectionsService() {
      return {
        directionsService,
      }
    }, this.setDirectionsServiceCallback)
  }

  componentDidUpdate(): void {
    if (this.state.directionsService !== null) {
      this.state.directionsService.route(this.props.options, this.props.callback)
    }
  }

  componentWillUnmount(): void {
    if (this.state.directionsService !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.directionsService)
      }
    }
  }

  render(): JSX.Element {
    return <></>
  }
}

export default DirectionsService
