import * as React from 'react'
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
  border: `1px solid #CCC`,
  padding: 15,
}

const centerOverlayView = (width, height) => ({
  x: -(width / 2),
  y: -(height / 2),
})

function ExampleOverlayView({ styles }) {
  const [isShown, setIsShown] = React.useState(false)

  const changeIsShown = React.useCallback(() => {
    setIsShown(!isShown)
  }, [isShown])
  const [overlayPane, setOverlayPane] = React.React.useState(
    OverlayView.OVERLAY_MOUSE_TARGET
  )
  const clickHandler = React.React.useCallback(() => {
    alert('You clicked overlay view')
  }, [])
  const [overlayPosition, setOverlayPosition] = React.React.useState(mapCenter)
  const randomOverlayPosition = React.React.useCallback(() => {
    setOverlayPosition({
      lat: mapCenter.lat + Math.random() * -10 + 20,
      lng: mapCenter.lng + Math.random() * -10 + 20,
    })
  }, [])
  const loadCallback = React.React.useCallback((e) => {
    console.log('OverlayView onLoad: ', e)
  }, [])
  const unmountCallback = React.React.useCallback((e) => {
    console.log('OverlayView onUnmount', e)
  }, [])
  const setToMarkerLayerPane = React.React.useCallback(() => {
    setOverlayPane(OverlayView.MARKER_LAYER)
  }, [])
  const setToMouseTargetPane = React.React.useCallback(() => {
    setOverlayPane(OverlayView.OVERLAY_MOUSE_TARGET)
  }, [])

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
              position={overlayPosition}
              mapPaneName={overlayPane}
              onLoad={loadCallback}
              onUnmount={unmountCallback}
              getPixelPositionOffset={centerOverlayView}
            >
              <button
                type='button'
                style={contentStyles}
                onClick={clickHandler}
              >
                <h1>OverlayView</h1>
              </button>
            </OverlayView>
          )}
        </GoogleMap>
      </div>

      <div className='form-group custom-control custom-radio'>
        <input
          id='MARKER_LAYER'
          className='custom-control-input'
          type='radio'
          name='overlayPane'
          checked={overlayPane === OverlayView.MARKER_LAYER}
          onChange={setToMarkerLayerPane}
        />
        <label className='custom-control-label' htmlFor='MARKER_LAYER'>
          Mount to markerLayer(can&apos;t receive DOM event)
        </label>
      </div>
      <div className='form-group custom-control custom-radio'>
        <input
          id='OVERLAY_MOUSE_TARGET'
          className='custom-control-input'
          type='radio'
          name='overlayPane'
          checked={overlayPane === OverlayView.OVERLAY_MOUSE_TARGET}
          onChange={setToMouseTargetPane}
        />
        <label className='custom-control-label' htmlFor='OVERLAY_MOUSE_TARGET'>
          Mount to overlay overlayMouseTarget
        </label>
      </div>

      <button
        className='btn btn-primary'
        type='button'
        onClick={randomOverlayPosition}
      >
        Change overlay position
      </button>
    </div>
  )
}

ExampleOverlayView.propTypes = ExampleOverlayViewPropTypes

export default React.memo(ExampleOverlayView)
