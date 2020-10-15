// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toggleLoadScript } from '../actions/app'

const id = 'toggle-script'

const ButtonLoadScript = ({ checked, isApiKeyValid, onClick }) => (
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

ButtonLoadScript.propTypes = {
  isApiKeyValid: PropTypes.bool.isRequired,
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    isApiKeyValid: state.getIn(['app', 'googleMapsApiKey']).length >= 38,
    checked: state.getIn(['app', 'loadScriptChecked']),
  }
}

const mapDispatchToProps = (dispatch) => ({
  onClick: () => {
    dispatch(toggleLoadScript())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ButtonLoadScript)
