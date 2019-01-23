/* global google */
import { PureComponent } from 'react'

import MapContext from '../../map-context'

const StreetViewServicePropTypes = {}

export class StreetViewService extends PureComponent {
  static propTypes = StreetViewServicePropTypes

  static contextType = MapContext

  constructor (props, context) {
    super(props, context)

    this.state = {
      streetViewService: new google.maps.StreetViewService()
    }
  }

  render () {
    return <></>
  }

  getPanorama () {
    return this.state.streetViewService.getPanorama()
  }
}

export default StreetViewService
