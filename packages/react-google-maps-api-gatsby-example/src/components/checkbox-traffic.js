// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toggleTraffic } from '../actions/app'

const id = 'traffic'

const CheckboxTraffic = ({ onChange, value }) => (
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
      Traffic Layer Example
    </label>
  </div>
)

CheckboxTraffic.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  value: state.getIn(['app', 'traffic'])
})

const mapDispatchToProps = dispatch => ({
  onChange: ({ target: { checked } }) => {
    dispatch(
      toggleTraffic({
        traffic: checked
      })
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckboxTraffic)
