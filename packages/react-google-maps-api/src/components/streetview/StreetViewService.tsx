import * as React from 'react'

import MapContext from '../../map-context'

export interface StreetViewServiceProps {
  /** This callback is called when the streetViewService instance has loaded. It is called with the streetViewService instance. */
  onLoad?: (streetViewService: google.maps.StreetViewService | null) => void
  /** This callback is called when the component unmounts. It is called with the streetViewService instance. */
  onUnmount?: (streetViewService: google.maps.StreetViewService | null) => void
}

interface StreetViewServiceState {
  streetViewService: google.maps.StreetViewService | null
}

export class StreetViewService extends React.PureComponent<
  StreetViewServiceProps,
  StreetViewServiceState
> {
  static contextType = MapContext

  state = {
    streetViewService: null,
  }

  setStreetViewServiceCallback = (): void => {
    if (this.state.streetViewService !== null && this.props.onLoad) {
      this.props.onLoad(this.state.streetViewService)
    }
  }

  componentDidMount(): void {
    const streetViewService = new google.maps.StreetViewService()

    this.setState(function setStreetViewService() {
      return {
        streetViewService,
      }
    }, this.setStreetViewServiceCallback)
  }

  componentWillUnmount(): void {
    if (this.state.streetViewService !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.streetViewService)
      }
    }
  }

  render(): React.ReactNode {
    return null
  }
}

export default StreetViewService
