// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toggleLoadScript } from '../actions/app'

const id = 'toggle-script'

const ButtonLoadscript = ({ checked, isApikeyValid, onClick }) => (
  <div>
    <button
      id={id}
      className={`btn btn-load ${checked ? 'btn-danger' : 'btn-primary'}`}
      type='button'
      onClick={onClick}
      disabled={!isApikeyValid}
    >
      {checked ? 'Unload Maps' : 'Load Maps'}
    </button>
  </div>
)

ButtonLoadscript.propTypes = {
  isApikeyValid: PropTypes.bool.isRequired,
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    isApikeyValid: state.getIn(['app', 'googleMapsApiKey']).length >= 38,
    checked: state.getIn(['app', 'loadScriptChecked']),
  }
}

const mapDispatchToProps = dispatch => ({
  onClick: () => {
    dispatch(toggleLoadScript())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonLoadscript)
