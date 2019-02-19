// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import DataExample from '../examples/data-example'

import {
  mapStyle,
  shapeExampleStyles
} from '../components/styles'

const SectionData = ({ data }) =>
  data
    ? (
      <div style={mapStyle}>
        <DataExample
          styles={shapeExampleStyles}
        />
      </div>
    )
    : null

SectionData.propTypes = {
  data: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  data: state.getIn(['app', 'data'])
})

export default connect(
  mapStateToProps
)(SectionData)
