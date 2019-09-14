// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ExampleData from '../examples/example-data'

import { shapeExampleStyles } from './styles'

const SectionData = ({ data }) =>
  data ? <ExampleData styles={shapeExampleStyles} /> : <></>

SectionData.propTypes = {
  data: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  data: state.getIn(['app', 'data']),
})

export default connect(mapStateToProps)(SectionData)
