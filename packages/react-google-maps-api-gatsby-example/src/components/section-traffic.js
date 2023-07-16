// eslint-disable-next-line node/no-extraneous-import
import { memo } from 'react'
import { useSelector } from 'react-redux'

import ExampleTraffic from '../examples/example-traffic'

import { shapeExampleStyles } from './styles'

function selector(state) {
  return state.getIn(['app', 'traffic'])
}

function SectionTraffic() {
  const traffic = useSelector(selector)
  return traffic ? <ExampleTraffic styles={shapeExampleStyles} /> : <></>
}

export default memo(SectionTraffic)
