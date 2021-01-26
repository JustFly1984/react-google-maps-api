import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toggleBicycling } from '../actions/app'

const id = 'bicycling'

function selector(state) {
  return state.getIn(['app', 'bicycling'])
}

function CheckboxBicycling() {
  const dispatch = useDispatch()
  const onChange = React.useCallback(
    ({ target: { checked } }) => {
      dispatch(
        toggleBicycling({
          bicycling: checked,
        })
      )
    },
    [dispatch]
  )

  const value = useSelector(selector)

  return (
    <div className='custom-control custom-checkbox'>
      <input
        id={id}
        className='custom-control-input'
        type='checkbox'
        onChange={onChange}
        value={value}
      />

      <label className='custom-control-label' htmlFor={id}>
        Bicycling
      </label>
    </div>
  )
}

export default React.memo(CheckboxBicycling)
