import * as React from 'react'
import { setKey, getKey } from './docs-api-key'

import LoadScript from '../LoadScript'

import type { Libraries } from '../utils/make-load-script-url'

const libraries: Libraries = ['drawing', 'places', 'visualization']

const inputStyle = {
  width: '400px',
  height: '40px',
  paddingLeft: '8px',
}

const buttonStyle = {
  height: '40px',
  marginLeft: '8px',
}

const loadingElement: JSX.Element = <div>Loading...</div>

interface DocsApiKeyInputState {
  key: string
  loadScript: boolean
}

class DocsApiKeyInput extends React.Component<{}, DocsApiKeyInputState> {
  constructor(props: {}) {
    super(props)

    const key = getKey()

    this.state = key ? { key, loadScript: true } : { key: '', loadScript: false }
  }

  onInputChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState(function setKey() {
      return {
        key: value,
      }
    })
  }

  onFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    setKey(this.state.key)

    this.setState(function setLoadScript() {
      return {
        loadScript: true,
      }
    })
  }

  render(): React.ReactNode {
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
            loadingElement={loadingElement}
          />
        ) : (
          <></>
        )}
      </>
    )
  }
}

export default DocsApiKeyInput
