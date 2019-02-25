import * as React from "react"
import { Component, RefObject, createRef, ReactNode } from "react"

import { injectScript } from "./utils/injectscript"
import { preventGoogleFonts } from "./utils/prevent-google-fonts"

import { isBrowser } from "./utils/isbrowser"

let cleaningUp = false

interface LoadScriptState {
  loaded: boolean
}

//prettier-ignore
interface LoadScriptProps {
  id: string;
  googleMapsApiKey: string;
  language?: string;
  region?: string;
  version?: string;
  loadingElement?: ReactNode;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  onUnmount?: () => void;
  libraries?: string[];
  preventGoogleFontsLoading?: boolean;
}

class LoadScript extends Component<LoadScriptProps, LoadScriptState> {
  static defaultProps = {
    onLoad: () => {},
    onError: () => {},
    onUnmount: () => {},
    loadingElement: <div>Loading...</div>,
    preventGoogleFontsLoading: false,
    libraries: []
  }

  check: RefObject<HTMLDivElement>

  constructor(props: LoadScriptProps) {
    super(props)

    this.state = {
      loaded: false
    }

    this.check = createRef()
  }

  componentDidMount() {
    if (isBrowser) {
      // @ts-ignore
      if (window.google && !cleaningUp) {
        console.error("google api is already presented")
        return
      }

      this.isCleaningUp().then(this.injectScript)
    }
  }

  componentDidUpdate(prevProps) {
    if (isBrowser && prevProps.language !== this.props.language) {
      this.cleanup()
      // TODO: refactor to use gDSFP
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(
        () => ({
          loaded: false
        }),
        () => {
          //@ts-ignore
          delete window.google

          this.injectScript()
        }
      )
    }
  }

  componentWillUnmount() {
    if (isBrowser) {
      this.cleanup()

      setTimeout(() => {
        if (!this.check.current) {
          //@ts-ignore
          delete window.google
          cleaningUp = false
        }
      }, 1)

      this.props.onUnmount()
    }
  }

  isCleaningUp = async () => {
    return new Promise(resolve => {
      if (!cleaningUp) {
        resolve()
      } else {
        if (isBrowser) {
          const timer = window.setInterval(() => {
            if (!cleaningUp) {
              window.clearInterval(timer)

              resolve()
            }
          }, 1)
        }
      }
    })
  }

  cleanup = () => {
    cleaningUp = true
    const script = document.getElementById(this.props.id)

    if (script) {
      script.parentNode.removeChild(script)
    }

    Array.prototype.slice
      .call(document.getElementsByTagName("script"))
      .filter((script: HTMLScriptElement) =>
        script.src.includes("maps.googleapis")
      )
      .forEach((script: HTMLScriptElement) => {
        script.parentNode.removeChild(script)
      })

    Array.prototype.slice
      .call(document.getElementsByTagName("link"))
      .filter(
        (link: HTMLLinkElement) =>
          link.href ===
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Google+Sans"
      )
      .forEach((link: HTMLLinkElement) => {
        link.parentNode.removeChild(link)
      })

    Array.prototype.slice
      .call(document.getElementsByTagName("style"))
      .filter((style: HTMLStyleElement) => style.innerText.includes(".gm-"))
      .forEach((style: HTMLStyleElement) => {
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
        libraries ? `&libraries=${libraries.join(",")}` : ""
      }`
    })
      .then(() => {
        this.props.onLoad()

        this.setState(() => ({
          loaded: true
        }))
      })

      .catch(err => {
        this.props.onError(err)

        throw new Error(`
There has been an Error with loading Google Maps API script, please check that you provided all required props to <LoadScript />
Props you have provided:
googleMapsApiKey: ${this.props.googleMapsApiKey}
language: ${this.props.language}
region: ${this.props.region}
version: ${this.props.version}
libraries: ${(this.props.libraries || []).join(",")}
Otherwise it is a Network issues.
`)
      })
  }

  render() {
    return (
      <div ref={this.check}>
        {this.state.loaded ? this.props.children : this.props.loadingElement}
      </div>
    )
  }
}

export default LoadScript
