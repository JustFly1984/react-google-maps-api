import { PureComponent, Children } from 'react'
import {
  // eslint-disable-next-line camelcase
  unstable_renderSubtreeIntoContainer,
  unmountComponentAtNode
} from 'react-dom'
import PropTypes from 'prop-types'
import canUseDOM from 'can-use-dom'
import invariant from 'invariant'

import {
  construct,
  componentDidMount,
  componentDidUpdate,
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
      `You must provide either an anchor (typically render it inside a <Marker>) or a position props for <InfoBox>.`
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

  componentWillMount () {
    if (!canUseDOM || this.state[INFO_BOX]) {
      return
    }

    /* "google-maps-infobox" uses "google" as a global variable. Since we don't
     * have "google" on the server, we can not use it in server-side rendering.
     * As a result, we import "google-maps-infobox" here to prevent an error on
     * a isomorphic server.
     */
    const { InfoBox: GoogleMapsInfobox } = require(`google-maps-infobox`)

    const infoBox = new GoogleMapsInfobox()

    construct(
      InfoBoxPropTypes,
      updaterMap,
      this.props,
      infoBox
    )

    infoBox.setMap(this.context[MAP])

    this.setState(() => ({ [INFO_BOX]: infoBox }))
  }

  componentDidMount () {
    componentDidMount(this, this.state[INFO_BOX], eventMap)

    const content = document.createElement(`div`)

    unstable_renderSubtreeIntoContainer(
      this,
      Children.only(this.props.children),
      content
    )

    this.state[INFO_BOX].setContent(content)

    open(this.state[INFO_BOX], this.context[ANCHOR])
  }

  componentDidUpdate (prevProps) {
    componentDidUpdate(
      this,
      this.state[INFO_BOX],
      eventMap,
      updaterMap,
      prevProps
    )

    if (this.props.children !== prevProps.children) {
      unstable_renderSubtreeIntoContainer(
        this,
        Children.only(this.props.children),
        this.state[INFO_BOX].getContent()
      )
    }
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const infoBox = this.state[INFO_BOX]

    if (infoBox) {
      if (infoBox.getContent()) {
        unmountComponentAtNode(infoBox.getContent())
      }

      infoBox.setMap(null)
    }
  }

  render () {
    return false
  }

  getPosition () {
    return this.state[INFO_BOX].getPosition()
  }

  getVisible () {
    return this.state[INFO_BOX].getVisible()
  }

  getZIndex () {
    return this.state[INFO_BOX].getZIndex()
  }
}

export default InfoBox
