import { Component, type JSX, type ReactNode } from 'react'

type ScriptLoadedState = {
  scriptLoaded: boolean
}

type ScriptLoadedProps = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  children: ReactNode | ReactNode[] | Function
}

function SpanIntro(): JSX.Element {
  return (
    <span>
      <a href='#section-introduction'>Enter API Key</a> to see examples
    </span>
  )
}

class ScriptLoaded extends Component<ScriptLoadedProps, ScriptLoadedState> {
  interval: number | undefined

  constructor(props: ScriptLoadedProps) {
    super(props)

    this.state = {
      scriptLoaded: !!window.google,
    }

    this.interval = window.setInterval(this.checkIfScriptLoaded, 200)
  }

  setScriptLoadedCallback = (): void => {
    if (this.state.scriptLoaded) {
      window.clearInterval(this.interval)
    }
  }

  checkIfScriptLoaded = (): void => {
    if (window.google) {
      this.setState(function serScriptLoaded() {
        return {
          scriptLoaded: true,
        }
      }, this.setScriptLoadedCallback)
    }
  }

  override componentWillUnmount(): void {
    window.clearInterval(this.interval)
  }

  override render(): JSX.Element {
    if (!this.state.scriptLoaded) {
      return <SpanIntro />
    }

    return this.props.children instanceof Function
      ? this.props.children()
      : this.props.children
  }
}

export default ScriptLoaded
