import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setGoogleMapsKey } from '../actions/app'

function selector(state) {
  return state.getIn(['app', 'googleMapsApiKey'])
}

function InputBoxApiKey() {
  const dispatch = useDispatch()
  const onChange = React.useCallback(
    ({ target: { value } }) => {
      dispatch(
        setGoogleMapsKey({
          googleMapsApiKey: value,
        })
      )
    },
    [dispatch]
  )
  const value = useSelector(selector)
  return (
    <div className='form-group mb-2'>
      <label htmlFor='api-key'>Google API key:</label>
      {` `}
      <input
        id='api-key'
        type='text'
        className='form-control'
        autoComplete='on'
        autoCorrect='off'
        autoCapitalize='off'
        onChange={onChange}
        value={value}
        placeholder='Enter your key here'
      />
    </div>
  )
}

export default React.memo(InputBoxApiKey)
