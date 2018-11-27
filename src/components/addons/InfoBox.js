import { PureComponent, Children } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import canUseDOM from 'can-use-dom'
import invariant from 'invariant'
import { WithGoogleMapContext } from '../../GoogleMapProvider'

import {
  construct,
  getDerivedStateFromProps,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { MAP, ANCHOR, INFO_BOX } from '../../constants'

import { InfoBoxPropTypes } from '../../proptypes'

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
  },
}

export class InfoBox extends PureComponent {
  static propTypes = InfoBoxPropTypes

  static contextTypes = {
    [MAP]: PropTypes.object,
    [ANCHOR]: PropTypes.object,
  }

  state = {
    [INFO_BOX]: null,
  }

  constructor (props, context) {
    super(props, context)

    if (!canUseDOM || this.state[INFO_BOX]) {
      return
    }

    /* "google-maps-infobox" uses "google" as a global variable. Since we don't
     * have "google" on the server, we can not use it in server-side rendering.
     * As a result, we import "google-maps-infobox" here to prevent an error on
     * a isomorphic server.
     */
    const { InfoBox: GoogleMapsInfobox } = require('google-maps-infobox')

    const infoBox = new GoogleMapsInfobox()

    infoBox.setMap(this.context[MAP])

    this.state = {
      [INFO_BOX]: infoBox,
      prevProps: construct(
        InfoBoxPropTypes,
        updaterMap,
        this.props,
        infoBox
      )
    }

    this.contentElement = document.createElement('div')
    this.state[INFO_BOX].setContent(this.contentElement)

    open(this.state[INFO_BOX], this.context[ANCHOR])
  }

  static getDerivedStateFromProps (props, state) {
    return getDerivedStateFromProps(
      props,
      state,
      this.state[INFO_BOX],
      eventMap,
      updaterMap
    )
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const infoBox = this.state[INFO_BOX]

    if (infoBox) {
      infoBox.setMap(null)
    }
  }

  render () {
    return createPortal(
      Children.only(this.props.children),
      this.contentElement
    )
  }

  getPosition = () =>
    this.state[INFO_BOX].getPosition()

  getVisible = () =>
    this.state[INFO_BOX].getVisible()

  getZIndex = () =>
    this.state[INFO_BOX].getZIndex()
}

export default InfoBox
