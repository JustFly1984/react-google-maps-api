import { type CSSProperties, memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMap,
  HeatmapLayer
} from '@react-google-maps/api'

const ExampleHeatmapPropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired
  }).isRequired
}

const center: google.maps.LatLngLiteral = {
  lat: 37.774546,
  lng: -122.433523
}

const onClick = (...args: any[]) => {
  console.log('onClick args: ', args)
}

interface Props {
  styles: {
    container: CSSProperties | undefined
  }
}

function ExampleHeatmap({ styles }: Props): JSX.Element{
  const data = useMemo(() => {
    return [
      new google.maps.LatLng(37.782, -122.447),
      new google.maps.LatLng(37.782, -122.445),
      new google.maps.LatLng(37.782, -122.443),
      new google.maps.LatLng(37.782, -122.441),
      new google.maps.LatLng(37.782, -122.439),
      new google.maps.LatLng(37.782, -122.437),
      new google.maps.LatLng(37.782, -122.435),
      new google.maps.LatLng(37.785, -122.447),
      new google.maps.LatLng(37.785, -122.445),
      new google.maps.LatLng(37.785, -122.443),
      new google.maps.LatLng(37.785, -122.441),
      new google.maps.LatLng(37.785, -122.439),
      new google.maps.LatLng(37.785, -122.437),
      new google.maps.LatLng(37.785, -122.435)
    ]
  }, [])

  return (
    <div className='map'>
      <div className='map-container'>
        <GoogleMap
          id='heatmap-example'
          mapContainerStyle={styles.container}
          zoom={13}
          center={center}
          onClick={onClick}
        >
          <HeatmapLayer data={data} />
        </GoogleMap>
      </div>
    </div>
  )
}

ExampleHeatmap.propTypes = ExampleHeatmapPropTypes

export default memo(ExampleHeatmap)
