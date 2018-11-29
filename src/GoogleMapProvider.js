/* global google */
import React, { PureComponent } from 'react'
import { GoogleMapProviderPropTypes } from './proptypes'
import { LoadScriptContextConsumer } from './loadscriptcontext'
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

  render = () => (
    <LoadScriptContextConsumer>
      {
        loaded => loaded
          ? this.props.render({
            map: this.state.map,
            mapRef: this.getRef
          })
          : this.props.loadingElement
      }
    </LoadScriptContextConsumer>
  )
}

export default GoogleMapProvider
