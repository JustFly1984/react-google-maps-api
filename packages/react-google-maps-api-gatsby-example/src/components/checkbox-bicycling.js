// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toggleBicycling } from '../actions/app'

const id = 'bicycling'

const CheckboxBicycling = ({ onChange, value }) => (
  <div className='custom-control custom-checkbox'>
    <input
      id={id}
      className='custom-control-input'
      type='checkbox'
      onChange={onChange}
      value={value}
    />

    <label className='custom-control-label' htmlFor={id}>
      Bicycling
    </label>
  </div>
)

CheckboxBicycling.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  value: state.getIn(['app', 'bicycling']),
})

const mapDispatchToProps = dispatch => ({
  onChange: ({ target: { checked } }) => {
    dispatch(
      toggleBicycling({
        bicycling: checked,
      })
    )
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckboxBicycling)
