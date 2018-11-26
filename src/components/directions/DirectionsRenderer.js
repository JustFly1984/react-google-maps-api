/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  construct,
  getDerivedStateFromProps,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { MAP, DIRECTIONS_RENDERER } from '../../constants'
import { DirectionsRendererPropTypes } from '../../proptypes'

const eventMap = {
  onDirectionsChanged: 'directions_changed',
}

const updaterMap = {
  directions (instance, directions) {
    instance.setDirections(directions)
  },
  map (instance, map) {
    instance.setMap(map)
  },
  options (instance, options) {
    instance.setOptions(options)
  },
  panel (instance, panel) {
    instance.setPanel(panel)
  },
  routeIndex (instance, routeIndex) {
    instance.setRouteIndex(routeIndex)
  },
}

export class DirectionsRenderer extends PureComponent {
  static propTypes = DirectionsRendererPropTypes

  static contextTypes = {
    [MAP]: PropTypes.object,
  }

  constructor (props, context) {
    super(props, context)

    const directionsRenderer = new google.maps.DirectionsRenderer(
      props.options
    )

    directionsRenderer.setMap(context[MAP])

    this.state = {
      [DIRECTIONS_RENDERER]: directionsRenderer,
      prevProps: construct(
        DirectionsRendererPropTypes,
        updaterMap,
        props,
        directionsRenderer
      )
    }
  }

  static getDerivedStateFromProps (props, state) {
    return getDerivedStateFromProps(
      props,
      state,
      this.state[DIRECTIONS_RENDERER],
      eventMap,
      updaterMap
    )
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const directionsRenderer = this.state[DIRECTIONS_RENDERER]

    if (directionsRenderer) {
      directionsRenderer.setMap(null)
    }
  }

  render () {
    return null
  }

  getDirections = () =>
    this.state[DIRECTIONS_RENDERER].getDirections()

  getMap = () =>
    this.state[DIRECTIONS_RENDERER].getMap()

  getPanel = () =>
    this.state[DIRECTIONS_RENDERER].getPanel()

  getRouteIndex = () =>
    this.state[DIRECTIONS_RENDERER].getRouteIndex()
}

export default DirectionsRenderer
