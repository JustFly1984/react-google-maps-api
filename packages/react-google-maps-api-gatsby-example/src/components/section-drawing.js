import * as React from 'react'
import { useSelector } from 'react-redux'

import ExampleDrawing from '../examples/example-drawing'

import { shapeExampleStyles } from './styles'

function selector(state) {
  return state.getIn(['app', 'drawing'])
}

function SectionDrawing() {
  const drawing = useSelector(selector)
  return drawing ? <ExampleDrawing styles={shapeExampleStyles} /> : <></>
}

export default React.memo(SectionDrawing)
