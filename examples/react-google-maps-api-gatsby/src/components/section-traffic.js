// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TrafficExample from '../examples/traffic-example'

import {
  mapBoxStyle,
  mapHeaderStyle,
  shapeExampleStyles
} from '../components/styles'

const SectionTraffic = ({ traffic }) =>
  traffic
    ? (
      <div style={mapBoxStyle}>
        <h2 style={mapHeaderStyle}>
          Traffic Layer Google Map example
        </h2>

        <TrafficExample
          styles={shapeExampleStyles}
        />
      </div>
    )
    : null

SectionTraffic.propTypes = {
  traffic: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  traffic: state.getIn(['app', 'traffic'])
})

export default connect(
  mapStateToProps
)(SectionTraffic)
