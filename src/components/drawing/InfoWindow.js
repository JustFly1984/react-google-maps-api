/* global google */
import { PureComponent, Children } from 'react'
import { createPortal } from 'react-dom'
import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/helper'

import MapContext from '../../map-context'
import invariant from 'invariant'

import { InfoWindowPropTypes } from '../../proptypes'

const eventMap = {
  onCloseClick: 'closeclick',
  onContentChanged: 'content_changed',
  onDomReady: 'domready',
  onPositionChanged: 'position_changed',
  onZindexChanged: 'zindex_changed'
}

const updaterMap = {
  open (instance, options) {
    instance.open(options)
  },
  close (instance) {
    instance.close()
  },
  options (instance, options) {
    instance.setOptions(options)
  },
  position (instance, position) {
    instance.setPosition(position)
  },
  zIndex (instance, zIndex) {
    instance.setZIndex(zIndex)
  }
}

export class InfoWindow extends PureComponent {
  static propTypes = InfoWindowPropTypes

  static contextType = MapContext

  constructor (props, context) {
    super(props, context)

    this.state = {
      infoWindow: new google.maps.InfoWindow(
        Object.assign(
          {
            map: context
          },
          props.options
        )
      )
    }

    this.containerElement = document.createElement('div')

    this.registeredEvents = []
  }

  componentDidMount () {
    this.state.infoWindow.setMap(this.context)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: this.state.infoWindow
    })

    this.state.infoWindow.setContent(this.containerElement)

    this.open(this.state.infoWindow, this.props.anchor)
  }

  componentDidUpdate (prevProps) {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.infoWindow
    })
  }

  componentWillUnmount () {
    unregisterEvents(this.registeredEvents)

    if (this.state.infoWindow) {
      this.state.infoWindow.setMap(null)
    }
  }

  render () {
    return this.containerElement !== null
      ? createPortal(
        Children.only(this.props.children),
        this.containerElement
      )
      : null
  }

  open (infoWindow, anchor) {
    if (anchor) {
      infoWindow.open(infoWindow.getMap(), anchor)
    } else if (infoWindow.getPosition()) {
      infoWindow.open(infoWindow.getMap())
    } else {
      invariant(
        false,
        `You must provide either an anchor (typically render it inside a <Marker>) or a position props for <InfoWindow>.`
      )
    }
  }

  getContent () {
    return this.state.infoWindow.getContent()
  }

  getPosition () {
    return this.state.infoWindow.getPosition()
  }

  getZIndex () {
    return this.state.infoWindow.getZIndex()
  }
}

export default InfoWindow
