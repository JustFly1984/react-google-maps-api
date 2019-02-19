// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import BicyclingExample from '../examples/bicycling-example'

import {
  mapStyle,
  shapeExampleStyles
} from '../components/styles'

const SectionBicycling = ({ bicycling }) =>
  bicycling
    ? (
      <div style={mapStyle}>
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
