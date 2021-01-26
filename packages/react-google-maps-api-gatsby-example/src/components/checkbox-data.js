import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { toggleData } from '../actions/app'

const id = 'data'

function selector(state) {
  return {
    value: state.getIn(['app', 'data']),
  }
}

function CheckboxData() {
  const dispatch = useDispatch()

  const onChange = React.useCallback(
    ({ target: { checked } }) => {
      dispatch(
        toggleData({
          data: checked,
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
        Data
      </label>
    </div>
  )
}

export default React.memo(CheckboxData)
