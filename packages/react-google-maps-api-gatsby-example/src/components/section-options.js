import * as React from 'react'
import { useSelector } from 'react-redux'

import ExampleOptions from '../examples/example-options'

import { shapeExampleStyles } from './styles'

function selector(state) {
  return state.getIn(['app', 'options'])
}

function SectionOptions() {
  const options = useSelector(selector)
  return options ? <ExampleOptions styles={shapeExampleStyles} /> : <></>
}

export default React.memo(SectionOptions)
