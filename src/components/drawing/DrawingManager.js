/* global google */
import { PureComponent } from 'react'
import invariant from 'invariant'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/helper'

import MapContext from '../../map-context'

import { DrawingManagerPropTypes } from '../../proptypes'

const eventMap = {
  onCircleComplete: 'circlecomplete',
  onMarkerComplete: 'markercomplete',
  onOverlayComplete: 'overlaycomplete',
  ondrawingManagerComplete: 'drawingManagercomplete',
  onPolylineComplete: 'polylinecomplete',
  onRectangleComplete: 'rectanglecomplete'
}

const updaterMap = {
  drawingMode (instance, drawingMode) {
    instance.setDrawingMode(drawingMode)
  },
  options (instance, options) {
    instance.setOptions(options)
  }
}

export class DrawingManager extends PureComponent {
  static propTypes = DrawingManagerPropTypes

  static contextType = MapContext

  constructor (props, context) {
    super(props, context)

    invariant(google.maps.drawing, 'Did you include "libraries=drawing" in the URL?')

    this.state = {
      drawingManager: new google.maps.drawing.DrawingManager(
        Object.assign(
          {
            map: context
          },
          props.options
        )
      )
    }

    this.registeredEvents = []
  }

  componentDidMount () {
    this.state.drawingManager.setMap(this.context)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: this.state.drawingManager
    })
  }

  componentDidUpdate (prevProps) {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.drawingManager
    })
  }

  componentWillUnmount () {
    unregisterEvents(this.registeredEvents)

    if (this.state.drawingManager) {
      this.state.drawingManager.setMap(null)
    }
  }

  render () {
    return <></>
  }

  getDrawingMode () {
    return this.state.drawingManager.getDrawingMode()
  }

  getMap () {
    return this.state.drawingManager.getMap()
  }
}

export default DrawingManager
