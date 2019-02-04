// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toggleDirections } from '../actions/app'

const id = 'directions'

const CheckboxDirections = ({ onChange, value }) => (
  <div>
    <input
      id={id}
      type='checkbox'
      onChange={onChange}
      value={value}
    />

    &nbsp;

    <label
      htmlFor={id}
    >
      Directions Example
    </label>
  </div>
)

CheckboxDirections.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  value: state.getIn(['app', 'directions'])
})

const mapDispatchToProps = dispatch => ({
  onChange: ({ target: { checked } }) => {
    dispatch(
      toggleDirections({
        directions: checked
      })
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckboxDirections)
