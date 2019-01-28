// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  toggleGround
} from '../actions/app'

const CheckboxGround = ({ onChange, value }) => (
  <div>
    <input
      id='ground'
      type='checkbox'
      onChange={onChange}
      value={value}
    />
    {` `}
    <label
      htmlFor='ground'
    >
      Ground Layer Example
    </label>
  </div>
)

CheckboxGround.propTypes = {
  value: PropTypes.bool.isRequired,

  onChange: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  value: state.getIn(['app', 'ground'])
})

const mapDispatchToProps = dispatch => ({
  onChange: ({ target: { checked } }) => {
    dispatch(
      toggleGround({
        ground: checked
      })
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckboxGround)
