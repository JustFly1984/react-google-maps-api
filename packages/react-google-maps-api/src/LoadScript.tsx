import * as React from "react"

import { injectScript } from "./utils/injectscript"
import { preventGoogleFonts } from "./utils/prevent-google-fonts"

import { isBrowser } from "./utils/isbrowser"

let cleaningUp = false

interface LoadScriptState {
  loaded: boolean;
}

export interface LoadScriptProps {
  // required
  googleMapsApiKey: string;
  id?: string;
  version?: string;
  language?: string;
  region?: string;
  libraries?: string[];
  loadingElement?: React.ReactNode;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  onUnmount?: () => void;
  preventGoogleFontsLoading?: boolean;
}

const DefaultLoadingElement = () => (
  <div>{`Loading...`}</div>
)

class LoadScript extends React.PureComponent<LoadScriptProps, LoadScriptState> {
  public static defaultProps = {
    id: 'script-loader',
    version: 'weekly',
    libraries: [] // Do not remove!,
  }

  check: React.RefObject<HTMLDivElement> = React.createRef()

  state = {
    loaded: false
  }

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  cleanupCallback = () => {
    //@ts-ignore
    delete window.google

    this.injectScript()
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

  componentDidUpdate(prevProps: LoadScriptProps) {
    if (this.props.libraries !== prevProps.libraries) {
      console.warn('Performance warning! Loadscript has been reloaded unintentionally! You should not pass `libraries` prop as new array. Please keep an array of libraries as static class property for Components and PureComponents, or just a const variable ounside of component, or somwhere in config files or ENV variables')
    }

    if (
      isBrowser &&
      prevProps.language !== this.props.language
    ) {
      this.cleanup()
      // TODO: refactor to use gDSFP maybe... wait for hooks refactoring.
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(
        function setLoaded() {
          return {
            loaded: false
          }
        },
        this.cleanupCallback
      )
    }
  }

  componentWillUnmount() {
    if (isBrowser) {
      this.cleanup()

      // eslint-disable-next-line @getify/proper-arrows/this
      const timeoutCallback = () => {
        if (!this.check.current) {
          //@ts-ignore
          delete window.google
          cleaningUp = false
        }
      }

      setTimeout(timeoutCallback, 1)

      if (this.props.onUnmount) {
        this.props.onUnmount()
      }
    }
  }

  // eslint-disable-next-line @getify/proper-arrows/name
  isCleaningUp = async () => {
    function promiseCallback (resolve: () => void) {
      if (!cleaningUp) {
        resolve()
      } else {
        if (isBrowser) {
          const timer = window.setInterval(
            function interval() {
              if (!cleaningUp) {
                window.clearInterval(timer)

                resolve()
              }
            },
            1
          )
        }
      }
    }

    return new Promise(promiseCallback)
  }

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  cleanup = () => {
    cleaningUp = true
    const script = document.getElementById(this.props.id)

    if (script && script.parentNode) {
      script.parentNode.removeChild(script)
    }

    Array.prototype.slice
      .call(document.getElementsByTagName("script"))
      .filter(function filter (script: HTMLScriptElement) {
        return script.src.includes("maps.googleapis")
      })
      .forEach(function forEach (script: HTMLScriptElement) {
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      })

    Array.prototype.slice
      .call(document.getElementsByTagName("link"))
      .filter(function filter (link: HTMLLinkElement) {
        link.href ===
        "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Google+Sans"
      })
      .forEach(function forEach (link: HTMLLinkElement) {
        if (link.parentNode) {
          link.parentNode.removeChild(link)
        }
      })

    Array.prototype.slice
      .call(document.getElementsByTagName("style"))
      .filter(function filter (style: HTMLStyleElement) {
        return style.innerText.includes(".gm-")
      })
      .forEach(function forEach (style: HTMLStyleElement) {
        if (style.parentNode) {
          style.parentNode.removeChild(style)
        }
      })
  }

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  injectScript = () => {
    if (this.props.preventGoogleFontsLoading) {
      preventGoogleFonts()
    }

    const params = [`key=${this.props.googleMapsApiKey}`]

    if (this.props.version) {
      params.push(`v=${this.props.version}`)
    }

    if (this.props.language) {
      params.push(`language=${this.props.language}`)
    }

    if (this.props.region) {
      params.push(`region=${this.props.region}`)
    }

    if (this.props.libraries.length) {
      params.push(`&libraries=${this.props.libraries.join(",")}`)
    }

    const injectScriptOptions = {
      id: this.props.id,
      url: `https://maps.googleapis.com/maps/api/js?${params.join('&')}`
    }

    injectScript(injectScriptOptions)
      // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
      .then(() => {
        if (this.props.onLoad) {
          this.props.onLoad()
        }

        this.setState(function setLoaded () {
          return {
            loaded: true
          }
        })
      })
      // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
      .catch(err => {
        if (this.props.onError) {
          this.props.onError(err)
        }

        console.error(`
          There has been an Error with loading Google Maps API script, please check that you provided correct google API key to <LoadScript /> (${this.props.googleMapsApiKey})
          Otherwise it is a Network issues.
        `)
      })
  }

  render() {
    return (
      <>
        <div ref={this.check} />

        {
          this.state.loaded
            ? this.props.children
            : (this.props.loadingElement || <DefaultLoadingElement />)
        }
      </>
    )
  }
}

export default LoadScript
