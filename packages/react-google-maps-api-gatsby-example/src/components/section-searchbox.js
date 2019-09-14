// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ExampleSearchbox from '../examples/example-searchbox'

import { shapeExampleStyles } from './styles'

const SectionSearchbox = ({ standaloneSearchbox }) =>
  standaloneSearchbox ? <ExampleSearchbox styles={shapeExampleStyles} /> : <></>

SectionSearchbox.propTypes = {
  standaloneSearchbox: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  standaloneSearchbox: state.getIn(['app', 'standaloneSearchbox']),
})

export default connect(mapStateToProps)(SectionSearchbox)
