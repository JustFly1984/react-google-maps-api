/* global google */
import { PureComponent, Children } from 'react'
import PropTypes from 'prop-types'
import makeMarkerWithLabel from 'markerwithlabel'
import {
  // eslint-disable-next-line camelcase
  unstable_renderSubtreeIntoContainer,
  unmountComponentAtNode
} from 'react-dom'

import {
  componentDidMount,
  componentDidUpdate,
  componentWillUnmount,
  construct
} from '../../utils/MapChildHelper'

import { MAP, MARKER_CLUSTERER, MARKER_WITH_LABEL } from '../../constants'
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

  static defaultProps = {
    labelVisible: true,
  }

  static contextTypes = {
    [MAP]: PropTypes.object,
    [MARKER_CLUSTERER]: PropTypes.object,
  }

  constructor (props, context) {
    super(props, context)

    const NativeMarkerWithLabel = makeMarkerWithLabel(google.maps)

    const markerWithLabel = new NativeMarkerWithLabel()

    construct(
      MarkerWithLabelPropTypes,
      updaterMap,
      props,
      markerWithLabel
    )

    const markerClusterer = this.context[MARKER_CLUSTERER]

    this.getAnimation = this.getAnimation.bind(this)
    this.getClickable = this.getClickable.bind(this)
    this.getCursor = this.getCursor.bind(this)
    this.getDraggable = this.getDraggable.bind(this)
    this.getIcon = this.getIcon.bind(this)
    this.getLabel = this.getLabel.bind(this)
    this.getOpacity = this.getOpacity.bind(this)
    this.getPlace = this.getPlace.bind(this)
    this.getPosition = this.getPosition.bind(this)
    this.getShape = this.getShape.bind(this)
    this.getTitle = this.getTitle.bind(this)
    this.getVisible = this.getVisible.bind(this)
    this.getZIndex = this.getZIndex.bind(this)

    if (markerClusterer) {
      markerClusterer.addMarker(markerWithLabel, !!props.noRedraw)
    } else {
      markerWithLabel.setMap(this.context[MAP])
    }

    this.state = {
      [MARKER_WITH_LABEL]: markerWithLabel,
    }
  }

  componentDidMount () {
    componentDidMount(this, this.state[MARKER_WITH_LABEL], eventMap)

    const container = document.createElement(`div`)

    unstable_renderSubtreeIntoContainer(this, Children.only(this.props.children), container)

    this.state[MARKER_WITH_LABEL].set(`labelContent`, container)
  }

  componentDidUpdate (prevProps) {
    componentDidUpdate(this, this.state[MARKER_WITH_LABEL], eventMap, updaterMap, prevProps)

    if (this.props.children !== prevProps.children) {
      unstable_renderSubtreeIntoContainer(
        this,
        Children.only(this.props.children),
        this.state[MARKER_WITH_LABEL].get('labelContent')
      )
    }
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const markerWithLabel = this.state[MARKER_WITH_LABEL]

    if (markerWithLabel) {
      const markerClusterer = this.context[MARKER_CLUSTERER]

      if (markerClusterer) {
        markerClusterer.removeMarker(markerWithLabel, !!this.props.noRedraw)
      }

      if (markerWithLabel.get('labelContent')) {
        unmountComponentAtNode(markerWithLabel.get('labelContent'))
      }
      markerWithLabel.setMap(null)
    }
  }

  render () {
    return false
  }

  getAnimation () {
    return this.state[MARKER_WITH_LABEL].getAnimation()
  }

  getClickable () {
    return this.state[MARKER_WITH_LABEL].getClickable()
  }

  getCursor () {
    return this.state[MARKER_WITH_LABEL].getCursor()
  }

  getDraggable () {
    return this.state[MARKER_WITH_LABEL].getDraggable()
  }

  getIcon () {
    return this.state[MARKER_WITH_LABEL].getIcon()
  }

  getLabel () {
    return this.state[MARKER_WITH_LABEL].getLabel()
  }

  getOpacity () {
    return this.state[MARKER_WITH_LABEL].getOpacity()
  }

  getPlace () {
    return this.state[MARKER_WITH_LABEL].getPlace()
  }

  getPosition () {
    return this.state[MARKER_WITH_LABEL].getPosition()
  }

  getShape () {
    return this.state[MARKER_WITH_LABEL].getShape()
  }

  getTitle () {
    return this.state[MARKER_WITH_LABEL].getTitle()
  }

  getVisible () {
    return this.state[MARKER_WITH_LABEL].getVisible()
  }

  getZIndex () {
    return this.state[MARKER_WITH_LABEL].getZIndex()
  }
}

export default MarkerWithLabel
