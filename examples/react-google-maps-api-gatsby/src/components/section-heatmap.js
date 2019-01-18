// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import HeatmapLayerExample from '../examples/heatmap-example'

import {
  mapBoxStyle,
  mapHeaderStyle,
  shapeExampleStyles
} from '../components/styles'

const SectionHeatmap = ({ heatmap }) =>
  heatmap
    ? (
      <div style={mapBoxStyle}>
        <h2 style={mapHeaderStyle}>
          Heatmap Layer Google Map example
        </h2>

        <HeatmapLayerExample
          styles={shapeExampleStyles}
        />
      </div>
    )
    : null

SectionHeatmap.propTypes = {
  heatmap: PropTypes.bool.isRequired
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
  ground: state.getIn(['app', 'ground'])
})

export default connect(
  mapStateToProps
)(SectionHeatmap)
