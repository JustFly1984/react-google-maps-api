import React, { PureComponent } from 'react'
//import { MapPropTypes } from './proptypes'
import { GoogleMapProvider, GoogleMap, LoadScript } from './'

class Map extends PureComponent {
  //static propTypes = MapPropTypes

  render = () => {
    return (
      <LoadScript
        id={this.props.loadScriptId}
        googleMapsApiKey={this.props.googleMapsApiKey}
        language={this.props.language}
        region={this.props.region}
        version={this.props.version}
        onLoad={this.props.onScriptLoad}
        loadingElement={this.props.loadingElement}
      >
        <GoogleMapProvider
          mapContainerStyle={this.props.mapContainerStyle}
          mapContainerClassName={this.props.mapContainerClassName}
        >
          <GoogleMap
            options={this.props.options}
            extraMapTypes={this.props.extraMapTypes}
            center={this.props.center}
            clickableIcons={this.props.clickableIcons}
            heading={this.props.heading}
            mapTypeId={this.props.mapTypeId}
            streetView={this.props.streetView}
            tilt={this.props.tilt}
            zoom={this.props.zoom}
            onDblClick={this.props.onDblClick}
          >
            {this.props.children}
          </GoogleMap>
        </GoogleMapProvider>
      </LoadScript>
    )
  }
}

export default Map
