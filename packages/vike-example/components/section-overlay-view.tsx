// eslint-disable-next-line node/no-extraneous-import
import { memo } from 'react'
import { useSelector } from 'react-redux'

import ExampleOverlayView from '../examples/example-overlay-view'

import { shapeExampleStyles } from './styles'

function selector(state) {
  return state.getIn(['app', 'overlayView'])
}

function SectionOverlayView() {
  const overlayView = useSelector(selector)
  return overlayView ? (
    <ExampleOverlayView styles={shapeExampleStyles} />
  ) : (
    <></>
  )
}

export default memo(SectionOverlayView)
