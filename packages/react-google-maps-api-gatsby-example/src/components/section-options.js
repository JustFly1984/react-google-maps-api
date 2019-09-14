// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ExampleOptions from '../examples/example-options'

import { shapeExampleStyles } from './styles'

const SectionOptions = ({ options }) =>
  options ? <ExampleOptions styles={shapeExampleStyles} /> : <></>

SectionOptions.propTypes = {
  options: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  options: state.getIn(['app', 'options']),
})

export default connect(mapStateToProps)(SectionOptions)
