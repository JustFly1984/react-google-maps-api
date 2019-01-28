// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  toggleOptions
} from '../actions/app'

const CheckboxOptions = ({ onChange, value }) => (
  <div>
    <input
      id='options'
      type='checkbox'
      onChange={onChange}
      value={value}
    />
    {` `}
    <label
      htmlFor='options'
    >
      Google Map Options Example
    </label>
  </div>
)

CheckboxOptions.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  value: state.getIn(['app', 'options'])
})

const mapDispatchToProps = dispatch => ({
  onChange: ({ target: { checked } }) => {
    dispatch(
      toggleOptions({
        options: checked
      })
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckboxOptions)
