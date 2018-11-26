/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  construct,
  componentDidMount,
  componentDidUpdate,
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

    construct(
      DirectionsRendererPropTypes,
      updaterMap,
      props,
      directionsRenderer
    )

    directionsRenderer.setMap(context[MAP])

    this.state = {
      [DIRECTIONS_RENDERER]: directionsRenderer,
    }

    this.getDirections = this.getDirections.bind(this)
    this.getMap = this.getMap.bind(this)
    this.getPanel = this.getPanel.bind(this)
    this.getRouteIndex = this.getRouteIndex.bind(this)
  }

  componentDidMount () {
    componentDidMount(this, this.state[DIRECTIONS_RENDERER], eventMap)
  }

  componentDidUpdate (prevProps) {
    componentDidUpdate(this, this.state[DIRECTIONS_RENDERER], eventMap, updaterMap, prevProps)
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const directionsRenderer = this.state[DIRECTIONS_RENDERER]

    if (directionsRenderer) {
      directionsRenderer.setMap(null)
    }
  }

  render () {
    return false
  }

  getDirections () {
    return this.state[DIRECTIONS_RENDERER].getDirections()
  }

  getMap () {
    return this.state[DIRECTIONS_RENDERER].getMap()
  }

  getPanel () {
    return this.state[DIRECTIONS_RENDERER].getPanel()
  }

  getRouteIndex () {
    return this.state[DIRECTIONS_RENDERER].getRouteIndex()
  }
}

export default DirectionsRenderer
