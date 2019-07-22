import * as React from 'react'

import invariant from 'invariant'

interface DistanceMatrixServiceState {
  distanceMatrixService: google.maps.DistanceMatrixService | null;
}

export interface DistanceMatrixServiceProps {
  // required for default functionality
  options: google.maps.DistanceMatrixRequest;

  // required for default functionality
  callback: (
    response: google.maps.DistanceMatrixResponse,
    status: google.maps.DistanceMatrixStatus
  ) => void;
  onLoad?: (distanceMatrixService: google.maps.DistanceMatrixService) => void;
  onUnmount?: (distanceMatrixService: google.maps.DistanceMatrixService) => void;
}

export class DistanceMatrixService extends React.PureComponent<
DistanceMatrixServiceProps,
DistanceMatrixServiceState
> {
  state: DistanceMatrixServiceState = {
    distanceMatrixService: null
  }

  setDistanceMatrixServiceCallbak = () => {
    if (this.state.distanceMatrixService !== null && this.props.onLoad) {
      this.props.onLoad(this.state.distanceMatrixService)
    }
  }

  componentDidMount() {
    invariant(
      !!this.props.options,
      'DistanceMatrixService expected options object as parameter, but go %s',
      this.props.options
    )

    const distanceMatrixService = new google.maps.DistanceMatrixService()

    function setDistanceMatrixService() {
      return {
        distanceMatrixService
      }
    }

    this.setState(setDistanceMatrixService, this.setDistanceMatrixServiceCallbak)
  }

  componentDidUpdate() {
    if (this.state.distanceMatrixService !== null) {
      this.state.distanceMatrixService.getDistanceMatrix(this.props.options, this.props.callback)
    }
  }

  componentWillUnmount() {
    if (this.state.distanceMatrixService !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.distanceMatrixService)
      }
    }
  }

  render() {
    return <></>
  }
}

export default DistanceMatrixService
