// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import OptionsExample from '../examples/options-example'

import {
  mapBoxStyle,
  mapHeaderStyle,
  shapeExampleStyles
} from './styles'

const SectionOptions = ({ options }) =>
  options
    ? (
      <div style={mapBoxStyle}>
        <h2 style={mapHeaderStyle}>
          Google Map with Options
        </h2>

        <OptionsExample
          styles={shapeExampleStyles}
        />
      </div>
    )
    : null

SectionOptions.propTypes = {
  options: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  options: state.getIn(['app', 'options'])
})

export default connect(
  mapStateToProps
)(SectionOptions)
