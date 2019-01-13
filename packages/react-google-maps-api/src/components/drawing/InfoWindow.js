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

  registeredEvents = []

  state = {
    infoWindow: null
  }

  componentDidMount = () => {
    const infoWindow = new google.maps.InfoWindow(
      Object.assign(
        {
          map: this.context
        },
        this.props.options
      )
    )

    infoWindow.setMap(this.context)

    this.containerElement = document.createElement('div')

    this.setState(
      () => ({
        infoWindow
      }),
      () => {
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
    )
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

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)

    this.state.infoWindow && this.state.infoWindow.setMap(null)
  }

  render = () =>
    this.containerElement
      ? createPortal(Children.only(this.props.children), this.containerElement)
      : null

  open = (infoWindow, anchor) => {
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

  getContent = () => this.state.infoWindow.getContent()

  getPosition = () => this.state.infoWindow.getPosition()

  getZIndex = () => this.state.infoWindow.getZIndex()
}

export default InfoWindow
