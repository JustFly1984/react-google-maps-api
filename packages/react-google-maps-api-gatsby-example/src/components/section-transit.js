// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ExampleTransit from '../examples/example-transit'

import { shapeExampleStyles } from '../components/styles'

const SectionTransit = ({ transit }) =>
  transit ? <ExampleTransit styles={shapeExampleStyles} /> : <></>

SectionTransit.propTypes = {
  transit: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  transit: state.getIn(['app', 'transit']),
})

export default connect(mapStateToProps)(SectionTransit)
