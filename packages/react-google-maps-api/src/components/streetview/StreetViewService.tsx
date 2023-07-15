import { PureComponent } from 'react'

import MapContext from '../../map-context'

export interface StreetViewServiceProps {
  /** This callback is called when the streetViewService instance has loaded. It is called with the streetViewService instance. */
  onLoad?: ((streetViewService: google.maps.StreetViewService | null) => void) | undefined
  /** This callback is called when the component unmounts. It is called with the streetViewService instance. */
  onUnmount?: ((streetViewService: google.maps.StreetViewService | null) => void) | undefined
}

interface StreetViewServiceState {
  streetViewService: google.maps.StreetViewService | null
}

export class StreetViewService extends PureComponent<
  StreetViewServiceProps,
  StreetViewServiceState
> {
  static override contextType = MapContext

  declare context: React.ContextType<typeof MapContext>

  override state = {
    streetViewService: null,
  }

  setStreetViewServiceCallback = (): void => {
    if (this.state.streetViewService !== null && this.props.onLoad) {
      this.props.onLoad(this.state.streetViewService)
    }
  }

  override componentDidMount(): void {
    const streetViewService = new google.maps.StreetViewService()

    this.setState(function setStreetViewService() {
      return {
        streetViewService,
      }
    }, this.setStreetViewServiceCallback)
  }

  override componentWillUnmount(): void {
    if (this.state.streetViewService !== null && this.props.onUnmount) {
      this.props.onUnmount(this.state.streetViewService)
    }
  }

  override render(): null {
    return null
  }
}

export default StreetViewService
