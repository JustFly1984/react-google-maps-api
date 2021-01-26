import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { toggleStandaloneSearchBox } from '../actions/app'

const id = 'standaloneSearchBox'

function selector(state) {
  return state.getIn(['app', 'standaloneSearchBox'])
}

function CheckboxSearchBox() {
  const dispatch = useDispatch()
  const onChange = React.useCallback(
    ({ target: { checked } }) => {
      dispatch(
        toggleStandaloneSearchBox({
          standaloneSearchBox: checked,
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
        Searchbox
      </label>
    </div>
  )
}

export default React.memo(CheckboxSearchBox)
