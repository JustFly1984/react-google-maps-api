import * as React from "react"

import * as invariant from "invariant"

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "../../utils/helper"

import MapContext from "../../map-context"

const eventMap = {
  onDblClick: "dblclick",
  onClick: "click"
}

const updaterMap = {
  opacity(instance: google.maps.GroundOverlay, opacity: number) {
    instance.setOpacity(opacity)
  }
}

interface GroundOverlayState {
  groundOverlay: google.maps.GroundOverlay | null
}

interface GroundOverlayProps {
  options?: google.maps.GroundOverlayOptions
  opacity?: number
  onDblClick?: (e: MouseEvent) => void
  onClick?: (e: MouseEvent) => void
  url: string
  bounds: google.maps.LatLngBounds
  onLoad: (groundOverlay: google.maps.GroundOverlay) => void
}

export class GroundOverlay extends React.PureComponent<
  GroundOverlayProps,
  GroundOverlayState
> {
  public static defaultProps = {
    onLoad: () => {}
  }
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: GroundOverlayState = {
    groundOverlay: null
  }

  constructor(
    props: GroundOverlayProps,
    context: React.Context<google.maps.Map>
  ) {
    super(props, context)

    invariant(
      !this.props.url || !this.props.bounds,
      `For GroundOveray, url and bounds are passed in to constructor and are immutable after instantiated. This is the behavior of Google Maps JavaScript API v3 ( See https://developers.google.com/maps/documentation/javascript/reference#GroundOverlay) Hence, use the corresponding two props provided by \`react-google-maps-api\`, url and bounds. In some cases, you'll need the GroundOverlay component to reflect the changes of url and bounds. You can leverage the React's key property to remount the component. Typically, just \`key={url}\` would serve your need. See https://github.com/tomchentw/react-google-maps/issues/655`
    )
  }

  componentDidMount = () => {
    const groundOverlay = new google.maps.GroundOverlay(
      this.props.url,
      this.props.bounds,
      {
        ...this.props.options,
        map: this.context
      }
    )

    this.setState(
      () => {
        groundOverlay
      },
      () => {
        if (this.state.groundOverlay !== null) {
          this.props.onLoad(this.state.groundOverlay)
        }
      }
    )
  }

  componentDidUpdate = (prevProps: GroundOverlayProps) => {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.groundOverlay
    })
  }

  componentWillUnmount = () => {
    if (this.state.groundOverlay) {
      this.state.groundOverlay.setMap(null)
    }
  }

  render() {
    return null
  }
}

export default GroundOverlay
