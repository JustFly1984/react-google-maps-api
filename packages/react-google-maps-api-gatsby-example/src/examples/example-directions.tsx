// eslint-disable-next-line node/no-extraneous-import
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
} from '@react-google-maps/api'
import * as PropTypes from 'prop-types'
import {
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react'

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
  const [response, setResponse] = useState<google.maps.DirectionsResult | null>(
    null
  )

  const [directionsFormValue, setDirectionsFormValue] = useState({
    origin: '',
    destination: '',
    travelMode: google.maps.TravelMode.DRIVING,
  })

  const originRef = useRef<HTMLInputElement | null>(null)
  const destinationRef = useRef<HTMLInputElement | null>(null)

  const directionsCallback = useCallback(
    (
      result: google.maps.DirectionsResult | null,
      status: google.maps.DirectionsStatus
    ) => {
      if (result !== null) {
        if (status === 'OK') {
          setResponse(result)
        } else {
          console.log('response: ', result)
        }
      }
    },
    []
  )

  const checkDriving = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { checked } }) => {
      checked &&
        setDirectionsFormValue((currentValue) => ({
          ...currentValue,
          travelMode: google.maps.TravelMode.DRIVING,
        }))
    },
    []
  )

  const checkBicycling = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(({ target: { checked } }) => {
    checked &&
      setDirectionsFormValue((currentValue) => ({
        ...currentValue,
        travelMode: google.maps.TravelMode.BICYCLING,
      }))
  }, [])

  const checkTransit = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { checked } }) => {
      checked &&
        setDirectionsFormValue((currentValue) => ({
          ...currentValue,
          travelMode: google.maps.TravelMode.TRANSIT,
        }))
    },
    []
  )

  const checkWalking = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { checked } }) => {
      checked &&
        setDirectionsFormValue((currentValue) => ({
          ...currentValue,
          travelMode: google.maps.TravelMode.WALKING,
        }))
    },
    []
  )

  const onClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    if (
      originRef.current &&
      originRef.current.value !== '' &&
      destinationRef.current &&
      destinationRef.current.value !== ''
    ) {
      setDirectionsFormValue((currentValue) => ({
        ...currentValue,
        origin: originRef.current?.value ?? '',
        destination: destinationRef.current?.value ?? '',
      }))
    }
  }, [originRef.current?.value, destinationRef.current?.value])

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    console.log('onClick args: ', e)
  }, [])

  const directionsServiceOptions =
    useMemo<google.maps.DirectionsRequest>(() => {
      return {
        destination: directionsFormValue.destination,
        origin: directionsFormValue.origin,
        travelMode: directionsFormValue.travelMode,
      }
    }, [
      directionsFormValue.origin,
      directionsFormValue.destination,
      directionsFormValue.travelMode,
    ])

  const directionsResult = useMemo(() => {
    return {
      directions: response,
    }
  }, [response])

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
              checked={
                directionsFormValue.travelMode ===
                google.maps.TravelMode.DRIVING
              }
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
              checked={
                directionsFormValue.travelMode ===
                google.maps.TravelMode.BICYCLING
              }
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
              checked={
                directionsFormValue.travelMode ===
                google.maps.TravelMode.TRANSIT
              }
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
              checked={
                directionsFormValue.travelMode ===
                google.maps.TravelMode.WALKING
              }
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
          {directionsFormValue.destination !== '' &&
            directionsFormValue.origin !== '' && (
              <DirectionsService
                options={directionsServiceOptions}
                callback={directionsCallback}
              />
            )}

          {directionsResult.directions && (
            <DirectionsRenderer options={directionsResult} />
          )}
        </GoogleMap>
      </div>
    </div>
  )
}

ExampleDirections.propTypes = ExampleDirectionsPropTypes

export default memo(ExampleDirections)
