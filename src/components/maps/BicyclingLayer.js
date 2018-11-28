/* global google */
import { PureComponent } from 'react'
import { BicyclingLayerPropTypes } from '../../proptypes'

const propsMap = {
  map: 'setMap'
}

const propNameList = [
  'map'
]

const updaterMap = {
  setMap (instance, map) {
    instance.setMap(map)
  }
}

export class BicyclingLayer extends PureComponent {
  static propTypes = BicyclingLayerPropTypes

  constructor (props) {
    super(props)

    this.state = {
      bicyclingLayer: null,
      prevProps: {}
    }
  }

  static getDerivedStateFromProps (props, state) {
    console.log('BicyclingLayer getDerivedStateFromProps map: ', props.map)
    if (props.map !== null) {
      const bicyclingLayer = state.bicyclingLayer === null
        ? new google.maps.BicyclingLayer()
        : state.bicyclingLayer

      if (state.bicyclingLayer === null) {
        console.log('BicyclingLayer componentDidMount map: ', props.map)

        bicyclingLayer.setMap(props.map)
      }

      return {
        bicyclingLayer,
        prevProps: propNameList.reduce((acc, propName) => {
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
      bicyclingLayer: state.bicyclingLayer,
      prevProps: state.prevProps
    }
  }

  componentDidMount = () => {
    console.log('BicyclingLayer didMount')
  }

  componentWillUnmount () {
    if (this.state.bicyclingLayer !== null) {
      this.state.bicyclingLayer.setMap(null)
    }
  }

  render () {
    return null
  }

  getMap = () =>
    this.state.bicyclingLayer.getMap()
}

export default BicyclingLayer
