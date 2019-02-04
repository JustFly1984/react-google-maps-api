// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toggleStandaloneSearchbox } from '../actions/app'

const id = 'traffic'

const CheckboxStandaloneSearchbox = ({ onChange, value }) => (
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
      StandaloneSearchbox Example
    </label>
  </div>
)

CheckboxStandaloneSearchbox.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  value: state.getIn(['app', 'standaloneSearchbox'])
})

const mapDispatchToProps = dispatch => ({
  onChange: ({ target: { checked } }) => {
    dispatch(
      toggleStandaloneSearchbox({
        standaloneSearchbox: checked
      })
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckboxStandaloneSearchbox)
