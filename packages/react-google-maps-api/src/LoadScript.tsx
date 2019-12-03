import * as React from "react"

import { injectScript } from "./utils/injectscript"
import { preventGoogleFonts } from "./utils/prevent-google-fonts"

import { isBrowser } from "./utils/isbrowser"
import { LoadScriptUrlOptions, makeLoadScriptUrl } from "./utils/make-load-script-url"

import invariant from "invariant"

let cleaningUp = false

interface LoadScriptState {
  loaded: boolean;
}

export interface LoadScriptProps extends LoadScriptUrlOptions {
  id: string;
  loadingElement?: React.ReactNode;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  onUnmount?: () => void;
  preventGoogleFontsLoading?: boolean;
}

export function DefaultLoadingElement() {
  return <div>{`Loading...`}</div>
}

export const defaultLoadScriptProps = {
  id: 'script-loader',
  version: 'weekly'
}

class LoadScript extends React.PureComponent<LoadScriptProps, LoadScriptState> {
  public static defaultProps = defaultLoadScriptProps

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

      this.isCleaningUp()
        .then(this.injectScript)
        .catch(function err (err) { console.error("Error at injecting script after cleaning up: ", err)})
    }
  }

  componentDidUpdate(prevProps: LoadScriptProps) {
    if (this.props.libraries !== prevProps.libraries) {
      console.warn('Performance warning! LoadScript has been reloaded unintentionally! You should not pass `libraries` prop as new array. Please keep an array of libraries as static class property for Components and PureComponents, or just a const variable outside of component, or somewhere in config files or ENV variables')
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

      window.setTimeout(timeoutCallback, 1)

      if (this.props.onUnmount) {
        this.props.onUnmount()
      }
    }
  }

  // eslint-disable-next-line @getify/proper-arrows/name
  isCleaningUp = async () => {
    function promiseCallback(resolve: () => void) {
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

  cleanup = () => {
    cleaningUp = true
    const script = document.getElementById(this.props.id)

    if (script && script.parentNode) {
      script.parentNode.removeChild(script)
    }

    Array.prototype.slice
      .call(document.getElementsByTagName("script"))
      .filter(function filter(script: HTMLScriptElement): boolean {
        return script.src.includes("maps.googleapis")
      })
      .forEach(function forEach(script: HTMLScriptElement): void {
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      })

    Array.prototype.slice
      .call(document.getElementsByTagName("link"))
      .filter(function filter(link: HTMLLinkElement): boolean {
        return link.href === "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Google+Sans"
      })
      .forEach(function forEach(link: HTMLLinkElement) {
        if (link.parentNode) {
          link.parentNode.removeChild(link)
        }
      })

    Array.prototype.slice
      .call(document.getElementsByTagName("style"))
      .filter(function filter(style: HTMLStyleElement): boolean {
        return style.innerText !== undefined && style.innerText.length > 0 && style.innerText.includes(".gm-")
      })
      .forEach(function forEach(style: HTMLStyleElement) {
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

    invariant(
      !!this.props.id,
      'LoadScript requires "id" prop to be a string: %s',
      this.props.id
    )

    const injectScriptOptions = {
      id: this.props.id,
      url: makeLoadScriptUrl(this.props)
    }

    injectScript(injectScriptOptions)
      // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
      .then(() => {
        if (this.props.onLoad) {
          this.props.onLoad()
        }

        this.setState(function setLoaded() {
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
          There has been an Error with loading Google Maps API script, please check that you provided correct google API key (${this.props.googleMapsApiKey || '-'}) or Client ID (${this.props.googleMapsClientId || '-'}) to <LoadScript />
          Otherwise it is a Network issue.
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
