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
      prevProps: {}
    }
  }

  static getDerivedStateFromProps (props, state) {
    if (props.map !== null) {
      return {
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

    return null
  }

  componentDidMount = () => {
    this.bicyclingLayer = new google.maps.BicyclingLayer()
    console.log('BicyclingLayer componentDidMount map: ', this.props.map)
    this.bicyclingLayer.setMap(this.props.map)
  }

  componentWillUnmount () {
    if (this.bicyclingLayer) {
      this.bicyclingLayer.setMap(null)
    }
  }

  render () {
    return null
  }

  getMap = () =>
    this.bicyclingLayer.getMap()
}

export default BicyclingLayer
