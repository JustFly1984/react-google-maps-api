/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import invariant from 'invariant'

import { GoogleMapProviderPropTypes } from './proptypes'

let isInstalled = false

const LoadScriptPropTypes = {
  googleMapsApiKey: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  onLoad: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired
}
export class LoadScript extends PureComponent {
  static propTypes = LoadScriptPropTypes

  constructor (props) {
    super(props)

    this.state = {
      loaded: false
    }

    invariant(
      props.googleMapsApiKey,
      'Required prop googleMapsApiKey is missingin <LoadScript />.'
    )
    invariant(
      props.language,
      'Required prop language is missing in <LoadScript />.'
    )
    invariant(
      props.region,
      'Required prop region is missing in <LoadScript />.'
    )

    invariant(
      props.version,
      'Required prop version is missing in <LoadScript />.'
    )
  }

  componentDidMount = () => {
    if (!isInstalled) {
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

        this.props.onLoad()
        this.setState(() => ({ loaded: true }))
      })
    }

    if (isInstalled) {
      this.props.onLoad()
      this.setState(() => ({ loaded: true }))
    }
  }

  render = () => this.props.render({
    loaded: this.state.loaded
  })
}

export class GoogleMapProvider extends PureComponent {
  static propTypes = GoogleMapProviderPropTypes

  state = {
    map: null
  }

  static getDerivedStateFromProps (props) {
    invariant(
      !!props.loadingElement,
      'Required prop loadingElement is missing in <GoogleMapProvider />.'
    )

    return null
  }

  componentDidMount = () => {
    console.log(`Provider id ${this.props.id} did mount`)
  }

  getRef = ref => {
    this.setState(
      () => ({
        map: new google.maps.Map(ref)
      })
    )
  }

  render = () => (
    this.props.loaded
  )
    ? this.props.render({
      map: this.state.map,
      mapRef: this.getRef
    })
    : this.props.loadingElement
}

export default GoogleMapProvider
