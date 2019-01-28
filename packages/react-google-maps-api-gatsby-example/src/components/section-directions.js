// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import DirectionsRendererExample from '../examples/directions-renderer-example'

import {
  mapBoxStyle,
  mapHeaderStyle,
  shapeExampleStyles
} from '../components/styles'

const SectionDirections = ({ directions }) =>
  directions
    ? (
      <div style={mapBoxStyle}>
        <h2 style={mapHeaderStyle}>
          Directions Renderer Google Map example
        </h2>

        <DirectionsRendererExample
          styles={shapeExampleStyles}
        />
      </div>
    )
    : null

SectionDirections.propTypes = {
  directions: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  directions: state.getIn(['app', 'directions'])
})

export default connect(
  mapStateToProps
)(SectionDirections)
