/* global google */
import { PureComponent } from 'react'
import warning from 'warning'
import { GroundOverlayPropTypes } from '../../proptypes'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/MapChildHelper'

import MapContext from '../../mapcontext'

const eventMap = {
  onDblClick: 'dblclick',
  onClick: 'click',
}

const updaterMap = {
  opacity (map, opacity) {
    map.setOpacity(opacity)
  },
}

export class GroundOverlay extends PureComponent {
  static propTypes = GroundOverlayPropTypes

  static contextType = MapContext

  registeredEvents = []

  state = {
    groundOverlay: null
  }

  constructor (props, context) {
    super(props, context)

    warning(
      !this.props.url || !this.props.bounds,
      `For GroundOveray, url and bounds are passed in to constructor and are immutable after iinstantiated. This is the behavior of Google Maps JavaScript API v3 ( See https://developers.google.com/maps/documentation/javascript/reference#GroundOverlay) Hence, use the corresponding two props provided by \`react-google-maps\`. They're prefixed with _default_ (defaultUrl, defaultBounds). In some cases, you'll need the GroundOverlay component to reflect the changes of url and bounds. You can leverage the React's key property to remount the component. Typically, just \`key={url}\` would serve your need. See https://github.com/tomchentw/react-google-maps/issues/655`
    )
  }

  componentDidMount = () => {
    const groundOverlay = new google.maps.GroundOverlay(
      this.props.url,
      new google.maps.LatLngBounds(
        new google.maps.LatLng(
          this.props.bounds[0].x,
          this.props.bounds[0].y
        ),
        new google.maps.LatLng(
          this.props.bounds[1].x,
          this.props.bounds[1].y
        )
      ),
      Object.assign({
        map: this.context
      },
      this.props.options
      )
    )

    this.setState(
      () => ({
        groundOverlay
      })
    )
  }

  componentDidUpdate = prevProps => {
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

  getBounds = () =>
    this.state.groundOverlay.getBounds()

  getMap = () =>
    this.state.groundOverlay.getMap()

  getOpacity = () =>
    this.state.groundOverlay.getOpacity()

  getUrl = () =>
    this.state.groundOverlay.getUrl()
}

export default GroundOverlay
