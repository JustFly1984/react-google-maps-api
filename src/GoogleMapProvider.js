/* global google */
import React, { PureComponent } from 'react'
import { GoogleMapProviderPropTypes } from './proptypes'
import MapContext from './mapcontext'
export class GoogleMapProvider extends PureComponent {
  static propTypes = GoogleMapProviderPropTypes

  state = {
    map: null
  }

  // componentDidMount = () => {
  //   console.log(`Provider id ${this.props.id} did mount`)
  // }

  getRef = ref => {
    this.setState(
      () => ({
        map: new google.maps.Map(ref)
      })
    )
  }

  render = () => (
    <div
      ref={this.getRef}
      style={this.props.mapContainerStyle}
      className={this.props.mapContainerClassName}
    >
      <MapContext.Provider
        value={this.state.map}
      >
        {
          this.state.map && this.props.children
        }
      </MapContext.Provider>
    </div>
  )
}

export default GoogleMapProvider
