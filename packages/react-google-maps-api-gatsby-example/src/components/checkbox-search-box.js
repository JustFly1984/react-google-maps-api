// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toggleStandaloneSearchBox } from '../actions/app'

const id = 'standaloneSearchBox'

const CheckboxSearchBox = ({ onChange, value }) => (
  <div className='custom-control custom-checkbox'>
    <input
      id={id}
      className='custom-control-input'
      type='checkbox'
      onChange={onChange}
      value={value}
    />

    <label className='custom-control-label' htmlFor={id}>
      Searchbox
    </label>
  </div>
)

CheckboxSearchBox.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  value: state.getIn(['app', 'standaloneSearchBox']),
})

const mapDispatchToProps = (dispatch) => ({
  onChange: ({ target: { checked } }) => {
    dispatch(
      toggleStandaloneSearchBox({
        standaloneSearchBox: checked,
      })
    )
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxSearchBox)
