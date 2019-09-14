// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ExampleDirections from '../examples/example-directions'

import { shapeExampleStyles } from './styles'

const SectionDirections = ({ directions }) =>
  directions ? <ExampleDirections styles={shapeExampleStyles} /> : <></>

SectionDirections.propTypes = {
  directions: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  directions: state.getIn(['app', 'directions']),
})

export default connect(mapStateToProps)(SectionDirections)
