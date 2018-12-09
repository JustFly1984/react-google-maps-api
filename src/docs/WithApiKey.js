import React from 'react'

export default class WithApiKey extends React.Component {
  state = {
    apiKey: null,
    tempApiKey: ''
  }

  render = () => {
    return (
      <>
        <div>
          <input
            type='text'
            placeholder='Enter a valid API key'
            onChange={e => this.setState({ tempApiKey: e.target.value })}
            value={this.state.tempApiKey}
            style={{ width: '500px', height: '40px', borderRadius: '4px' }}
          />
          <input
            type='button'
            value='Load script'
            style={{ height: '40px' }}
            onClick={() => this.setState({ apiKey: this.state.tempApiKey })}
          />
        </div>

        {this.state.apiKey ? this.props.children(this.state.apiKey) : null}
      </>
    )
  }
}
