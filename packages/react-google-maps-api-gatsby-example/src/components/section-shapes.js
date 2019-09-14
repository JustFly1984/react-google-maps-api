// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ExampleShapes from '../examples/example-shapes'

import { shapeExampleStyles } from './styles'

const SectionShapes = ({ shapes }) =>
  shapes ? <ExampleShapes styles={shapeExampleStyles} /> : <></>

SectionShapes.propTypes = {
  shapes: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  shapes: state.getIn(['app', 'shapes']),
})

export default connect(mapStateToProps)(SectionShapes)
