import { PureComponent, Children } from 'react'
import { createPortal } from 'react-dom'
import invariant from 'invariant'

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

const propsMap = {
  map: 'setMap',
  options: 'setOptions',
  position: 'setPosition',
  visible: 'setVisible',
  zIndex: 'setZIndex'
}

const propNameList = [
  'map',
  'options',
  'position',
  'visible',
  'zIndex'
]

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

  state = {
    infoBox: null,
    prevProps: {},
    registered: []
  }

  constructor (props) {
    super(props)

    const { InfoBox: GoogleMapsInfobox } = require('google-maps-infobox')

    const infoBox = new GoogleMapsInfobox()

    infoBox.setMap(props.map)

    this.contentElement = document.createElement('div')

    this.state.infoBox.setContent(this.contentElement)

    open(this.state.infoBox, this.props.anchor)
  }

  static getDerivedStateFromProps (props, state) {

  }

  componentWillUnmount = () => {
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

  getPosition = () =>
    this.state.infoBox.getPosition()

  getVisible = () =>
    this.state.infoBox.getVisible()

  getZIndex = () =>
    this.state.infoBox.getZIndex()
}

export default InfoBox
