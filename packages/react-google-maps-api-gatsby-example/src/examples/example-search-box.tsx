import { type CSSProperties, memo } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, StandaloneSearchBox } from '@react-google-maps/api'

const ExampleSearchBoxPropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
  }).isRequired,
}

const center: google.maps.LatLngLiteral = {
  lat: 0,
  lng: -180,
}

const inputStyle: CSSProperties = {
  boxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `240px`,
  height: `32px`,
  padding: `0 12px`,
  borderRadius: `3px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
  position: 'absolute',
  top: '10px',
  right: '10px',
}

const onClick = (...args: any[]) => {
  console.log('onClick args: ', args)
}

interface Props {
  styles: {
    container: CSSProperties | undefined
  }
}

function ExampleSearchBox({ styles }: Props): JSX.Element{
  return (
    <div className='map'>
      <div className='map-container'>
        <GoogleMap
          id='search-box-example'
          mapContainerStyle={styles.container}
          zoom={2}
          center={center}
          onClick={onClick}
        >
          <StandaloneSearchBox>
            <input
              type='text'
              placeholder='Customized your placeholder'
              style={inputStyle}
            />
          </StandaloneSearchBox>
        </GoogleMap>
      </div>
    </div>
  )
}

ExampleSearchBox.propTypes = ExampleSearchBoxPropTypes

export default memo(ExampleSearchBox)
