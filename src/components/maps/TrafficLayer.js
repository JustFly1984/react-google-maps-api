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

  state = {
    trafficLayer: null,
    prevProps: {}
  }

  static getDerivedStateFromProps (props, state) {
    if (props.map !== null) {
      const trafficLayer = state.trafficLayer === null
        ? new google.maps.TrafficLayer(
          props.options
        )
        : state.trafficLayer

      if (state.trafficLayer === null) {
        console.log('TrafficLayer componentDidMount map: ', props.map)

        trafficLayer.setMap(props.map)
      }

      return {
        trafficLayer,
        prevProps: Object.keys(state.prevProps).length !== 0
          ? propNameList.reduce((acc, propName) => {
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
          : state.prevProps
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
