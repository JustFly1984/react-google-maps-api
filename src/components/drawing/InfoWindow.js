/* global google */
import { PureComponent, version, Children } from 'react'
import {
  // eslint-disable-next-line camelcase
  unstable_renderSubtreeIntoContainer,
  unmountComponentAtNode,
  createPortal
} from 'react-dom'
import PropTypes from 'prop-types'
import invariant from 'invariant'
import canUseDOM from 'can-use-dom'

import {
  construct,
  componentDidMount,
  componentDidUpdate,
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

    construct(
      InfoWindowPropTypes,
      updaterMap,
      this.props,
      infoWindow
    )

    infoWindow.setMap(this.context[MAP])

    this.state = {
      [INFO_WINDOW]: infoWindow,
    }

    this.getContent = this.getContent.bind(this)
    this.getPosition = this.getPosition.bind(this)
    this.getZIndex = this.getZIndex.bind(this)
  }

  componentWillMount () {
    if (!canUseDOM || this.containerElement) {
      return
    }

    if (version.match(/^16/)) {
      this.containerElement = document.createElement(`div`)
    }
  }

  componentDidMount () {
    componentDidMount(this, this.state[INFO_WINDOW], eventMap)

    if (version.match(/^16/)) {
      this.state[INFO_WINDOW].setContent(this.containerElement)

      open(this.state[INFO_WINDOW], this.context[ANCHOR])

      return
    }

    const content = document.createElement(`div`)

    unstable_renderSubtreeIntoContainer(this, Children.only(this.props.children), content)

    this.state[INFO_WINDOW].setContent(content)

    open(this.state[INFO_WINDOW], this.context[ANCHOR])
  }

  componentDidUpdate (prevProps) {
    componentDidUpdate(this, this.state[INFO_WINDOW], eventMap, updaterMap, prevProps)

    if (version.match(/^16/)) {
      return
    }

    if (this.props.children !== prevProps.children) {
      unstable_renderSubtreeIntoContainer(
        this,
        Children.only(this.props.children),
        this.state[INFO_WINDOW].getContent()
      )
    }
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const infoWindow = this.state[INFO_WINDOW]

    if (infoWindow) {
      if (!version.match(/^16/) && infoWindow.getContent()) {
        unmountComponentAtNode(infoWindow.getContent())
      }

      infoWindow.setMap(null)
    }
  }

  render () {
    return version.match(/^16/)
      ? createPortal(Children.only(this.props.children), this.containerElement)
      : null
  }

  getContent () {
    return this.state[INFO_WINDOW].getContent()
  }

  getPosition () {
    return this.state[INFO_WINDOW].getPosition()
  }

  getZIndex () {
    return this.state[INFO_WINDOW].getZIndex()
  }
}

export default InfoWindow
