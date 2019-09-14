// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ExampleOverlayView from '../examples/example-overlay-view'

import { shapeExampleStyles } from './styles'

const SectionOverlayView = ({ overlayView }) =>
  overlayView ? <ExampleOverlayView styles={shapeExampleStyles} /> : <></>

SectionOverlayView.propTypes = {
  overlayView: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  overlayView: state.getIn(['app', 'overlayView']),
})

export default connect(mapStateToProps)(SectionOverlayView)
