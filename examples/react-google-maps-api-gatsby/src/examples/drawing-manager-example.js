import React from 'react'
import { GoogleMapProvider, GoogleMap, DrawingManager } from '../../../../src'

export default class DrawingManagerExample extends React.Component {
  render () {
    const { styles } = this.props

    return (
      <div>
        <GoogleMapProvider
          id='drawing-manager-example'
          mapContainerStyle={styles.container}
          mapContainerClassName={styles.mapContainer}
        >
          <GoogleMap zoom={2} center={{ lat: 0, lng: -180 }}>
            <DrawingManager />
          </GoogleMap>
        </GoogleMapProvider>
      </div>
    )
  }
}
