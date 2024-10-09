// eslint-disable-next-line node/no-extraneous-import
import { memo } from 'react'
import { useSelector } from 'react-redux'

import ExampleBicycling from '../examples/example-bicycling'

import { shapeExampleStyles } from './styles'

function selector(state) {
  return state.getIn(['app', 'bicycling'])
}

function SectionBicycling() {
  const bicycling = useSelector(selector)
  return bicycling ? <ExampleBicycling styles={shapeExampleStyles} /> : <></>
}

export default memo(SectionBicycling)
