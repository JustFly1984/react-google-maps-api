// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toggleOverlayView } from '../actions/app'

const id = 'overlayView'

const CheckboxOverlayView = ({ onChange, value }) => (
  <div className='custom-control custom-checkbox'>
    <input
      id={id}
      className='custom-control-input'
      type='checkbox'
      onChange={onChange}
      value={value}
    />

    <label className='custom-control-label' htmlFor={id}>
      Overlay View
    </label>
  </div>
)

CheckboxOverlayView.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  value: state.getIn(['app', 'overlayView']),
})

const mapDispatchToProps = dispatch => ({
  onChange: ({ target: { checked } }) => {
    dispatch(
      toggleOverlayView({
        overlayView: checked,
      })
    )
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckboxOverlayView)
