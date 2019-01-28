// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import DrawingManagerExample from '../examples/drawing-manager-example'

import {
  mapBoxStyle,
  mapHeaderStyle,
  shapeExampleStyles
} from '../components/styles'

const SectionDrawing = ({ drawing }) =>
  drawing
    ? (
      <div style={mapBoxStyle}>
        <h2 style={mapHeaderStyle}>
        Google Map with DrawingManager
        </h2>

        <DrawingManagerExample
          styles={shapeExampleStyles}
        />
      </div>
    )
    : null

SectionDrawing.propTypes = {
  drawing: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  drawing: state.getIn(['app', 'drawing'])
})

export default connect(
  mapStateToProps
)(SectionDrawing)
