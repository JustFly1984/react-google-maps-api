// @ts-ignore
import * as React from 'react'
import { Component } from 'react'

const inputStyle = {
  width: '500px',
  height: '40px',
  borderRadius: '4px'
}

const buttonStyle = {
  height: '40px'
}

interface WithApiKeyState {
  apiKey: string;
  tempApiKey: string;
}

interface WithApiKeyProps {
  children: (apiKey: string) => any
}

class WithApiKey extends Component<WithApiKeyProps, WithApiKeyState> {
  state: WithApiKeyState = {
    apiKey: '',
    tempApiKey: ''
  }

  onChange = ({ target: { value } }) => {
    this.setState(
      () => ({
        tempApiKey: value
      })
    )
  }

  onClick = () => {
    this.setState(
      ({ tempApiKey }) => ({
        apiKey: tempApiKey
      })
    )
  }

  render = () => (
    <>
      <div>
        <input
          type='text'
          placeholder='Enter a valid API key'
          onChange={this.onChange}
          value={this.state.tempApiKey}
          style={inputStyle}
        />
        <button
          type='button'
          style={buttonStyle}
          onClick={this.onClick}
        >
          Load script
        </button>
      </div>

      {
        this.state.apiKey !== ''
          ? this.props.children(this.state.apiKey)
          : null
      }
    </>
  )
}

export default WithApiKey
