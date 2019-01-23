/* global google */
import { PureComponent, Children } from 'react'
import makeMarkerWithLabel from 'markerwithlabel'
import { createPortal } from 'react-dom'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/helper'

import { MarkerClusterContext } from './MarkerCluster'

import { MarkerWithLabelPropTypes } from '../../proptypes'

const eventMap = {
  onDblClick: 'dblclick',
  onDragEnd: 'dragend',
  onDragStart: 'dragstart',
  onMouseDown: 'mousedown',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onRightClick: 'rightclick',
  onAnimationChanged: 'animation_changed',
  onClick: 'click',
  onClickableChanged: 'clickable_changed',
  onCursorChanged: 'cursor_changed',
  onDrag: 'drag',
  onDraggableChanged: 'draggable_changed',
  onFlatChanged: 'flat_changed',
  onIconChanged: 'icon_changed',
  onPositionChanged: 'position_changed',
  onShapeChanged: 'shape_changed',
  onTitleChanged: 'title_changed',
  onVisibleChanged: 'visible_changed',
  onZindexChanged: 'zindex_changed',
}

const updaterMap = {
  labelAnchor (instance, labelAnchor) {
    instance.set(`labelAnchor`, labelAnchor)
  },
  labelClass (instance, labelClass) {
    instance.set(`labelClass`, labelClass)
  },
  labelStyle (instance, labelStyle) {
    instance.set(`labelStyle`, labelStyle)
  },
  labelVisible (instance, labelVisible) {
    instance.set(`labelVisible`, labelVisible)
  },
  animation (instance, animation) {
    instance.setAnimation(animation)
  },
  clickable (instance, clickable) {
    instance.setClickable(clickable)
  },
  cursor (instance, cursor) {
    instance.setCursor(cursor)
  },
  draggable (instance, draggable) {
    instance.setDraggable(draggable)
  },
  icon (instance, icon) {
    instance.setIcon(icon)
  },
  label (instance, label) {
    instance.setLabel(label)
  },
  opacity (instance, opacity) {
    instance.setOpacity(opacity)
  },
  options (instance, options) {
    instance.setOptions(options)
  },
  place (instance, place) {
    instance.setPlace(place)
  },
  position (instance, position) {
    instance.setPosition(position)
  },
  shape (instance, shape) {
    instance.setShape(shape)
  },
  title (instance, title) {
    instance.setTitle(title)
  },
  visible (instance, visible) {
    instance.setVisible(visible)
  },
  zIndex (instance, zIndex) {
    instance.setZIndex(zIndex)
  },
}

export class MarkerWithLabel extends PureComponent {
  static propTypes = MarkerWithLabelPropTypes

  static contextType = MarkerClusterContext

  constructor (props) {
    super(props)

    const NativeMarkerWithLabel = makeMarkerWithLabel(google.maps)

    this.state = {
      markerWithLabel: new NativeMarkerWithLabel()
    }

    this.containerElement = document.createElement('div')

    this.registeredEvents = []
  }

  componentDidMount () {
    this.state.markerWithLabel
      .setMap(this.context.map)

    this.context.cluster
      .addMarker(
        this.state.markerWithLabel,
        this.props.noRedraw
      )

    this.state.markerWithLabel.set('labelContent', this.containerElement)
  }

  componentDidUpdate (prevProps) {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.markerWithLabel
    })

    this.state.markerWithLabel.repaint()
  }

  componentWillUnmount () {
    unregisterEvents(this.registeredEvents)

    if (this.state.markerWithLabel) {
      if (this.context.cluster) {
        this.context.cluster.removeMarker(
          this.state.markerWithLabel,
          this.props.noRedraw
        )
      }

      this.state.markerWithLabel.setMap(null)
    }
  }

  render () {
    return createPortal(
      Children.only(this.props.children),
      this.containerElement
    )
  }

  getAnimation () {
    return this.state.markerWithLabel.getAnimation()
  }

  getClickable () {
    return this.state.markerWithLabel.getClickable()
  }

  getCursor () {
    return this.state.markerWithLabel.getCursor()
  }

  getDraggable () {
    return this.state.markerWithLabel.getDraggable()
  }

  getIcon () {
    return this.state.markerWithLabel.getIcon()
  }

  getLabel () {
    return this.state.markerWithLabel.getLabel()
  }

  getOpacity () {
    return this.state.markerWithLabel.getOpacity()
  }

  getPlace () {
    return this.state.markerWithLabel.getPlace()
  }

  getPosition () {
    return this.state.markerWithLabel.getPosition()
  }

  getShape () {
    return this.state.markerWithLabel.getShape()
  }

  getTitle () {
    return this.state.markerWithLabel.getTitle()
  }

  getVisible () {
    return this.state.markerWithLabel.getVisible()
  }

  getZIndex () {
    return this.state.markerWithLabel.getZIndex()
  }
}

export default MarkerWithLabel
