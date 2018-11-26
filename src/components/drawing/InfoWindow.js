/* global google */
import { PureComponent, Children } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import invariant from 'invariant'

import {
  construct,
  getDerivedStateFromProps,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { MAP, ANCHOR, INFO_WINDOW } from '../../constants'

import { InfoWindowPropTypes } from '../../proptypes'

const open = (infoWindow, anchor) => {
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

const eventMap = {
  onCloseClick: 'closeclick',
  onContentChanged: 'content_changed',
  onDomReady: 'domready',
  onPositionChanged: 'position_changed',
  onZindexChanged: 'zindex_changed',
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
  },
}

export class InfoWindow extends PureComponent {
  static propTypes = InfoWindowPropTypes

  static contextTypes = {
    [MAP]: PropTypes.object,
    [ANCHOR]: PropTypes.object,
  }

  constructor (props, context) {
    super(props, context)

    const infoWindow = new google.maps.InfoWindow(
      props.options
    )

    this.state = {
      [INFO_WINDOW]: infoWindow,
      prevProps: construct(
        InfoWindowPropTypes,
        updaterMap,
        this.props,
        infoWindow
      )
    }

    infoWindow.setMap(this.context[MAP])

    this.containerElement = document.createElement('div')
    this.state[INFO_WINDOW].setContent(this.containerElement)

    open(this.state[INFO_WINDOW], this.context[ANCHOR])
  }

  static getDerivedStateFromProps (props, state) {
    return getDerivedStateFromProps(
      props,
      state,
      this.state[INFO_WINDOW],
      eventMap,
      updaterMap
    )
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const infoWindow = this.state[INFO_WINDOW]

    if (infoWindow) {
      infoWindow.setMap(null)
    }
  }

  render () {
    return createPortal(
      Children.only(this.props.children),
      this.containerElement
    )
  }

  getContent = () =>
    this.state[INFO_WINDOW].getContent()

  getPosition = () =>
    this.state[INFO_WINDOW].getPosition()

  getZIndex = () =>
    this.state[INFO_WINDOW].getZIndex()
}

export default InfoWindow
