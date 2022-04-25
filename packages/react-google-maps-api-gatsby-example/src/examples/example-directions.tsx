import { CSSProperties, memo, useCallback, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api'

const ExampleDirectionsPropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
  }).isRequired,
}

const center: google.maps.LatLngLiteral = {
  lat: 0,
  lng: -180,
}

interface Props {
  styles: {
    container: CSSProperties | undefined
  }
}

function ExampleDirections({ styles }: Props): JSX.Element {
  const [response, setResponse] = useState(null)
  const [travelMode, setTravelMode] = useState<google.maps.TravelMode>(google.maps.TravelMode.DRIVING)
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const originRef = useRef<HTMLInputElement | null>(null)
  const destinationRef = useRef<HTMLInputElement | null>(null)

  const directionsCallback = useCallback((res) => {
    console.log(res)

    if (res !== null) {
      if (res.status === 'OK') {
        setResponse(res)
      } else {
        console.log('response: ', res)
      }
    }
  }, [])

  const checkDriving = useCallback(({ target: { checked } }) => {
    checked && setTravelMode(google.maps.TravelMode.DRIVING)
  }, [])

  const checkBicycling = useCallback(({ target: { checked } }) => {
    checked && setTravelMode(google.maps.TravelMode.BICYCLING)
  }, [])

  const checkTransit = useCallback(({ target: { checked } }) => {
    checked && setTravelMode(google.maps.TravelMode.TRANSIT)
  }, [])

  const checkWalking = useCallback(({ target: { checked } }) => {
    checked && setTravelMode(google.maps.TravelMode.WALKING)
  }, [])

  const onClick = useCallback(() => {
    if (originRef.current && originRef.current.value !== '' && destinationRef.current && destinationRef.current.value !== '') {
      setOrigin(originRef.current.value)

      setDestination(destinationRef.current.value)
    }
  }, [])

  const onMapClick = useCallback((...args) => {
    console.log('onClick args: ', args)
  }, [])

  const directionsServiceOptions = useMemo<google.maps.DirectionsRequest>(() => {
    return {
      destination: destination,
      origin: origin,
      travelMode: travelMode,
    }
  }, [])

  const directionsRendererOptions = useMemo(() => {
    return {
      directions: response,
    }
  }, [])

  return (
    <div className='map'>
      <div className='map-settings'>
        <hr className='mt-0 mb-3' />

        <div className='row'>
          <div className='col-md-6 col-lg-4'>
            <div className='form-group'>
              <label htmlFor='ORIGIN'>Origin</label>
              <br />
              <input
                id='ORIGIN'
                className='form-control'
                type='text'
                ref={originRef}
              />
            </div>
          </div>

          <div className='col-md-6 col-lg-4'>
            <div className='form-group'>
              <label htmlFor='DESTINATION'>Destination</label>
              <br />
              <input
                id='DESTINATION'
                className='form-control'
                type='text'
                ref={destinationRef}
              />
            </div>
          </div>
        </div>

        <div className='d-flex flex-wrap'>
          <div className='form-group custom-control custom-radio mr-4'>
            <input
              id='DRIVING'
              className='custom-control-input'
              name='travelMode'
              type='radio'
              checked={travelMode === 'DRIVING'}
              onChange={checkDriving}
            />
            <label className='custom-control-label' htmlFor='DRIVING'>
              Driving
            </label>
          </div>

          <div className='form-group custom-control custom-radio mr-4'>
            <input
              id='BICYCLING'
              className='custom-control-input'
              name='travelMode'
              type='radio'
              checked={travelMode === 'BICYCLING'}
              onChange={checkBicycling}
            />
            <label className='custom-control-label' htmlFor='BICYCLING'>
              Bicycling
            </label>
          </div>

          <div className='form-group custom-control custom-radio mr-4'>
            <input
              id='TRANSIT'
              className='custom-control-input'
              name='travelMode'
              type='radio'
              checked={travelMode === 'TRANSIT'}
              onChange={checkTransit}
            />
            <label className='custom-control-label' htmlFor='TRANSIT'>
              Transit
            </label>
          </div>

          <div className='form-group custom-control custom-radio mr-4'>
            <input
              id='WALKING'
              className='custom-control-input'
              name='travelMode'
              type='radio'
              checked={travelMode === 'WALKING'}
              onChange={checkWalking}
            />
            <label className='custom-control-label' htmlFor='WALKING'>
              Walking
            </label>
          </div>
        </div>

        <button className='btn btn-primary' type='button' onClick={onClick}>
          Build Route
        </button>
      </div>

      <div className='map-container'>
        <GoogleMap
          id='direction-example'
          mapContainerStyle={styles.container}
          zoom={2}
          center={center}
          onClick={onMapClick}
        >
          {destination !== '' && origin !== '' && (
            <DirectionsService
              options={directionsServiceOptions}
              callback={directionsCallback}
            />
          )}

          {response !== null && (
            <DirectionsRenderer options={directionsRendererOptions} />
          )}
        </GoogleMap>
      </div>
    </div>
  )
}

ExampleDirections.propTypes = ExampleDirectionsPropTypes

export default memo(ExampleDirections)
