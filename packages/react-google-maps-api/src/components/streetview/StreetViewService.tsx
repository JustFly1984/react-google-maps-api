import * as React from "react"

import MapContext from "../../map-context"

interface StreetViewServiceProps {
  onLoad: (streetViewService: google.maps.StreetViewService) => void;
}

interface StreetViewServiceState {
  streetViewService: google.maps.StreetViewService | null;
}

export class StreetViewService extends React.PureComponent<
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
        if (
          this.state.streetViewService !== null &&
          this.props.onLoad
        ) {
          // @ts-ignore
          this.props.onLoad(this.state.streetViewService)
        }
      }
    )
  }

  render () {
    return null
  }
}

export default StreetViewService
