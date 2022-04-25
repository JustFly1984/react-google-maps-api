import { type CSSProperties, memo } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, TrafficLayer } from '@react-google-maps/api'

const ExampleTrafficPropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
  }).isRequired,
}

const center: google.maps.LatLngLiteral = {
  lat: 0,
  lng: -180,
}

const onClick = (...args: any[]) => {
  console.log('onClick args: ', args)
}

interface Props {
  styles: {
    container: CSSProperties | undefined
  }
}

function ExampleTraffic({ styles }: Props): JSX.Element {
  return (
    <div className='map'>
      <div className='map-container'>
        <GoogleMap
          id='traffic-example'
          mapContainerStyle={styles.container}
          zoom={2}
          center={center}
          onClick={onClick}
        >
          <TrafficLayer />
        </GoogleMap>
      </div>
    </div>
  )
}

ExampleTraffic.propTypes = ExampleTrafficPropTypes

export default memo(ExampleTraffic)
