import { PureComponent } from 'react'

import invariant from 'invariant'

type DistanceMatrixServiceState = {
  distanceMatrixService: google.maps.DistanceMatrixService | null
}

export type DistanceMatrixServiceProps = {
  // required for default functionality
  options: google.maps.DistanceMatrixRequest

  // required for default functionality
  callback: (
    // required
    /** The response to a DistanceMatrixService request, consisting of the formatted origin and destination addresses, and a sequence of DistanceMatrixResponseRows, one for each corresponding origin address. */
    response: google.maps.DistanceMatrixResponse | null,
    // required
    /** The top-level status about the request in general returned by the DistanceMatrixService upon completion of a distance matrix request. Specify these by value, or by using the constant's name. For example, 'OK' or google.maps.DistanceMatrixStatus.OK. */
    status: google.maps.DistanceMatrixStatus
  ) => void
  /** This callback is called when the distanceMatrixService instance has loaded. It is called with the distanceMatrixService instance. */
  onLoad?:
    | ((distanceMatrixService: google.maps.DistanceMatrixService) => void)
    | undefined
  /** This callback is called when the component unmounts. It is called with the distanceMatrixService instance. */
  onUnmount?:
    | ((distanceMatrixService: google.maps.DistanceMatrixService) => void)
    | undefined
}

export class DistanceMatrixService extends PureComponent<
  DistanceMatrixServiceProps,
  DistanceMatrixServiceState
> {
  override state: DistanceMatrixServiceState = {
    distanceMatrixService: null,
  }

  setDistanceMatrixServiceCallback = (): void => {
    if (this.state.distanceMatrixService !== null && this.props.onLoad) {
      this.props.onLoad(this.state.distanceMatrixService)
    }
  }

  override componentDidMount(): void {
    invariant(
      !!this.props.options,
      'DistanceMatrixService expected options object as parameter, but go %s',
      this.props.options
    )

    const distanceMatrixService = new google.maps.DistanceMatrixService()

    this.setState(function setDistanceMatrixService() {
      return {
        distanceMatrixService,
      }
    }, this.setDistanceMatrixServiceCallback)
  }

  override componentDidUpdate(): void {
    if (this.state.distanceMatrixService !== null) {
      this.state.distanceMatrixService.getDistanceMatrix(
        this.props.options,
        this.props.callback
      )
    }
  }

  override componentWillUnmount(): void {
    if (this.state.distanceMatrixService !== null && this.props.onUnmount) {
      this.props.onUnmount(this.state.distanceMatrixService)
    }
  }

  override render(): null {
    return null
  }
}

export default DistanceMatrixService
