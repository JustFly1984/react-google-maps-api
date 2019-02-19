// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { btnStyle } from '../components/styles'

import { toggleLoadScript } from '../actions/app'

const id = 'toggle-script'

const CheckboxLoadscript = ({ checked, onClick }) => (
  <div>
    <button
      id={id}
      className={checked ? 'btn btn-danger' : 'btn btn-primary'}
      style={btnStyle}
      onClick={onClick}
    >
      { checked ? 'Unload Maps' : 'Load Maps'}
    </button>
  </div>
)

CheckboxLoadscript.propTypes = {
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
)(CheckboxLoadscript)
