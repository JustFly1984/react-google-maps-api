// eslint-disable-next-line node/no-extraneous-import
import { memo } from 'react'
import { useSelector } from 'react-redux'

import ExampleDirections from '../examples/example-directions'

import { shapeExampleStyles } from './styles'

function selector(state) {
  return state.getIn(['app', 'directions'])
}

function SectionDirections() {
  const directions = useSelector(selector)
  return directions ? <ExampleDirections styles={shapeExampleStyles} /> : <></>
}

export default memo(SectionDirections)
