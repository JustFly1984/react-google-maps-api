// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { setGoogleMapsKey } from '../actions/app'

const InputBoxApiKey = ({ value, onChange }) => (
  <div className='form-group mb-2'>
    <label htmlFor='apikey'>Google API key:</label>
    {` `}
    <input
      id='apikey'
      type='text'
      className='form-control'
      autoComplete='on'
      autoCorrect='off'
      autoCapitalize='off'
      onChange={onChange}
      value={value}
      placeholder='Enter your key here'
    />
  </div>
)

InputBoxApiKey.propTypes = {
  value: PropTypes.string.isRequired,

  onChange: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  value: state.getIn(['app', 'googleMapsApiKey']),
})

const mapDispatchToProps = dispatch => ({
  onChange: ({ target: { value } }) => {
    dispatch(
      setGoogleMapsKey({
        googleMapsApiKey: value,
      })
    )
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputBoxApiKey)
