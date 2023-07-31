// eslint-disable-next-line node/no-extraneous-import
import { memo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { toggleHeatmap } from '../actions/app'

const id = 'heatmap'

function selector(state) {
  return state.getIn(['app', 'heatmap'])
}

function CheckboxHeatmap() {
  const dispatch = useDispatch()

  const onChange = useCallback(
    ({ target: { checked } }) => {
      dispatch(
        toggleHeatmap({
          heatmap: checked,
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
        Heatmap
      </label>
    </div>
  )
}

export default memo(CheckboxHeatmap)
