/* global google */
import { PureComponent } from 'react'
import { TrafficLayerPropTypes } from '../../proptypes'

const propsMap = {
  map: 'setMap',
  options: 'setOptions'
}

const propNameList = [
  'map',
  'options'
]

const defaultPropNameList = [
  'defaultOptions'
]

const defaultPropsMap = {
  defaultOptions: 'setOptions'
}

const updaterMap = {
  setOptions (instance, options) {
    instance.setOptions(options)
  },
  setMap (instance, map) {
    instance.setMap(map)
  }
}

export class TrafficLayer extends PureComponent {
  static propTypes = TrafficLayerPropTypes

  constructor (props) {
    super(props)

    this.state = {
      trafficLayer: null,
      prevProps: {}
    }
  }

  static getDerivedStateFromProps (props, state) {
    if (props.loaded && props.map !== null) {
      const trafficLayer = state.trafficLayer === null
        ? new google.maps.TrafficLayer(
          props.options || props.defaultOptions
        )
        : state.trafficLayer

      if (state.trafficLayer === null) {
        console.log('TrafficLayer componentDidMount map: ', props.map)

        trafficLayer.setMap(props.map)
      }

      return {
        trafficLayer,
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
          })
      }
    }

    return {
      prevProps: {},
      trafficLayer: state.trafficLayer
    }
  }

  componentDidMount = () => {
    console.log('TrafficLayer didMount')
  }

  componentWillUnmount () {
    if (this.state.trafficLayer !== null) {
      this.state.trafficLayer.setMap(null)
    }
  }

  render () {
    return null
  }

  getMap = () =>
    this.state.trafficLayer.getMap()
}

export default TrafficLayer
