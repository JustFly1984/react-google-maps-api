// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ExampleSearchBox from '../examples/example-search-box'

import { shapeExampleStyles } from './styles'

const SectionSearchBox = ({ standaloneSearchBox }) =>
  standaloneSearchBox ? <ExampleSearchBox styles={shapeExampleStyles} /> : <></>

SectionSearchBox.propTypes = {
  standaloneSearchBox: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  standaloneSearchBox: state.getIn(['app', 'standaloneSearchBox']),
})

export default connect(mapStateToProps)(SectionSearchBox)
