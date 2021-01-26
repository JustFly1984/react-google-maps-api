import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { toggleTraffic } from '../actions/app'

const id = 'traffic'
function selector(state) {
  return state.getIn(['app', 'traffic'])
}

function CheckboxTraffic() {
  const dispatch = useDispatch()
  const onChange = React.useCallback(
    ({ target: { checked } }) => {
      dispatch(
        toggleTraffic({
          traffic: checked,
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
        Traffic
      </label>
    </div>
  )
}

export default React.memo(CheckboxTraffic)
