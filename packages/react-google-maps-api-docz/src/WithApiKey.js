import React, { Component } from 'react'
import PropTypes from 'prop-types'

const inputStyle = {
  width: '500px',
  height: '40px',
  borderRadius: '4px'
}

const buttonStyle = {
  height: '40px'
}

const propTypes = {
  children: PropTypes.func.isRequired
}
class WithApiKey extends Component {
  static propTypes = propTypes
  state = {
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
          : (<></>)
      }
    </>
  )
}

export default WithApiKey
