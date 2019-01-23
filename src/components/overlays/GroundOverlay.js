/* global google */
import { PureComponent } from 'react'
import warning from 'warning'
import { GroundOverlayPropTypes } from '../../proptypes'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/helper'

import MapContext from '../../map-context'

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

  constructor (props, context) {
    super(props, context)

    warning(
      !this.props.url || !this.props.bounds,
      `For GroundOveray, url and bounds are passed in to constructor and are immutable after instantiated. This is the behavior of Google Maps JavaScript API v3 ( See https://developers.google.com/maps/documentation/javascript/reference#GroundOverlay) Hence, use the corresponding two props provided by \`react-google-maps\`. They're prefixed with _default_ (defaultUrl, defaultBounds). In some cases, you'll need the GroundOverlay component to reflect the changes of url and bounds. You can leverage the React's key property to remount the component. Typically, just \`key={url}\` would serve your need. See https://github.com/tomchentw/react-google-maps/issues/655`
    )

    this.state = {
      groundOverlay: new google.maps.GroundOverlay(
        props.url,
        props.bounds,
        Object.assign(
          {
            map: context
          },
          props.options
        )
      )
    }

    this.registeredEvents = []
  }

  componentDidUpdate (prevProps) {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.groundOverlay
    })
  }

  componentWillUnmount () {
    if (this.state.groundOverlay) {
      this.state.groundOverlay.setMap(null)
    }
  }

  render () {
    return <></>
  }

  getBounds () {
    return this.state.groundOverlay.getBounds()
  }

  getMap () {
    return this.state.groundOverlay.getMap()
  }

  getOpacity () {
    return this.state.groundOverlay.getOpacity()
  }

  getUrl () {
    return this.state.groundOverlay.getUrl()
  }
}

export default GroundOverlay
