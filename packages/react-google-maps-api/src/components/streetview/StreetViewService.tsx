import * as React from "react"

import MapContext from "../../map-context"

export interface StreetViewServiceProps {
  onLoad?: (streetViewService: google.maps.StreetViewService | null) => void;
  onUnmount?: (streetViewService: google.maps.StreetViewService | null) => void;
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
    if (this.state.streetViewService !== null && this.props.onLoad) {
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

  componentWillUnmount() {
    if (this.state.streetViewService !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.streetViewService)
      }
    }
  }

  render () {
    return null
  }
}

export default StreetViewService
