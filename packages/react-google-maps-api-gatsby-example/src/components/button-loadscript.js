// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toggleLoadScript } from '../actions/app'

const id = 'toggle-script'

const ButtonLoadscript = ({ checked, onClick }) => (
  <div>
    <button
      id={id}
      className={`btn btn-load ${checked ? 'btn-danger' : 'btn-primary'}`}
      type='button'
      onClick={onClick}
    >
      { checked ? 'Unload Maps' : 'Load Maps'}
    </button>
  </div>
)

ButtonLoadscript.propTypes = {
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  checked: state.getIn(['app', 'loadScriptChecked'])
})

const mapDispatchToProps = dispatch => ({
  onClick: () => {
    dispatch(
      toggleLoadScript({
        loadScriptChecked: true
      })
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonLoadscript)
