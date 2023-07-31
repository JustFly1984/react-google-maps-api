// eslint-disable-next-line node/no-extraneous-import
import { memo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { toggleGround } from '../actions/app'

const id = 'ground'

function selector(state) {
  return state.getIn(['app', 'ground'])
}

function CheckboxGround() {
  const dispatch = useDispatch()

  const onChange = useCallback(
    ({ target: { checked } }) => {
      dispatch(
        toggleGround({
          ground: checked,
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
        Ground
      </label>
    </div>
  )
}

export default memo(CheckboxGround)
