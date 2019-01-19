// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import GroundOverlayExample from '../examples/ground-overlay-example'

import {
  mapBoxStyle,
  mapHeaderStyle,
  shapeExampleStyles
} from '../components/styles'

const SectionGround = ({ ground }) =>
  ground
    ? (
      <div style={mapBoxStyle}>
        <h2 style={mapHeaderStyle}>
            Google Map with Ground Overlay
        </h2>

        <GroundOverlayExample
          styles={shapeExampleStyles}
        />
      </div>
    )
    : null

SectionGround.propTypes = {
  ground: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  ground: state.getIn(['app', 'ground'])
})

export default connect(
  mapStateToProps
)(SectionGround)
