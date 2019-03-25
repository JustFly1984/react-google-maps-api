import * as React from "react"

interface ScriptLoadedState {
  scriptLoaded: boolean
}

interface ScriptLoadedProps {
  children: React.ReactChild | React.ReactChildren
}

class ScriptLoaded extends React.Component<
  ScriptLoadedProps,
  ScriptLoadedState
> {
  interval: number | undefined

  render = () =>
    this.state.scriptLoaded ? (
      this.props.children
    ) : (
      <span>
        <a href="#introduction">Enter API Key</a> to see examples
      </span>
    )

  constructor(props: ScriptLoadedProps) {
    super(props)

    this.state = {
      ///@ts-ignore
      scriptLoaded: !!window.google
    }

    this.interval = setInterval(this.checkIfScriptLoaded, 200)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }

  checkIfScriptLoaded = () => {
    ///@ts-ignore
    if (window.google) {
      this.setState(
        () => ({
          scriptLoaded: true
        }),
        () => {
          if (this.state.scriptLoaded) {
            window.clearInterval(this.interval)
          }
        }
      )
    }
  }
}

export default ScriptLoaded
