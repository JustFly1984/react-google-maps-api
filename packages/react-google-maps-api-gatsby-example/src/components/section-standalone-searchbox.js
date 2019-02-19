// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import StandaloneSearchboxExample from '../examples/standalone-searchbox-example'

import {
  mapStyle,
  shapeExampleStyles
} from './styles'

const SectionStandaloneSearchbox = ({ standaloneSearchbox }) =>
  standaloneSearchbox
    ? (
      <div style={mapStyle}>
        <StandaloneSearchboxExample
          styles={shapeExampleStyles}
        />
      </div>
    )
    : null

SectionStandaloneSearchbox.propTypes = {
  standaloneSearchbox: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  standaloneSearchbox: state.getIn(['app', 'standaloneSearchbox'])
})

export default connect(
  mapStateToProps
)(SectionStandaloneSearchbox)
