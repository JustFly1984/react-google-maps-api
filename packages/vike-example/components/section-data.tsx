// eslint-disable-next-line node/no-extraneous-import
import { memo } from 'react'
import { useSelector } from 'react-redux'

import ExampleData from '../examples/example-data'

import { shapeExampleStyles } from './styles'

function selector(state) {
  return state.getIn(['app', 'data'])
}

function SectionData() {
  const data = useSelector(selector)
  return data ? <ExampleData styles={shapeExampleStyles} /> : <></>
}

export default memo(SectionData)
