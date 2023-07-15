import { createRef, PureComponent, type ReactNode, type RefObject } from 'react'
import invariant from 'invariant'

import { injectScript } from './utils/injectscript'
import { preventGoogleFonts } from './utils/prevent-google-fonts'

import { isBrowser } from './utils/isbrowser'
import { LoadScriptUrlOptions, makeLoadScriptUrl } from './utils/make-load-script-url'

let cleaningUp = false

interface LoadScriptState {
  loaded: boolean
}

export interface LoadScriptProps extends LoadScriptUrlOptions {
  children?: ReactNode | undefined
  id: string
  nonce?: string | undefined
  loadingElement?: ReactNode
  onLoad?: () => void
  onError?: (error: Error) => void
  onUnmount?: () => void
  preventGoogleFontsLoading?: boolean
}

export function DefaultLoadingElement(): JSX.Element {
  return <div>{`Loading...`}</div>
}

export const defaultLoadScriptProps = {
  id: 'script-loader',
  version: 'weekly',
}

class LoadScript extends PureComponent<LoadScriptProps, LoadScriptState> {
  public static defaultProps = defaultLoadScriptProps

  check: RefObject<HTMLDivElement> = createRef()

  override state = {
    loaded: false,
  }

  cleanupCallback = (): void => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete window.google.maps

    this.injectScript()
  }

  override componentDidMount(): void {
    if (isBrowser) {
      if (window.google && window.google.maps && !cleaningUp) {
        console.error('google api is already presented')

        return
      }

      this.isCleaningUp()
        .then(this.injectScript)
        .catch(function error(err) {
          console.error('Error at injecting script after cleaning up: ', err)
        })
    }
  }

  override componentDidUpdate(prevProps: LoadScriptProps): void {
    if (this.props.libraries !== prevProps.libraries) {
      console.warn(
        'Performance warning! LoadScript has been reloaded unintentionally! You should not pass `libraries` prop as new array. Please keep an array of libraries as static class property for Components and PureComponents, or just a const variable outside of component, or somewhere in config files or ENV variables'
      )
    }

    if (isBrowser && prevProps.language !== this.props.language) {
      this.cleanup()
      // TODO: refactor to use gDSFP maybe... wait for hooks refactoring.
      this.setState(function setLoaded() {
        return {
          loaded: false,
        }
      }, this.cleanupCallback)
    }
  }

  override componentWillUnmount(): void {
    if (isBrowser) {
      this.cleanup()

      const timeoutCallback = (): void => {
        if (!this.check.current) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
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

  isCleaningUp = async (): Promise<void> => {
    function promiseCallback(resolve: () => void): void {
      if (!cleaningUp) {
        resolve()
      } else {
        if (isBrowser) {
          const timer = window.setInterval(function interval() {
            if (!cleaningUp) {
              window.clearInterval(timer)

              resolve()
            }
          }, 1)
        }
      }

      return
    }

    return new Promise(promiseCallback)
  }

  cleanup = (): void => {
    cleaningUp = true
    const script = document.getElementById(this.props.id)

    if (script && script.parentNode) {
      script.parentNode.removeChild(script)
    }

    Array.prototype.slice
      .call(document.getElementsByTagName('script'))
      .filter(function filter(script: HTMLScriptElement): boolean {
        return typeof script.src === 'string' && script.src.includes('maps.googleapis')
      })
      .forEach(function forEach(script: HTMLScriptElement): void {
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      })

    Array.prototype.slice
      .call(document.getElementsByTagName('link'))
      .filter(function filter(link: HTMLLinkElement): boolean {
        return (
          link.href === 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Google+Sans'
        )
      })
      .forEach(function forEach(link: HTMLLinkElement) {
        if (link.parentNode) {
          link.parentNode.removeChild(link)
        }
      })

    Array.prototype.slice
      .call(document.getElementsByTagName('style'))
      .filter(function filter(style: HTMLStyleElement): boolean {
        return (
          style.innerText !== undefined &&
          style.innerText.length > 0 &&
          style.innerText.includes('.gm-')
        )
      })
      .forEach(function forEach(style: HTMLStyleElement) {
        if (style.parentNode) {
          style.parentNode.removeChild(style)
        }
      })
  }

  injectScript = (): void => {
    if (this.props.preventGoogleFontsLoading) {
      preventGoogleFonts()
    }

    invariant(!!this.props.id, 'LoadScript requires "id" prop to be a string: %s', this.props.id)

    const injectScriptOptions = {
      id: this.props.id,
      nonce: this.props.nonce,
      url: makeLoadScriptUrl(this.props),
    }

    injectScript(injectScriptOptions)
      .then(() => {
        if (this.props.onLoad) {
          this.props.onLoad()
        }

        this.setState(function setLoaded() {
          return {
            loaded: true,
          }
        })

        return
      })
      .catch(err => {
        if (this.props.onError) {
          this.props.onError(err)
        }

        console.error(`
          There has been an Error with loading Google Maps API script, please check that you provided correct google API key (${this
            .props.googleMapsApiKey || '-'}) or Client ID (${this.props.googleMapsClientId ||
            '-'}) to <LoadScript />
          Otherwise it is a Network issue.
        `)
      })
  }

  override render(): ReactNode {
    return (
      <>
        <div ref={this.check} />

        {this.state.loaded
          ? this.props.children
          : this.props.loadingElement || <DefaultLoadingElement />}
      </>
    )
  }
}

export default LoadScript
