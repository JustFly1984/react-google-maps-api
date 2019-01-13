import React from 'react'
import PropTypes from 'prop-types'

const inputStyle = {
  width: '500px',
  height: '40px',
  borderRadius: '4px'
}

const propTypes = {
  children: PropTypes.func.isRequired
}
export default class WithApiKey extends React.Component {
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
        <input
          type='button'
          value='Load script'
          style={{ height: '40px' }}
          onClick={this.onClick}
        />
      </div>

      {
        this.state.apiKey !== ''
          ? this.props.children(this.state.apiKey)
          : null
      }
    </>
  )
}
