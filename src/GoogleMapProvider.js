/* global google */
import { PureComponent } from 'react'
import { GoogleMapProviderPropTypes } from './proptypes'

export class GoogleMapProvider extends PureComponent {
  static propTypes = GoogleMapProviderPropTypes

  state = {
    map: null
  }

  componentDidMount = () => {
    console.log(`Provider id ${this.props.id} did mount`)
  }

  getRef = ref => {
    this.setState(
      () => ({
        map: new google.maps.Map(ref)
      })
    )
  }

  render = () =>
    this.props.loaded
      ? this.props.render({
        map: this.state.map,
        mapRef: this.getRef
      })
      : this.props.loadingElement
}

export default GoogleMapProvider
