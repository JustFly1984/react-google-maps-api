import { type CSSProperties, memo } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap } from '@react-google-maps/api'

const ExampleOptionsPropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
  }).isRequired,
}

const center: google.maps.LatLngLiteral = {
  lat: 0,
  lng: -180,
}

// Reference for options:
// https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions

const options = {
  streetViewControl: false,
}

const onClick = (...args: any[]) => {
  console.log('onClick args: ', args)
}

interface Props {
  styles: {
    container: CSSProperties | undefined
  }
}

function ExampleOptions({ styles }: Props): JSX.Element {
  return (
    <div className='map'>
      <div className='map-container'>
        <GoogleMap
          id='options-example'
          mapContainerStyle={styles.container}
          zoom={2}
          center={center}
          options={options}
          onClick={onClick}
        />
      </div>
    </div>
  )
}

ExampleOptions.propTypes = ExampleOptionsPropTypes

export default memo(ExampleOptions)
