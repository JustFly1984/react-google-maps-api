/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import warning from 'warning'

import {
  construct,
  componentDidMount,
  componentDidUpdate,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { MAP, GROUND_LAYER } from '../../constants'
import { GroundOverlayPropTypes } from '../../proptypes'

const eventMap = {
  onDblClick: 'dblclick',
  onClick: 'click',
}

const updaterMap = {
  map (instance, map) {
    instance.setMap(map)
  },
  opacity (instance, opacity) {
    instance.setOpacity(opacity)
  },
}

export class GroundOverlay extends PureComponent {
  static propTypes = GroundOverlayPropTypes

  static contextTypes = {
    [MAP]: PropTypes.object,
  }

  constructor (props, context) {
    super(props, context)

    warning(
      !props.url || !props.bounds,
      `
For GroundOveray, url and bounds are passed in to constructor and are immutable
 after iinstantiated. This is the behavior of Google Maps JavaScript API v3 (
 See https://developers.google.com/maps/documentation/javascript/reference#GroundOverlay)
 Hence, use the corresponding two props provided by \`react-google-maps\`.
 They're prefixed with _default_ (defaultUrl, defaultBounds).

 In some cases, you'll need the GroundOverlay component to reflect the changes
 of url and bounds. You can leverage the React's key property to remount the
 component. Typically, just \`key={url}\` would serve your need.
 See https://github.com/tomchentw/react-google-maps/issues/655
`
    )

    const groundOverlay = new google.maps.GroundOverlay(
      props.defaultUrl || props.url,
      props.defaultBounds || props.bounds,
      props.options
    )

    construct(
      GroundOverlayPropTypes,
      updaterMap,
      props,
      groundOverlay
    )

    groundOverlay.setMap(context[MAP])

    this.state = {
      [GROUND_LAYER]: groundOverlay,
    }

    this.getBounds = this.getBounds.bind(this)
    this.getMap = this.getMap.bind(this)
    this.getOpacity = this.getOpacity.bind(this)
    this.getUrl = this.getUrl.bind(this)
  }

  componentDidMount () {
    componentDidMount(this, this.state[GROUND_LAYER], eventMap)
  }

  componentDidUpdate (prevProps) {
    componentDidUpdate(this, this.state[GROUND_LAYER], eventMap, updaterMap, prevProps)
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const GroundOverlay = this.state[GROUND_LAYER]

    if (GroundOverlay) {
      GroundOverlay.setMap(null)
    }
  }

  render () {
    return false
  }

  getBounds () {
    return this.state[GROUND_LAYER].getBounds()
  }

  getMap () {
    return this.state[GROUND_LAYER].getMap()
  }

  getOpacity () {
    return this.state[GROUND_LAYER].getOpacity()
  }

  getUrl () {
    return this.state[GROUND_LAYER].getUrl()
  }
}

export default GroundOverlay
