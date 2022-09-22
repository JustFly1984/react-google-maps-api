import { type CSSProperties, memo, useCallback, useMemo, useState, ChangeEventHandler } from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMap,
  PolylineF,
  PolygonF,
  RectangleF,
  CircleF,
  MarkerF,
  OverlayViewF,
  InfoWindowF,
  OVERLAY_MOUSE_TARGET
} from '@react-google-maps/api'

// @ts-ignore
import pinIcon from '../assets/pin.svg'

const FLIGHT_PLAN_COORDS = [
  { lat: 37.772, lng: -122.214 },
  { lat: 21.291, lng: -157.821 },
  { lat: -18.142, lng: 178.431 },
  { lat: -27.467, lng: 153.027 },
]

const BRISBANE_COORDS = [
  { lat: -27.467, lng: 153.027 },
  { lat: -23.467, lng: 152.027 },
  { lat: -28.567, lng: 149.627 },
  { lat: -27.467, lng: 153.027 },
]

const SAN_FRANCISCO_COORDS = [
  { lat: 37.772, lng: -122.214 },
  { lat: 39.772, lng: -121.214 },
  { lat: 35.772, lng: -120.214 },
  { lat: 37.772, lng: -122.214 },
]

const RECTANGLE_BOUNDS = {
  north: 38.685,
  south: 33.671,
  east: -115.234,
  west: -118.251,
}

const POLYLINE_OPTIONS = {
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2,
}

const ExampleShapesPropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
  }).isRequired,
}

const mapCenter: google.maps.LatLngLiteral = {
  lat: 0,
  lng: -180,
}

const MARKER_POSITION: google.maps.LatLngLiteral = {
  lat: 37.772,
  lng: -122.214,
}

const OVERLAY_VIEW_POSITION: google.maps.LatLngLiteral = {
  lat: 35.772,
  lng: -120.214,
}

const INFO_WINDOW_POSITION: google.maps.LatLngLiteral = {
  lat: 33.772,
  lng: -117.214,
}

const brisbanePolygonOptions = {
  fillColor: '#00FF00',
  fillOpacity: 1,
  strokeColor: '#22FF22',
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  paths: BRISBANE_COORDS,
  zIndex: 1,
}

const sfPolygonOptions = {
  fillColor: '#FF5500',
  fillOpacity: 1,
  strokeColor: '#FF7700',
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  paths: SAN_FRANCISCO_COORDS,
  zIndex: 1,
}

const circleOptions: google.maps.CircleOptions = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  center: {
    lat: 34.052,
    lng: -118.243,
  },
  radius: 300000,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  zIndex: 1,
}

const textareaStyle = {
  minHeight: '6rem',
  maxHeight: '12rem',
  width: '100%',
  minWidth: '15rem',
  maxWidth: '40rem',
}

const infoWindowStyle = {
  background: `white`,
  border: `1px solid ##CCC`,
  padding: 15,
}

interface Props {
  styles: {
    container: CSSProperties | undefined
  }
}

function ExampleShapes({ styles }: Props): JSX.Element {
  const [polylineVisible, setPolylineVisible] = useState(true)
  const [polylineOptions, setPolylineOptions] = useState(
    JSON.stringify(POLYLINE_OPTIONS)
  )

  const onCheckboxChange = useCallback(() => {
    setPolylineVisible((bool) => !bool)
  }, [])

  const onTextAreaChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(({ target: { value } }) => {
    setPolylineOptions(value)
  }, [])

  const onClick = useCallback(() => {
    console.info('I have been clicked!')
  }, [])

  const po = useMemo(() => {
    try {
      return JSON.parse(polylineOptions)
    } catch (e) {
      return POLYLINE_OPTIONS
    }
  }, [polylineOptions])

  return (
    <div className='map'>
      <div className='map-settings'>
        <hr className='mt-0 mb-3' />

        <div className='custom-control custom-checkbox mb-3'>
          <input
            id='show-polyline-checkbox'
            className='custom-control-input'
            type='checkbox'
            checked={polylineVisible}
            onChange={onCheckboxChange}
          />
          <label
            className='custom-control-label'
            htmlFor='show-polyline-checkbox'
          >
            Show flight path
          </label>
        </div>

        <div className='form-group mb-4'>
          <label htmlFor='polyline-options-input'>
            Polyline options (valid JSON):
          </label>

          <textarea
            id='polyline-options-input'
            className='form-control'
            value={polylineOptions}
            style={textareaStyle}
            onChange={onTextAreaChange}
          />
        </div>
      </div>

      <div className='map-container'>
        <GoogleMap
          id='shapes-example'
          mapContainerStyle={styles.container}
          zoom={2}
          center={mapCenter}
        >
          {polylineVisible && (
            <PolylineF path={FLIGHT_PLAN_COORDS} options={po} />
          )}

          <PolygonF path={BRISBANE_COORDS} options={brisbanePolygonOptions} />

          <PolygonF path={SAN_FRANCISCO_COORDS} options={sfPolygonOptions} />

          <RectangleF bounds={RECTANGLE_BOUNDS} />

          <CircleF options={circleOptions} />

          <MarkerF position={MARKER_POSITION} icon={pinIcon} />

          <OverlayViewF
            position={OVERLAY_VIEW_POSITION}
            mapPaneName={OVERLAY_MOUSE_TARGET}
          >
            <div style={infoWindowStyle}>
              <h1>OverlayView</h1>

              <button onClick={onClick} type='button'>
                I have been clicked
              </button>
            </div>
          </OverlayViewF>

          <InfoWindowF position={INFO_WINDOW_POSITION}>
            <div style={infoWindowStyle}>
              <h1>InfoWindow</h1>
            </div>
          </InfoWindowF>
        </GoogleMap>
      </div>
    </div>
  )
}

ExampleShapes.propTypes = ExampleShapesPropTypes

export default memo(ExampleShapes)
