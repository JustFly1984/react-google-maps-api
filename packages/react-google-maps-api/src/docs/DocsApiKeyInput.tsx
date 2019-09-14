import { Component, ChangeEvent, FormEvent } from 'react'
import * as React from 'react'
import { setKey, getKey } from './docs-api-key'
import LoadScript from '../LoadScript'

const libraries = ['drawing', 'places', 'visualization']

const inputStyle = {
  width: '400px',
  height: '40px',
  paddingLeft: '8px',
}

const buttonStyle = {
  height: '40px',
  marginLeft: '8px',
}

interface DocsApiKeyInputState {
  key: string
  loadScript: boolean
}

class DocsApiKeyInput extends Component<{}, DocsApiKeyInputState> {
  constructor(props: {}) {
    super(props)

    const key = getKey()

    this.state = key ? { key, loadScript: true } : { key: '', loadScript: false }
  }

  onInputChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => {
    function setKey() {
      return {
        key: value,
      }
    }

    this.setState(setKey)
  }

  onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    setKey(this.state.key)

    function setLoadScript() {
      return {
        loadScript: true,
      }
    }

    this.setState(setLoadScript)
  }

  render() {
    return (
      <>
        <form onSubmit={this.onFormSubmit}>
          <input
            type='text'
            onChange={this.onInputChange}
            value={this.state.key}
            placeholder='Enter Google Maps API Key'
            style={inputStyle}
          />

          <button type='submit' style={buttonStyle}>
            Set Key
          </button>
        </form>

        {this.state.loadScript ? (
          <LoadScript
            id='script-loader'
            googleMapsApiKey={this.state.key}
            language='en'
            region='EN'
            version='weekly'
            libraries={libraries}
            loadingElement={<div>Loading...</div>}
          />
        ) : (
          <></>
        )}
      </>
    )
  }
}

export default DocsApiKeyInput
