/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  construct,
  componentDidMount,
  componentDidUpdate,
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

    construct(
      ImageMapTypePropTypes,
      updaterMap,
      props,
      circle
    )

    circle.setMap(context[MAP])

    this.state = {
      [IMAGEMAPTYPE]: circle,
    }

    this.getOpacity = this.getOpacity.bind(this)
  }

  componentDidMount () {
    componentDidMount(this, this.state[IMAGEMAPTYPE], eventMap)
  }

  componentDidUpdate (prevProps) {
    componentDidUpdate(this, this.state[IMAGEMAPTYPE], eventMap, updaterMap, prevProps)
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const circle = this.state[IMAGEMAPTYPE]

    if (circle) {
      circle.setMap(null)
    }
  }

  render () {
    return false
  }

  getOpacity () {
    return this.state[IMAGEMAPTYPE].getOpacity()
  }

  getTile (tileCoord, zoom, ownerDocument) {
    return this.state[IMAGEMAPTYPE].getTile(tileCoord, zoom, ownerDocument)
  }

  releaseTile (tileDiv) {
    return this.state[IMAGEMAPTYPE].releaseTile(tileDiv)
  }
}

export default ImageMapType
