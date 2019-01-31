// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toggleFusion } from '../actions/app'

const id = 'fusion'

const CheckboxFusion = ({ onChange, value }) => (
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
      Fusion Layer Example
    </label>
  </div>
)

CheckboxFusion.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  value: state.getIn(['app', 'fusion'])
})

const mapDispatchToProps = dispatch => ({
  onChange: ({ target: { checked } }) => {
    dispatch(
      toggleFusion({
        fusion: checked
      })
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckboxFusion)
