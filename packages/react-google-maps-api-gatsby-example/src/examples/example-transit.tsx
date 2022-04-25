import { type CSSProperties, memo} from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, TransitLayer } from '@react-google-maps/api'

const ExampleTransitPropTypes = {
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

const onTransitLayerLoad = (transitLayer: google.maps.TransitLayer) => {
  // Do something with transitLayer
  console.log('transitLayer: ', transitLayer)
}

const onMapLoad = (map: google.maps.Map) => {
  console.log('map: ', map)
}

interface Props {
  styles: {
    container: CSSProperties | undefined
  }
}

function ExampleTransit({ styles }: Props): JSX.Element {
  return (
    <div className='map'>
      <div className='map-container'>
        <GoogleMap
          id='transit-example'
          mapContainerStyle={styles.container}
          zoom={2}
          center={center}
          onClick={onClick}
          onLoad={onMapLoad}
        >
          <TransitLayer onLoad={onTransitLayerLoad} />
        </GoogleMap>
      </div>
    </div>
  )
}

ExampleTransit.propTypes = ExampleTransitPropTypes

export default memo(ExampleTransit)
