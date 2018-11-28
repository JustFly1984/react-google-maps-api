import { Component } from 'react'
import { injectScript } from './utils/injectscript'
import { LoadScriptPropTypes } from './proptypes'

class LoadScript extends Component {
  static propTypes = LoadScriptPropTypes

  state = {
    loaded: false
  }

  componentDidMount = () => {
    const {
      id,
      googleMapsApiKey,
      language,
      region,
      version
    } = this.props

    injectScript({
      id,
      url: `https://maps.googleapis.com/maps/api/js?v=${version}&key=${googleMapsApiKey}&language=${language}&region=${region}`,
      onSuccess: () => {
        this.props.onLoad()

        this.setState(() => ({ loaded: true }))
      },
      onError: () => {
        throw new Error(`
There has been an Error with loading Google Maps API script, please check that you provided all required props to <LoadScript />
Props you have provided:

googleMapsApiKey: ${this.props.googleMapsApiKey}
language: ${this.props.language}
region: ${this.props.region}
version: ${this.props.version}

Otherwise it is a Network issues.
`
        )
      }
    })
  }

  render = () => {
    return this.props.render({
      loaded: this.state.loaded
    })
  }
}

export default LoadScript
