import { type CSSProperties, memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, GroundOverlay } from '@react-google-maps/api'

const ExampleGroundPropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
  }).isRequired,
}

const center: google.maps.LatLngLiteral = {
  lat: 40.74,
  lng: -74.18,
}

const BoundsLiteral: google.maps.LatLngBoundsLiteral = {
  north: 40.773941,
  south: 40.712216,
  east: -74.12544,
  west: -74.22655,
}

const onClick = (...args: any[]) => {
  console.log('onClick args: ', args)
}

interface Props {
  styles: {
    container: CSSProperties | undefined
  }
}

function GroundOverlayC(): JSX.Element {
  const BOUNDS = useMemo(() => {
    return new google.maps.LatLngBounds().union(BoundsLiteral)
  }, [])

  return (
    <GroundOverlay
    url='https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg'
    bounds={BOUNDS}
  />
  )
}

const GroundOverlayComponent = memo(GroundOverlayC)

function ExampleGround({ styles }: Props): JSX.Element{
  return (
    <div className='map'>
      <div className='map-container'>
        <GoogleMap
          id='ground-example'
          mapContainerStyle={styles.container}
          zoom={13}
          center={center}
          onClick={onClick}
        >
          <GroundOverlayComponent />
        </GoogleMap>
      </div>
    </div>
  )
}

ExampleGround.propTypes = ExampleGroundPropTypes

export default memo(ExampleGround)
