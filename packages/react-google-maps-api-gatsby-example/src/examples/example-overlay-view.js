import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, OverlayView, Marker } from '@react-google-maps/api'

const ExampleOverlayViewPropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
  }).isRequired,
}

const mapCenter = {
  lat: 0,
  lng: -180,
}

const contentStyles = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15,
}

const centerOverlayView = (width, height) => ({
  x: -(width / 2),
  y: -(height / 2),
})

const ExampleOverlayView = ({ styles }) => {
  const [isShown, setIsShown] = useState(false)

  const changeIsShown = useCallback(() => {
    setIsShown(!isShown)
  }, [isShown])

  return (
    <div className='map'>
      <div className='map-container'>
        <GoogleMap
          id='traffic-example'
          mapContainerStyle={styles.container}
          zoom={2}
          center={mapCenter}
        >
          <Marker position={mapCenter} onClick={changeIsShown} />
          {isShown && (
            <OverlayView
              position={mapCenter}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              getPixelPositionOffset={centerOverlayView}
            >
              <div style={contentStyles}>
                <h1>OverlayView</h1>
              </div>
            </OverlayView>
          )}
        </GoogleMap>
      </div>
    </div>
  )
}

ExampleOverlayView.propTypes = ExampleOverlayViewPropTypes

export default ExampleOverlayView
