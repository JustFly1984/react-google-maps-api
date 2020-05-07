import * as React from 'react'

import invariant from 'invariant'

import { unregisterEvents, applyUpdatersToPropsAndRegisterEvents } from '../../utils/helper'

import MapContext from '../../map-context'
import { noop } from '../../utils/noop'

const eventMap = {
  onDblClick: 'dblclick',
  onClick: 'click',
}

const updaterMap = {
  opacity(instance: google.maps.GroundOverlay, opacity: number): void {
    instance.setOpacity(opacity)
  },
}

interface GroundOverlayState {
  groundOverlay: google.maps.GroundOverlay | null
}

export interface GroundOverlayProps {
  options?: google.maps.GroundOverlayOptions
  /** The opacity of the overlay, expressed as a number between 0 and 1. Optional. Defaults to 1. */
  opacity?: number
  /** This event is fired when the DOM dblclick event is fired on the GroundOverlay. */
  onDblClick?: (e: google.maps.MouseEvent) => void
  /** This event is fired when the DOM click event is fired on the GroundOverlay. */
  onClick?: (e: google.maps.MouseEvent) => void
  /** The url of the projected image */
  url: string
  /** The bounds that the image will be scaled to fit */
  bounds: google.maps.LatLngBounds
  /** This callback is called when the groundOverlay instance has loaded. It is called with the groundOverlay instance. */
  onLoad?: (groundOverlay: google.maps.GroundOverlay) => void
  /** This callback is called when the component unmounts. It is called with the groundOverlay instance. */
  onUnmount?: (groundOverlay: google.maps.GroundOverlay) => void
}

export class GroundOverlay extends React.PureComponent<GroundOverlayProps, GroundOverlayState> {
  public static defaultProps = {
    onLoad: noop,
  }

  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: GroundOverlayState = {
    groundOverlay: null,
  }

  setGroundOverlayCallback = (): void => {
    if (this.state.groundOverlay !== null && this.props.onLoad) {
      this.props.onLoad(this.state.groundOverlay)
    }
  }

  componentDidMount(): void {
    invariant(
      !!this.props.url || !!this.props.bounds,
      `For GroundOverlay, url and bounds are passed in to constructor and are immutable after instantiated. This is the behavior of Google Maps JavaScript API v3 ( See https://developers.google.com/maps/documentation/javascript/reference#GroundOverlay) Hence, use the corresponding two props provided by \`react-google-maps-api\`, url and bounds. In some cases, you'll need the GroundOverlay component to reflect the changes of url and bounds. You can leverage the React's key property to remount the component. Typically, just \`key={url}\` would serve your need. See https://github.com/tomchentw/react-google-maps/issues/655`
    )

    const groundOverlay = new google.maps.GroundOverlay(this.props.url, this.props.bounds, {
      ...this.props.options,
      map: this.context,
    })

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: groundOverlay,
    })

    this.setState(function setGroundOverlay() {
      return {
        groundOverlay,
      }
    }, this.setGroundOverlayCallback)
  }

  componentDidUpdate(prevProps: GroundOverlayProps): void {
    if (this.state.groundOverlay !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.groundOverlay,
      })
    }
  }

  componentWillUnmount(): void {
    if (this.state.groundOverlay) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.groundOverlay)
      }

      this.state.groundOverlay.setMap(null)
    }
  }

  render(): React.ReactNode {
    return null
  }
}

export default GroundOverlay
