/* global google */
import React, { PureComponent } from 'react'

import MapContext from '../../map-context'

import { DirectionsServicePropTypes } from '../../proptypes'

export class DirectionsService extends PureComponent {
  static propTypes = DirectionsServicePropTypes

  static contextType = MapContext

  constructor (props, context) {
    super(props, context)

    this.state = {
      directionsRenderer: new google.maps.DirectionsService()
    }
  }

  componentDidMount () {
    this.state.directionsService.route(
      this.props.options,
      this.props.callback
    )
  }

  componentDidUpdate () {
    this.state.directionsService.route(
      this.props.options,
      this.props.callback
    )
  }

  render () {
    return <></>
  }
}

export default DirectionsService
