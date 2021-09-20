import React, { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { toggleLoadScript } from '../actions/app'

const id = 'toggle-script'

function selector(state) {
  return {
    isApiKeyValid: state.getIn(['app', 'googleMapsApiKey']).length >= 38,
    checked: state.getIn(['app', 'loadScriptChecked']),
  }
}

function ButtonLoadScript() {
  const dispatch = useDispatch()

  const onClick = React.useCallback(() => {
    dispatch(toggleLoadScript())
  }, [dispatch])

  const { checked, isApiKeyValid } = useSelector(selector)

  return (
    <div>
      <button
        id={id}
        className={`btn btn-load ${checked ? 'btn-danger' : 'btn-primary'}`}
        type='button'
        onClick={onClick}
        disabled={!isApiKeyValid}
      >
        {checked ? 'Unload Maps' : 'Load Maps'}
      </button>
    </div>
  )
}

export default memo(ButtonLoadScript)
