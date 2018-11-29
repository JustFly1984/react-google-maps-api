/* global google */
import React, { PureComponent } from 'react'
import { GoogleMapProviderPropTypes } from './proptypes'
import { LoadScriptContext } from './loadscriptcontext'
export class GoogleMapProvider extends PureComponent {
  static propTypes = GoogleMapProviderPropTypes

  static contextType = LoadScriptContext

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
    this.context
      ? React.cloneElement(
        this.props.children, {
          map: this.state.map,
          mapRef: this.getRef
        })
      : this.props.loadingElement
}

export default GoogleMapProvider
