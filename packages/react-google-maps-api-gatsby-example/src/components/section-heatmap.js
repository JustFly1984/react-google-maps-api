// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ExampleHeatmap from '../examples/example-heatmap'

import { shapeExampleStyles } from './styles'

const SectionHeatmap = ({ heatmap }) =>
  heatmap ? <ExampleHeatmap styles={shapeExampleStyles} /> : <></>

SectionHeatmap.propTypes = {
  heatmap: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  language: state.getIn(['app', 'language']),
  loadScriptChecked: state.getIn(['app', 'loadScriptChecked']),
  googleMapsApiKey: state.getIn(['app', 'googleMapsApiKey']),
  heatmap: state.getIn(['app', 'heatmap']),
  traffic: state.getIn(['app', 'traffic']),
  shapes: state.getIn(['app', 'shapes']),
  drawing: state.getIn(['app', 'drawing']),
  bicycling: state.getIn(['app', 'bicycling']),
  ground: state.getIn(['app', 'ground']),
})

export default connect(mapStateToProps)(SectionHeatmap)
