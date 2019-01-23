/* global google */
import React, {
  PureComponent
} from 'react'
import {
  GoogleMapPropTypes
} from './proptypes'
import MapContext from './map-context'
import {
  saveInstance,
  restoreInstance
} from './utils/instance-persistance'
import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from './utils/helper'

const eventMap = {
  onDblClick: 'dblclick',
  onDragEnd: 'dragend',
  onDragStart: 'dragstart',
  onMapTypeIdChanged: 'maptypeid_changed',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onRightClick: 'rightclick',
  onTilesLoaded: 'tilesloaded',
  onBoundsChanged: 'bounds_changed',
  onCenterChanged: 'center_changed',
  onClick: 'click',
  onDrag: 'drag',
  onHeadingChanged: 'heading_changed',
  onIdle: 'idle',
  onProjectionChanged: 'projection_changed',
  onResize: 'resize',
  onTiltChanged: 'tilt_changed',
  onZoomChanged: 'zoom_changed'
}

const updaterMap = {
  extraMapTypes (map, extra) {
    extra.forEach(it => {
      map.mapTypes.set(...it)
    })
  },
  center (map, center) {
    map.setCenter(center)
  },
  clickableIcons (map, icons) {
    map.setClickableIcons(...icons)
  },
  heading (map, heading) {
    map.setHeading(heading)
  },
  mapTypeId (map, mapTypeId) {
    map.setMapTypeId(mapTypeId)
  },
  options (map, options) {
    map.setOptions(options)
  },
  streetView (map, streetView) {
    map.setStreetView(streetView)
  },
  tilt (map, tilt) {
    map.setTilt(tilt)
  },
  zoom (map, zoom) {
    map.setZoom(zoom)
  }
}

export class GoogleMap extends PureComponent {
  static propTypes = GoogleMapPropTypes

  static defaultProps = {
    id: 'defaultMapId',
    reuseSameInstance: false,
    onLoad: () => {}
  }

  constructor (props) {
    super(props)

    this.state = {
      map: null
    }

    this.registeredEvents = []

    this.mapRef = React.createRef()
  }

  getInstance () {
    const { reuseSameInstance, ...rest } = this.props

    const map = reuseSameInstance && restoreInstance(rest)

    return map || new google.maps.Map(
      this.mapRef.current, {
        ...this.props.options
      }
    )
  }

  componentDidMount () {
    this.setState(
      () => ({
        map: this.getInstance()
      }),
      () => {
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap,
          eventMap,
          prevProps: {},
          nextProps: this.props,
          instance: this.state.map
        })

        this.props.onLoad(this.state.map)
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
      instance: this.state.map
    })
  }

  componentWillUnmount () {
    if (this.props.reuseSameInstance) {
      saveInstance(this.props.id, this.state.map)
    }

    unregisterEvents(this.registeredEvents)
  }

  render () {
    return (
      <div
        id={this.props.id}
        ref={this.mapRef}
        style={this.props.mapContainerStyle}
        className={this.props.mapContainerClassName}
      >
        <MapContext.Provider
          value={this.state.map}
        >
          {
            this.state.map !== null
              ? this.props.children
              : <></>
          }
        </MapContext.Provider>
      </div>
    )
  }

  fitBounds (...args) {
    return this.state.map.fitBounds(...args)
  }

  panBy (...args) {
    return this.state.map.panBy(...args)
  }

  panTo (...args) {
    return this.state.map.panTo(...args)
  }

  panToBounds (...args) {
    return this.state.map.panToBounds(...args)
  }

  getBounds () {
    return this.state.map.getBounds()
  }

  getCenter () {
    return this.state.map.getCenter()
  }

  getClickableIcons () {
    return this.state.map.getClickableIcons()
  }

  getDiv () {
    return this.state.map.getDiv()
  }

  getHeading () {
    return this.state.map.getHeading()
  }

  getMapTypeId () {
    return this.state.map.getMapTypeId()
  }

  getProjection () {
    return this.state.map.getProjection()
  }

  getStreetView () {
    return this.state.map.getStreetView()
  }

  getTilt () {
    return this.state.map.getTilt()
  }

  getZoom () {
    return this.state.map.getZoom()
  }
}

export default GoogleMap
