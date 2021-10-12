import * as React from 'react'
import { useSelector } from 'react-redux'

import ExampleHeatmap from '../examples/example-heatmap'

import { shapeExampleStyles } from './styles'

function selector(state) {
  return state.getIn(['app', 'heatmap'])
}

const SectionHeatmap = () => {
  const heatmap = useSelector(selector)
  return heatmap ? <ExampleHeatmap styles={shapeExampleStyles} /> : <></>
}

export default React.memo(SectionHeatmap)
