import * as React from 'react'
import { Component } from 'react'

class ScriptLoaded extends Component<any, any> {
  interval = null

  render = () => this.state.scriptLoaded
    ? this.props.children
    : (
      <span>
        <a href='#introduction'>Enter API Key</a> to see examples
      </span>
    )

  constructor (props) {
    super(props)

    this.state = {
      ///@ts-ignore
      scriptLoaded: !!window.google
    }

    this.interval = setInterval(this.checkIfScriptLoaded, 200)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  checkIfScriptLoaded = () => {
    ///@ts-ignore
    if (window.google) {
      this.setState({ scriptLoaded: true })
      clearInterval(this.interval)
    }
  }
}

export default ScriptLoaded
