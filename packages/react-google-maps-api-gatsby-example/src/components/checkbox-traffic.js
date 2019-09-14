// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toggleTraffic } from '../actions/app'

const id = 'traffic'

const CheckboxTraffic = ({ onChange, value }) => (
  <div className='custom-control custom-checkbox'>
    <input
      id={id}
      className='custom-control-input'
      type='checkbox'
      onChange={onChange}
      value={value}
    />

    <label className='custom-control-label' htmlFor={id}>
      Traffic
    </label>
  </div>
)

CheckboxTraffic.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  value: state.getIn(['app', 'traffic']),
})

const mapDispatchToProps = dispatch => ({
  onChange: ({ target: { checked } }) => {
    dispatch(
      toggleTraffic({
        traffic: checked,
      })
    )
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckboxTraffic)
