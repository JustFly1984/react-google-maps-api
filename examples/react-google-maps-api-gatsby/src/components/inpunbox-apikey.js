// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  setGoogleMapsKey
} from '../actions/app'

const InputBoxApiKey = ({ value, onChange }) => (
  <div>
    <label
      htmlFor='apikey'
    >
      Enter your Google API key here:
    </label>
    {` `}
    <input
      id='apikey'
      type='text'
      onChange={onChange}
      value={value}
    />
  </div>
)

InputBoxApiKey.propTypes = {
  value: PropTypes.string.isRequired,

  onChange: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  value: state.getIn(['app', 'googleMapsApiKey'])
})

const mapDispatchToProps = dispatch => ({
  onChange: ({ target: { value } }) => {
    dispatch(
      setGoogleMapsKey({
        googleMapsApiKey: value
      })
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputBoxApiKey)
