// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ExampleTraffic from '../examples/example-traffic'

import { shapeExampleStyles } from './styles'

const SectionTraffic = ({ traffic }) =>
  traffic ? <ExampleTraffic styles={shapeExampleStyles} /> : <></>

SectionTraffic.propTypes = {
  traffic: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  traffic: state.getIn(['app', 'traffic']),
})

export default connect(mapStateToProps)(SectionTraffic)
