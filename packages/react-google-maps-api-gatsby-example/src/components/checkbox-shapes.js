// eslint-disable-next-line node/no-extraneous-import
import { memo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { toggleShapes } from '../actions/app'

const id = 'shapes'

function selector(state) {
  return state.getIn(['app', 'shapes'])
}

function CheckboxShapes() {
  const dispatch = useDispatch()
  const onChange = useCallback(
    ({ target: { checked } }) => {
      dispatch(
        toggleShapes({
          shapes: checked,
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
        Shapes
      </label>
    </div>
  )
}

export default memo(CheckboxShapes)
