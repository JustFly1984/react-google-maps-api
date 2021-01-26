import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { toggleOverlayView } from '../actions/app'

const id = 'overlayView'

function selector(state) {
  return {
    value: state.getIn(['app', 'overlayView']),
  }
}

function CheckboxOverlayView() {
  const dispatch = useDispatch()
  const onChange = React.useCallback(
    ({ target: { checked } }) => {
      dispatch(
        toggleOverlayView({
          overlayView: checked,
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
        Overlay View
      </label>
    </div>
  )
}

export default React.memo(CheckboxOverlayView)
