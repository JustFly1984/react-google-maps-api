/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import invariant from 'invariant'

import {
  construct,
  getDerivedStateFromProps,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { MAP, DRAWING_MANAGER } from '../../constants'
import { DrawingManagerPropTypes } from '../../proptypes'

const eventMap = {
  onCircleComplete: 'circlecomplete',
  onMarkerComplete: 'markercomplete',
  onOverlayComplete: 'overlaycomplete',
  onPolygonComplete: 'polygoncomplete',
  onPolylineComplete: 'polylinecomplete',
  onRectangleComplete: 'rectanglecomplete',
}

const updaterMap = {
  drawingMode (instance, drawingMode) {
    instance.setDrawingMode(drawingMode)
  },
  map (instance, map) {
    instance.setMap(map)
  },
  options (instance, options) {
    instance.setOptions(options)
  },
}

export class DrawingManager extends PureComponent {
  static propTypes = DrawingManagerPropTypes

  static contextTypes = {
    [MAP]: PropTypes.object,
  }

  constructor (props, context) {
    super(props, context)

    invariant(
      google.maps.drawing,
      'Did you include "libraries=drawing" in the URL?'
    )

    const drawingManager = new google.maps.drawing.DrawingManager(
      props.options
    )

    this.state = {
      [DRAWING_MANAGER]: drawingManager,
      prevProps: construct(
        DrawingManagerPropTypes,
        updaterMap,
        props,
        drawingManager
      )
    }

    drawingManager.setMap(context[MAP])
  }

  static getDerivedStateFromProps (props, state) {
    return getDerivedStateFromProps(
      props,
      state,
      this.state[DRAWING_MANAGER],
      eventMap,
      updaterMap
    )
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const drawingManager = this.state[DRAWING_MANAGER]

    if (drawingManager) {
      drawingManager.setMap(null)
    }
  }

  render () {
    return null
  }

  getDrawingMode = () =>
    this.state[DRAWING_MANAGER].getDrawingMode()

  getMap = () =>
    this.state[DRAWING_MANAGER].getMap()
}

export default DrawingManager
