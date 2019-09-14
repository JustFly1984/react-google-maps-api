// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ExampleBicycling from '../examples/example-bicycling'

import { shapeExampleStyles } from '../components/styles'

const SectionBicycling = ({ bicycling }) =>
  bicycling ? <ExampleBicycling styles={shapeExampleStyles} /> : <></>

SectionBicycling.propTypes = {
  bicycling: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  bicycling: state.getIn(['app', 'bicycling']),
})

export default connect(mapStateToProps)(SectionBicycling)
