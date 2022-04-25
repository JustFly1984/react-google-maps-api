import { type CSSProperties, memo } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, DrawingManager } from '@react-google-maps/api'

const center: google.maps.LatLngLiteral = {
  lat: 0,
  lng: -180,
}

const ExampleDrawingPropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
  }).isRequired,
}

interface Props {
  styles: {
    container: CSSProperties | undefined
  }
}

function ExampleDrawing({ styles }: Props): JSX.Element {
  return (
    <div className='map'>
      <div className='map-container'>
        <GoogleMap
          id='drawing-example'
          mapContainerStyle={styles.container}
          zoom={2}
          center={center}
        >
          <DrawingManager />
        </GoogleMap>
      </div>
    </div>
  )
}

ExampleDrawing.propTypes = ExampleDrawingPropTypes

export default memo(ExampleDrawing)
