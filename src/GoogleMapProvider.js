/* global google */
import React, { PureComponent, Component, createContext } from 'react'
import PropTypes from 'prop-types'
import invariant from 'invariant'

let isInstalled = false
let isLoading = false

const GoogleMapProviderPropTypes = {
  children: PropTypes.node.isRequired,
  loadingElement: PropTypes.node.isRequired,
  googleMapsApiKey: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired
}

export const GoogleMapContext = createContext('map')

export class GoogleMapProvider extends PureComponent {
  static propTypes = GoogleMapProviderPropTypes

  constructor (props) {
    super(props)

    this.state = {
      loaded: false,
      map: null
    }
  }

  static getDerivedStateFromProps (props, state) {
    invariant(
      !!props.loadingElement,
      'Required prop loadingElement is missing in <GoogleMapProvider />.'
    )
    invariant(
      props.googleMapsApiKey,
      'Required prop googleMapsApiKey is missingin <GoogleMapProvider />.'
    )
    invariant(
      props.googleMapsApiKey,
      'Required prop googleMapsApiKey is missing in <GoogleMapProvider />.'
    )
    invariant(
      props.language,
      'Required prop language is missing in <GoogleMapProvider />.'
    )
    invariant(
      props.region,
      'Required prop region is missing in <GoogleMapProvider />.'
    )

    invariant(
      props.version,
      'Required prop version is missing in <GoogleMapProvider />.'
    )

    if (isInstalled && !isLoading) {
      return {
        loaded: true
      }
    }

    return null
  }

  componentDidMount = () => {
    console.log('provider did mount')
    if (!isInstalled && !isLoading) {
      isLoading = true

      const scriptjs = require(`scriptjs`)

      const {
        googleMapsApiKey,
        language,
        region,
        version
      } = this.props

      scriptjs([`https://maps.googleapis.com/maps/api/js?v=${version}&key=${googleMapsApiKey}&language=${language}&region=${region}`], 'googlemaps')

      scriptjs.ready('googlemaps', () => {
        isInstalled = true
        isLoading = false

        this.setState(() => ({ loaded: true }))
      })
    }

    if (isInstalled && !isLoading) {
      this.setState(() => ({ loaded: true }))
    }
  }

  getRef = ref => {
    this.setState(
      () => ({
        map: new google.maps.Map(ref)
      })
    )
  }

  render = () => {
    const value = { // eslint-disable-line react-perf/jsx-no-new-object-as-prop
      map: this.state.map,
      mapRef: this.getRef
    }

    console.log('value: ', value)

    return (
      <GoogleMapContext.Provider
        value={value}
      >
        {
          (
            isInstalled &&
            !isLoading &&
            this.state.loaded
          )
            ? this.props.children
            : this.props.loadingElement
        }
      </GoogleMapContext.Provider>
    )
  }
}

export const withGoogleMapContext = BaseComponent => {
  console.log('withGoogleMapContext BaseComponent: ', BaseComponent)
  return class GoogleMapContextContainer extends Component {
    render = () => (
      <GoogleMapContext.Consumer>
        {
          ({ map, mapRef }) => {
            console.log('map: ', map, ' mapRef: ', mapRef)
            return (
              <BaseComponent
                map={map}
                mapRef={mapRef}
                {...this.props}
              />
            )
          }
        }
      </GoogleMapContext.Consumer>
    )
  }
}

export default GoogleMapProvider
