import { PureComponent, Context } from "react"
// @ts-ignore
import warning from "warning"

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
  groundOverlay?: google.maps.GroundOverlay
}

interface GroundOverlayProps {
  options?: google.maps.GroundOverlayOptions
  opacity?: number
  onDblClick?: (e: MouseEvent) => void
  onClick?: (e: MouseEvent) => void
  url?: string
  bounds: google.maps.LatLngBounds
}

export class GroundOverlay extends PureComponent<
  GroundOverlayProps,
  GroundOverlayState
> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: GroundOverlayState = {
    groundOverlay: null
  }

  constructor(props: GroundOverlayProps, context: Context<google.maps.Map>) {
    super(props, context)

    warning(
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

    this.setState({ groundOverlay })
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

  render = () => null

  getBounds = () => this.state.groundOverlay.getBounds()

  getMap = () => this.state.groundOverlay.getMap()

  getOpacity = () => this.state.groundOverlay.getOpacity()

  getUrl = () => this.state.groundOverlay.getUrl()
}

export default GroundOverlay
