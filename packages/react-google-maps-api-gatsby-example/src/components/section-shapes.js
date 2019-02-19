// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ShapesExample from '../examples/shapes-example'

import {
  mapStyle,
  shapeExampleStyles
} from '../components/styles'

const SectionShapes = ({ shapes }) =>
  shapes
    ? (
      <div style={mapStyle}>
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
