/* global google */
/* eslint-disable filenames/match-regex */
import React, { PureComponent, Children, cloneElement } from 'react'
import invariant from 'invariant'

import { GoogleMapPropTypes } from '../../proptypes'
import { map } from '../../utils/map'

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
  onZoomChanged: 'zoom_changed',
}

const defaultPropNameList = [
  'defaultExtraMapTypes',
  'defaultCenter',
  'defaultClickableIcons',
  'defaultHeading',
  'defaultMapTypeId',
  'defaultOptions',
  'defaultStreetView',
  'streetView',
  'defaultTilt',
  'defaultZoom'
]

const propNameList = [
  'center',
  'clickableIcons',
  'heading',
  'mapTypeId',
  'options',
  'streetView',
  'tilt',
  'zoom'
]

const defaultPropsMap = {
  defaultExtraMapTypes: 'setExtraMapTypes',
  defaultCenter: 'setCenter',
  defaultClickableIcons: 'setClickableIcons',
  defaultHeading: 'setHeading',
  defaultMapTypeId: 'setMapTypeId',
  defaultOptions: 'setOptions',
  defaultStreetView: 'setStreetView',
  defaultTilt: 'setTilt',
  defaultZoom: 'setZoom',
}

const propsMap = {
  extraMapTypes: 'setExtraMapTypes',
  center: 'setCenter',
  clickableIcons: 'setClickableIcons',
  heading: 'setHeading',
  mapTypeId: 'setMapTypeId',
  options: 'setOptions',
  streetView: 'setStreetView',
  tilt: 'setTilt',
  zoom: 'setZoom'
}

const updaterMap = {
  setExtraMapTypes (map, extra) {
    extra.forEach(it => map.mapTypes.set(...it))
  },
  setCenter (map, ...args) {
    map.setCenter(...args)
  },
  setClickableIcons (map, ...args) {
    map.setClickableIcons(...args)
  },
  setHeading (map, ...args) {
    map.setHeading(...args)
  },
  setMapTypeId (map, ...args) {
    map.setMapTypeId(...args)
  },
  setOptions (map, ...args) {
    map.setOptions(...args)
  },
  setStreetView (map, ...args) {
    map.setStreetView(...args)
  },
  setTilt (map, ...args) {
    map.setTilt(...args)
  },
  setZoom (map, ...args) {
    map.setZoom(...args)
  }
}

export class GoogleMap extends PureComponent {
  static propTypes = GoogleMapPropTypes

  constructor (props) {
    super(props)

    this.state = {
      prevProps: {},
      registered: []
    }

    invariant(
      typeof props.map !== 'undefined',
      'Did you wrap <GoogleMap> component with <GoogleMapProvider />?'
    )

    invariant(
      typeof props.mapContainerClassName !== 'undefined' || typeof props.mapContainerStyle !== 'undefined',
      'Did you set mapContainerClassName or mapContainerStyle props to <GoogleMap> component ? You need to set one of them, or map will be invisible.'
    )
  }

  componentDidMount = () => {
    console.log('GoogleMap this.props.loaded: ', this.props.loaded)
  }

  static getDerivedStateFromProps (props, state) {
    state.registered.length > 0 &&
    state.registered.forEach((event, i) => {
      google.maps.event.removeListener(event)
    })

    if (props.map !== null) {
      return {
        prevProps: Object.keys(state.prevProps).length === 0
          ? defaultPropNameList.reduce((acc, propName) => {
            if (typeof props[propName] !== 'undefined') {
              const shortPropName = propName.slice(7).toLowerCase()

              updaterMap[defaultPropsMap[propName]](props.map, props[propName])

              acc[shortPropName] = props[propName]
            }

            return acc
          }, {})
          : propNameList.reduce((acc, propName) => {
            if (typeof props[propName] !== 'undefined') {
              if (state.prevProps[propName] === props[propName]) {
                acc[propName] = state.prevProps[propName]

                return acc
              } else {
                updaterMap[propsMap[propName]](props.map, props[propName])

                acc[propName] = props[propName]

                return acc
              }
            }

            return acc
          }),
        registered: map(eventMap, (googleEventName, onEventName) => {
          typeof props[onEventName] === 'function' &&
            google.maps.event.addListener(props.map, googleEventName, props[onEventName])
        })
      }
    }

    return {
      prevProps: {},
      registered: []
    }
  }

  componentWillUnmount = () => {
    this.state.registered.forEach(event => {
      google.maps.event.removeListener(event)
    })
  }

  getRef = ref => {
    this.mapRef = ref
  }

  render = () => (
    <div
      ref={this.props.mapRef}
      style={this.props.mapContainerStyle}
      className={this.props.mapContainerClassName}
    >
      {
        this.props.loaded &&
        Children.map(this.props.children, child => {
          return child !== null
            ? cloneElement(child, {
              map: this.props.map,
              loaded: this.props.loaded
            })
            : child
        })
      }
    </div>
  )

  fitBounds = (...args) =>
    this.props.map.fitBounds(...args)

  panBy = (...args) =>
    this.props.map.panBy(...args)

  panTo = (...args) =>
    this.props.map.panTo(...args)

  panToBounds = (...args) =>
    this.props.map.panToBounds(...args)

  getBounds = () =>
    this.props.map.getBounds()

  getCenter = () =>
    this.props.map.getCenter()

  getClickableIcons = () =>
    this.props.map.getClickableIcons()

  getDiv = () =>
    this.props.map.getDiv()

  getHeading = () =>
    this.props.map.getHeading()

  getMapTypeId = () =>
    this.props.map.getMapTypeId()

  getProjection = () =>
    this.props.map.getProjection()

  getStreetView = () =>
    this.props.map.getStreetView()

  getTilt = () =>
    this.props.map.getTilt()

  getZoom = () =>
    this.props.map.getZoom()
}

export default GoogleMap
