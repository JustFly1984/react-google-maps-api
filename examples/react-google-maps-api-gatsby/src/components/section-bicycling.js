// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import BicyclingExample from '../examples/bicycling-example'

import {
  mapBoxStyle,
  mapHeaderStyle,
  shapeExampleStyles
} from '../components/styles'

const SectionBicycling = ({ bicycling }) =>
  bicycling
    ? (
      <div style={mapBoxStyle}>
        <h2 style={mapHeaderStyle}>
        Google Map with Bicycling Layer
        </h2>

        <BicyclingExample
          styles={shapeExampleStyles}
        />
      </div>
    )
    : null

SectionBicycling.propTypes = {
  bicycling: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  bicycling: state.getIn(['app', 'bicycling'])
})

export default connect(
  mapStateToProps
)(SectionBicycling)
