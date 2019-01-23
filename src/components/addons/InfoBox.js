import { PureComponent, Children } from 'react'
import { createPortal } from 'react-dom'
import invariant from 'invariant'

import { InfoBoxPropTypes } from '../../proptypes'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/helper'

import MapContext from '../../map-context'

const open = (infoBox, anchor) => {
  if (anchor) {
    infoBox.open(infoBox.getMap(), anchor)
  } else if (infoBox.getPosition()) {
    infoBox.open(infoBox.getMap())
  } else {
    invariant(
      false,
      'You must provide either an anchor (typically render it inside a <Marker>) or a position props for <InfoBox>.'
    )
  }
}

const eventMap = {
  onCloseClick: 'closeclick',
  onDomReady: 'domready',
  onContentChanged: 'content_changed',
  onPositionChanged: 'position_changed',
  onZindexChanged: 'zindex_changed',
}

const updaterMap = {
  options (instance, options) {
    instance.setOptions(options)
  },
  position (instance, position) {
    instance.setPosition(position)
  },
  visible (instance, visible) {
    instance.setVisible(visible)
  },
  zIndex (instance, zIndex) {
    instance.setZIndex(zIndex)
  }
}

export class InfoBox extends PureComponent {
  static propTypes = InfoBoxPropTypes

  static contextType = MapContext

  constructor (props) {
    super(props)

    const {
      InfoBox: GoogleMapsInfobox
    } = require('google-maps-infobox')

    this.state = {
      infoBox: new GoogleMapsInfobox()
    }

    this.contentElement = document.createElement('div')

    this.registeredEvents = []
  }

  componentDidMount () {
    this.state.infoBox.setMap(this.context)

    this.state.infoBox.setContent(this.contentElement)

    open(this.state.infoBox, this.props.anchor)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: this.state.infoBox
    })
  }

  componentDidUpdate (prevProps) {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.infoBox
    })
  }

  componentWillUnmount () {
    unregisterEvents(this.registeredEvents)

    if (this.state.infoBox) {
      this.state.infoBox.setMap(null)
    }
  }

  render () {
    return createPortal(
      Children.only(this.props.children),
      this.contentElement
    )
  }

  getPosition () {
    return this.state.infoBox.getPosition()
  }

  getVisible () {
    return this.state.infoBox.getVisible()
  }

  getZIndex () {
    return this.state.infoBox.getZIndex()
  }
}

export default InfoBox
