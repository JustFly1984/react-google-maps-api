// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ExampleGround from '../examples/example-ground'

import { shapeExampleStyles } from './styles'

const SectionGround = ({ ground }) =>
  ground ? <ExampleGround styles={shapeExampleStyles} /> : <></>

SectionGround.propTypes = {
  ground: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  ground: state.getIn(['app', 'ground']),
})

export default connect(mapStateToProps)(SectionGround)
