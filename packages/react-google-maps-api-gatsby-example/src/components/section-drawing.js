// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ExampleDrawing from '../examples/example-drawing'

import { shapeExampleStyles } from './styles'

const SectionDrawing = ({ drawing }) =>
  drawing ? <ExampleDrawing styles={shapeExampleStyles} /> : <></>

SectionDrawing.propTypes = {
  drawing: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  drawing: state.getIn(['app', 'drawing']),
})

export default connect(mapStateToProps)(SectionDrawing)
