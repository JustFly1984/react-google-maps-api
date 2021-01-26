import * as React from 'react'
import { useSelector } from 'react-redux'

import ExampleShapes from '../examples/example-shapes'

import { shapeExampleStyles } from './styles'

function selector(state) {
  return state.getIn(['app', 'shapes'])
}

function SectionShapes() {
  const shapes = useSelector(selector)
  shapes ? <ExampleShapes styles={shapeExampleStyles} /> : <></>
}

export default React.memo(SectionShapes)
