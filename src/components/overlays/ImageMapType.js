/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  construct,
  getDerivedStateFromProps,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { MAP, IMAGEMAPTYPE } from '../../constants'
import { ImageMapTypePropTypes } from '../../proptypes'

const eventMap = {
  onTilesLoaded: 'tilesloaded',
}

const updaterMap = {
  opacity (instance, opacity) {
    instance.setOpacity(opacity)
  }
}

export class ImageMapType extends PureComponent {
  static propTypes = ImageMapTypePropTypes

  static contextTypes = {
    [MAP]: PropTypes.object,
  }

  constructor (props, context) {
    super(props, context)

    const circle = new google.maps.ImageMapType(
      props.options
    )

    this.state = {
      [IMAGEMAPTYPE]: circle,
      prevProps: construct(
        ImageMapTypePropTypes,
        updaterMap,
        props,
        circle
      )
    }

    circle.setMap(context[MAP])
  }

  static getDerivedStateFromProps (props, state) {
    return getDerivedStateFromProps(
      props,
      state,
      this.state[IMAGEMAPTYPE],
      eventMap,
      updaterMap
    )
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const circle = this.state[IMAGEMAPTYPE]

    if (circle) {
      circle.setMap(null)
    }
  }

  render () {
    return null
  }

  getOpacity = () =>
    this.state[IMAGEMAPTYPE].getOpacity()

  getTile = (tileCoord, zoom, ownerDocument) =>
    this.state[IMAGEMAPTYPE].getTile(tileCoord, zoom, ownerDocument)

  releaseTile = tileDiv =>
    this.state[IMAGEMAPTYPE].releaseTile(tileDiv)
}

export default ImageMapType
