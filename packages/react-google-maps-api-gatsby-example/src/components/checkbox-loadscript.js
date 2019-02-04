// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toggleLoadScript } from '../actions/app'

const id = 'toggle-script'

const CheckboxLoadscript = ({ checked, onChange }) => (
  <div>
    <input
      id={id}
      type='checkbox'
      checked={checked}
      onChange={onChange}
    />

    &nbsp;

    <label
      htmlFor={id}
    >
      {`Toggle <LoadScript />`}
    </label>
  </div>
)

CheckboxLoadscript.propTypes = {
  checked: PropTypes.bool.isRequired,

  onChange: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  checked: state.getIn(['app', 'loadScriptChecked'])
})

const mapDispatchToProps = dispatch => ({
  onChange: ({ target: { checked } }) => {
    dispatch(
      toggleLoadScript({
        loadScriptChecked: checked
      })
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckboxLoadscript)
