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

  constructor (props, context) {
    super(props, context)

    this.state = {
      imageMapType: new google.maps.ImageMapType(
        Object.assign(
          {
            map: context
          },
          props.options
        )
      )
    }
  }

  componentDidMount () {
    this.state.imageMapType.setMap(this.context)
  }

  componentDidUpdate (prevProps) {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.imageMapType
    })
  }

  componentWillUnmount () {
    unregisterEvents(this.registeredEvents)

    if (this.state.imageMapType) {
      this.state.imageMapType.setMap(null)
    }
  }

  render () {
    return <></>
  }

  getOpacity () {
    return this.state.imageMapType.getOpacity()
  }

  getTile (tileCoord, zoom, ownerDocument) {
    return this.state.imageMapType.getTile(tileCoord, zoom, ownerDocument)
  }

  releaseTile (tileDiv) {
    return this.state.imageMapType.releaseTile(tileDiv)
  }
}

export default ImageMapType
