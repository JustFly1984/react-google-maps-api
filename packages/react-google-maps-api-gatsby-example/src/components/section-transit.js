import * as React from 'react'
import { useSelector } from 'react-redux'

import ExampleTransit from '../examples/example-transit'

import { shapeExampleStyles } from '../components/styles'

function selector(state) {
  return state.getIn(['app', 'transit'])
}

function SectionTransit() {
  const transit = useSelector(selector)
  return transit ? <ExampleTransit styles={shapeExampleStyles} /> : <></>
}

export default React.memo(SectionTransit)
