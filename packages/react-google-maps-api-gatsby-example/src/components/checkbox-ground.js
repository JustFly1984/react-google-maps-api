// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toggleGround } from '../actions/app'

const id = 'ground'

const CheckboxGround = ({ onChange, value }) => (
  <div className='custom-control custom-checkbox'>
    <input
      id={id}
      className='custom-control-input'
      type='checkbox'
      onChange={onChange}
      value={value}
    />

    <label className='custom-control-label' htmlFor={id}>
      Ground
    </label>
  </div>
)

CheckboxGround.propTypes = {
  value: PropTypes.bool.isRequired,

  onChange: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  value: state.getIn(['app', 'ground']),
})

const mapDispatchToProps = dispatch => ({
  onChange: ({ target: { checked } }) => {
    dispatch(
      toggleGround({
        ground: checked,
      })
    )
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckboxGround)
