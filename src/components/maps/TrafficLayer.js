/* global google */
import { PureComponent } from 'react'
import { TrafficLayerPropTypes } from '../../proptypes'
import MapContext from "../../mapcontext"

const propNameList = [
  'options'
]

const propsMap = {
  options: 'setOptions'
}

const updaterMap = {
  setOptions(instance, options) {
    instance.setOptions(options)
  }
}

export class TrafficLayer extends PureComponent {
  static propTypes = TrafficLayerPropTypes
  static contextType = MapContext

  state = {
    trafficLayer: null,
    prevProps: {}
  }

  static getDerivedStateFromProps(props, state) {
    if (this.context !== null) {
      const trafficLayer = state.trafficLayer === null
        ? new google.maps.TrafficLayer(
          props.options
        )
        : state.trafficLayer

      if (state.trafficLayer === null) {
        trafficLayer.setMap(this.context)
      }

      return {
        trafficLayer,
        prevProps: propNameList.reduce((acc, propName) => {
          if (typeof props[propName] !== 'undefined') {
            if (state.prevProps[propName] === props[propName]) {
              acc[propName] = state.prevProps[propName]

              return acc
            } else {
              console.log('props.map: ', this.context, ' props[propName] ', props[propName])
              updaterMap[propsMap[propName]](this.context, props[propName])

              acc[propName] = props[propName]

              return acc
            }
          }

          return acc
        }, {}),
      }
    }

    return {
      prevProps: {},
      trafficLayer: state.trafficLayer
    }
  }

  componentWillUnmount() {
    if (this.state.trafficLayer !== null) {
      this.state.trafficLayer.setMap(null)
    }
  }

  render() {
    return null
  }

  getMap = () =>
    this.state.trafficLayer.getMap()
}

export default TrafficLayer
