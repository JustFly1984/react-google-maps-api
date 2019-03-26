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

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  setStreetViewServiceCallback = () => {
    if (
      this.state.streetViewService !== null &&
      this.props.onLoad
    ) {
      this.props.onLoad(this.state.streetViewService)
    }
  }

  componentDidMount() {
    const streetViewService = new google.maps.StreetViewService()

    function setStreetViewService() {
      return {
        streetViewService
      }
    }

    this.setState(
      setStreetViewService,

    )
  }

  render () {
    return null
  }
}

export default StreetViewService
