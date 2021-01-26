import * as React from 'react'
import { useSelector } from 'react-redux'

import ExampleBicycling from '../examples/example-bicycling'

import { shapeExampleStyles } from '../components/styles'

function selector(state) {
  return state.getIn(['app', 'bicycling'])
}

function SectionBicycling() {
  const bicycling = useSelector(selector)
  return bicycling ? <ExampleBicycling styles={shapeExampleStyles} /> : <></>
}

export default React.memo(SectionBicycling)
