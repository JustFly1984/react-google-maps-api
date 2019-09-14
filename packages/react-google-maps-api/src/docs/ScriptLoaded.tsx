import * as React from 'react'

interface ScriptLoadedState {
  scriptLoaded: boolean
}

interface ScriptLoadedProps {
  children: React.ReactChild | React.ReactChildren | Function
}

function SpanIntro(): JSX.Element {
  return (
    <span>
      <a href='#section-introduction'>Enter API Key</a> to see examples
    </span>
  )
}

class ScriptLoaded extends React.Component<ScriptLoadedProps, ScriptLoadedState> {
  interval: number | undefined

  constructor(props: ScriptLoadedProps) {
    super(props)

    this.state = {
      ///@ts-ignore
      scriptLoaded: !!window.google,
    }

    this.interval = window.setInterval(this.checkIfScriptLoaded, 200)
  }

  setScriptLoadedCallback = () => {
    if (this.state.scriptLoaded) {
      window.clearInterval(this.interval)
    }
  }

  checkIfScriptLoaded = () => {
    function serScriptLoaded() {
      return {
        scriptLoaded: true,
      }
    }

    ///@ts-ignore
    if (window.google) {
      this.setState(serScriptLoaded, this.setScriptLoadedCallback)
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }

  render() {
    if (!this.state.scriptLoaded) {
      return <SpanIntro />
    }

    return this.props.children instanceof Function ? this.props.children() : this.props.children
  }
}

export default ScriptLoaded
