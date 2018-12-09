/* global google */
import { PureComponent } from 'react'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/helper'

import MapContext from '../../map-context'

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

  static contextType = MapContext

  state = {
    imageMapType: null
  }

  componentDidMount = () => {
    const imageMapType = new google.maps.ImageMapType(
      Object.assign(
        {
          map: this.context
        },
        this.props.options
      )
    )

    this.setState(
      () => ({
        imageMapType
      }),
      () => {
        this.state.imageMapType.setMap(this.context)
      }
    )
  }

  componentDidUpdate = prevProps => {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.imageMapType
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)

    if (this.state.imageMapType) {
      this.state.imageMapType.setMap(null)
    }
  }

  render = () => null

  getOpacity = () =>
    this.state.imageMapType.getOpacity()

  getTile = (tileCoord, zoom, ownerDocument) =>
    this.state.imageMapType.getTile(tileCoord, zoom, ownerDocument)

  releaseTile = tileDiv =>
    this.state.imageMapType.releaseTile(tileDiv)
}

export default ImageMapType
