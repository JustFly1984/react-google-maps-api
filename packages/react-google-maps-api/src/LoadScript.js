import React, { Component } from 'react'
import { injectScript } from './utils/injectscript'
import { LoadScriptPropTypes } from './proptypes'
import { preventGoogleFonts } from './utils/prevent-google-fonts'

let cleaningUp = false;

class LoadScript extends Component {
  static propTypes = LoadScriptPropTypes
  static defaultProps = {
    onLoad: () => {},
    onError: () => {},
    onUnmount: () => {},
  }

  state = {
    loaded: false
  }

  check = React.createRef()

  componentDidMount = async () => {
    if ( window.google && !cleaningUp ) {
      console.error("google api is already presented");
      return;
    }
    await this.isCleaningUp()
    this.injectScript()
  }

  componentDidUpdate = prevProps => {
    if (prevProps.language !== this.props.language) {
      this.cleanup()
      this.setState(
        () => ({
          loaded: false
        }),
        () => {
          delete window.google
  
          this.injectScript()
        }
      )      
    }
  }

  componentWillUnmount = () => {
    this.cleanup()
    setTimeout( () => {
      if (!this.check.current) {
        delete window.google
        cleaningUp = false;
      }
    }, 1 );
    this.props
      .onUnmount()
  } 

  isCleaningUp = () => {
    return new Promise( resolve => {
      if (!cleaningUp) {
        resolve()
      }
      else {
        const timer = setInterval(() => {
          if (!cleaningUp) {
            clearInterval(timer)
            resolve()
          }
        }, 1)
      }
    } );
  }
  cleanup = () => {
    cleaningUp = true
    const script = document.getElementById(this.props.id)

    script.parentNode.removeChild(script)

    Array.prototype.slice
      .call(document.getElementsByTagName('script'))
      .filter(script => script.src.includes('maps.googleapis'))
      .forEach(script => {
        script.parentNode.removeChild(script)
      })

    Array.prototype.slice
      .call(document.getElementsByTagName('link'))
      .filter(
        link =>
          link.href === 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Google+Sans'
      )
      .forEach(link => {
        link.parentNode.removeChild(link)
      })

    Array.prototype.slice
      .call(document.getElementsByTagName('style'))
      .filter(style => style.innerText.includes('.gm-'))
      .forEach(style => {
        style.parentNode.removeChild(style)
      })
  }

  injectScript = () => {
    const {
      id,
      googleMapsApiKey,
      language,
      region,
      version,
      libraries,
      preventGoogleFontsLoading
    } = this.props

    if (preventGoogleFontsLoading) {
      preventGoogleFonts()
    }

    injectScript({
      id,
      url: `https://maps.googleapis.com/maps/api/js?v=${version}&key=${googleMapsApiKey}&language=${language}&region=${region}${
        libraries ? `&libraries=${libraries.join(',')}` : ''
      }`,
      onSuccess: () => {
        this.props.onLoad()

        this.setState(
          () => ({
            loaded: true
          })
        )
      },
      onError: () => {
        throw new Error(`
There has been an Error with loading Google Maps API script, please check that you provided all required props to <LoadScript />
Props you have provided:

googleMapsApiKey: ${this.props.googleMapsApiKey}
language: ${this.props.language}
region: ${this.props.region}
version: ${this.props.version}
libraries: ${(this.props.libraries || []).join(',')}

Otherwise it is a Network issues.
`)
      }
    })
  }

  render = () => <div ref={this.check}>{this.state.loaded ? this.props.children : this.props.loadingElement}</div>
}

export default LoadScript
