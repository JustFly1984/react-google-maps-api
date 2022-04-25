import { type CSSProperties, memo, useMemo, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, Data } from '@react-google-maps/api'

const ExampleDataPropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
  }).isRequired,
}

const center: google.maps.LatLngLiteral = {
  lat: 38.805470223177466,
  lng: -118.76220703125,
}

const onClick = (...args: any[]) => {
  console.log(
    'onClick args: ',
    args[0].latLng.lat(),
    ' : ',
    args[0].latLng.lng()
  )
}

const onDataLoad = (data: google.maps.Data) => {
  console.log('data: ', data)
}

interface Props {
  styles: {
    container: CSSProperties | undefined
  }
}

function ExampleData({ styles }: Props) {
  const [map, setMap] = useState<google.maps.Map | null>(null)


  const onMapLoad = useCallback((map: google.maps.Map) => {
    console.log('map.data: ', map.data)
    // map.data.loadGeoJson('/geo.json')
    setMap(map)
  }, [])

  const dataOptions = useMemo<google.maps.Data.DataOptions | null>(() => {

    return map !== null ? {
      map,
    controlPosition: google.maps.ControlPosition.TOP_LEFT,
    controls: ['Point'],
    drawingMode: 'Point', //  "LineString" or "Polygon".
    featureFactory: (geometry: google.maps.Data.Geometry): google.maps.Data.Feature => {
      console.log('geometry: ', geometry)

      return new google.maps.Data.Feature({
        id: '1',
        geometry
      })
    }
  } : null}, [map])

  return (
    <div className='map'>
      <div className='map-container'>
        <GoogleMap
          id='data-example'
          mapContainerStyle={styles.container}
          zoom={5}
          center={center}
          onClick={onClick}
          onLoad={onMapLoad}
        >
          {dataOptions !== null ? (<Data onLoad={onDataLoad} options={dataOptions} />) : null}
        </GoogleMap>
      </div>
    </div>
  )
}

ExampleData.propTypes = ExampleDataPropTypes

export default memo(ExampleData)
