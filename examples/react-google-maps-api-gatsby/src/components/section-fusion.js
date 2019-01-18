// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import FusionTablesLayerExample from '../examples/fusion-tables-layer-example'

import {
  mapBoxStyle,
  mapHeaderStyle,
  shapeExampleStyles
} from './styles'

const SectionFusion = ({ fusion }) =>
  fusion
    ? (
      <div style={mapBoxStyle}>
        <h2 style={mapHeaderStyle}>
          Fusion Tables Layer Google Map example
        </h2>

        <FusionTablesLayerExample
          styles={shapeExampleStyles}
        />
      </div>
    )
    : null

SectionFusion.propTypes = {
  fusion: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  fusion: state.getIn(['app', 'fusion'])
})

export default connect(
  mapStateToProps
)(SectionFusion)
