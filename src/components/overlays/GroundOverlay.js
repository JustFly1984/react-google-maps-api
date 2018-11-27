/* global google */
import { PureComponent } from 'react'
import warning from 'warning'
import { GroundOverlayPropTypes } from '../../proptypes'
import { map } from '../../utils/map'

const eventMap = {
  onDblClick: 'dblclick',
  onClick: 'click',
}

const defaultPropNameList = [
  'defaultOpacity'
]

const propNameList = [
  'opacity',
  'map'
]

const defaultPropsMap = {
  defaultOpacity: 'setOpacity'
}

const propsMap = {
  map: 'setMap',
  opacity: 'setOpacity'
}

const updaterMap = {
  setMap (instance, map) {
    instance.setMap(map)
  },
  setOpacity (instance, opacity) {
    instance.setOpacity(opacity)
  },
}

export class GroundOverlay extends PureComponent {
  static propTypes = GroundOverlayPropTypes

  constructor (props) {
    super(props)

    warning(
      !(
        props.url ||
        props.defaultUrl
      ) ||
      !(
        props.bounds ||
        props.defaultBounds
      ),
      `For GroundOveray, url and bounds are passed in to constructor and are immutable after iinstantiated. This is the behavior of Google Maps JavaScript API v3 ( See https://developers.google.com/maps/documentation/javascript/reference#GroundOverlay) Hence, use the corresponding two props provided by \`react-google-maps\`. They're prefixed with _default_ (defaultUrl, defaultBounds). In some cases, you'll need the GroundOverlay component to reflect the changes of url and bounds. You can leverage the React's key property to remount the component. Typically, just \`key={url}\` would serve your need. See https://github.com/tomchentw/react-google-maps/issues/655`
    )

    const groundOverlay = new google.maps.GroundOverlay(
      props.url || props.defaultUrl,
      props.bounds || props.defaultBounds,
      props.options || props.defaultOptions
    )

    this.state = {
      groundOverlay,
      prevProps: {},
      registered: []
    }

    groundOverlay.setMap(props.map)
  }

  static getDerivedStateFromProps (props, state) {
    state.registered.length > 0 &&
      state.registered.forEach((event, i) => {
        google.maps.event.removeListener(event)
      })

    if (props.map !== null) {
      return {
        groundOverlay: state.groundOverlay,
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
      groundOverlay: state.groundOverlay,
      prevProps: state.prevProps,
      registered: state.registered
    }
  }

  componentWillUnmount = () => {
    if (this.state.groundOverlay) {
      this.state.groundOverlay.setMap(null)
    }
  }

  render = () => null

  getBounds = () =>
    this.state.groundOverlay.getBounds()

  getMap = () =>
    this.state.groundOverlay.getMap()

  getOpacity = () =>
    this.state.groundOverlay.getOpacity()

  getUrl = () =>
    this.state.groundOverlay.getUrl()
}

export default GroundOverlay
