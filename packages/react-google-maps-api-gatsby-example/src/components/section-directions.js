// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import DirectionsRendererExample from '../examples/directions-renderer-example'

import {
  mapStyle,
  shapeExampleStyles
} from '../components/styles'

const SectionDirections = ({ directions }) =>
  directions
    ? (
      <div style={mapStyle}>
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
