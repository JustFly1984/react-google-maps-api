import * as React from 'react'
import { useSelector } from 'react-redux'

import ExampleGround from '../examples/example-ground'

import { shapeExampleStyles } from './styles'

function selector(state) {
  return state.getIn(['app', 'ground'])
}

function SectionGround() {
  const ground = useSelector(selector)
  return ground ? <ExampleGround styles={shapeExampleStyles} /> : <></>
}

export default React.memo(SectionGround)
