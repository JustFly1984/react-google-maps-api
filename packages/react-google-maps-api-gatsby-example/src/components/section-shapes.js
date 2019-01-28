// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ShapesExample from '../examples/shapes-example'

import {
  mapBoxStyle,
  mapHeaderStyle,
  shapeExampleStyles
} from '../components/styles'

const SectionShapes = ({ shapes }) =>
  shapes
    ? (
      <div style={mapBoxStyle}>
        <h2 style={mapHeaderStyle}>
          Google Map with Shapes
        </h2>

        <ShapesExample
          styles={shapeExampleStyles}
        />
      </div>
    )
    : null

SectionShapes.propTypes = {
  shapes: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  shapes: state.getIn(['app', 'shapes'])
})

export default connect(
  mapStateToProps
)(SectionShapes)
