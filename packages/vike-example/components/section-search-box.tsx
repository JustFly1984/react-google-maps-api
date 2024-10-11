// eslint-disable-next-line node/no-extraneous-import
import { memo } from 'react'
import { useSelector } from 'react-redux'

import ExampleSearchBox from '../examples/example-search-box'

import { shapeExampleStyles } from './styles'

function selector(state) {
  return state.getIn(['app', 'standaloneSearchBox'])
}

function SectionSearchBox() {
  const standaloneSearchBox = useSelector(selector)

  return standaloneSearchBox ? (
    <ExampleSearchBox styles={shapeExampleStyles} />
  ) : (
    <></>
  )
}

export default memo(SectionSearchBox)
