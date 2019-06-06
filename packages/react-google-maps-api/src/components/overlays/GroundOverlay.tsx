import * as React from "react"

import invariant from "invariant"

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
  groundOverlay: google.maps.GroundOverlay | null;
}

export interface GroundOverlayProps {
  options?: google.maps.GroundOverlayOptions;
  opacity?: number;
  onDblClick?: (e: google.maps.MouseEvent) => void;
  onClick?: (e: google.maps.MouseEvent) => void;
  url: string;
  bounds: google.maps.LatLngBounds;
  onLoad?: (groundOverlay: google.maps.GroundOverlay) => void;
  onUnmount?: (groundOverlay: google.maps.GroundOverlay) => void;
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

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  setGroundOverlayCallback = () => {
    if (this.state.groundOverlay !== null && this.props.onLoad) {
      this.props.onLoad(this.state.groundOverlay)
    }
  }

  componentDidMount() {
    console.log('this.props.url: ', this.props.url)
    console.log('this.props.bounds: ', this.props.bounds)
    invariant(
      !!this.props.url || !!this.props.bounds,
      `For GroundOveray, url and bounds are passed in to constructor and are immutable after instantiated. This is the behavior of Google Maps JavaScript API v3 ( See https://developers.google.com/maps/documentation/javascript/reference#GroundOverlay) Hence, use the corresponding two props provided by \`react-google-maps-api\`, url and bounds. In some cases, you'll need the GroundOverlay component to reflect the changes of url and bounds. You can leverage the React's key property to remount the component. Typically, just \`key={url}\` would serve your need. See https://github.com/tomchentw/react-google-maps/issues/655`
    )

    const groundOverlay = new google.maps.GroundOverlay(
      this.props.url,
      this.props.bounds,
      {
        ...this.props.options,
        map: this.context
      }
    )

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: groundOverlay
    })

    function setGroundOverlay() {
      return {
        groundOverlay
      }
    }

    this.setState(
      setGroundOverlay,
      this.setGroundOverlayCallback
    )
  }

  componentDidUpdate(prevProps: GroundOverlayProps) {
    if (this.state.groundOverlay !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.groundOverlay
      })
    }
  }

  componentWillUnmount() {
    if (this.state.groundOverlay) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.groundOverlay)
      }

      this.state.groundOverlay.setMap(null)
    }
  }

  render() {
    return null
  }
}

export default GroundOverlay
