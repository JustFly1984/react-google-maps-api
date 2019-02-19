import { Component, ChangeEvent, FormEvent } from "react"
import * as React from "react"
import { setKey, getKey } from "./docs-api-key"
import LoadScript from "../LoadScript"

const libraries = ["drawing", "places", "visualization"]
class DocsApiKeyInput extends Component<any, any> {
  render = () => {
    return (
      <>
        <form onSubmit={this.onFormSubmit}>
          <input
            type="text"
            onChange={this.onInputChange}
            value={this.state.key}
            placeholder="Enter Google Maps API Key"
            style={{ width: "400px", height: "40px", paddingLeft: "8px" }}
          />
          <button type="submit" style={{ height: "40px", marginLeft: "8px" }}>
            Set Key
          </button>
        </form>

        {this.state.loadScript && (
          <LoadScript
            id="script-loader"
            googleMapsApiKey={this.state.key}
            language={"en"}
            region={"EN"}
            version={"weekly"}
            libraries={libraries}
            loadingElement={<div>Loading...</div>}
          />
        )}
      </>
    )
  }

  constructor(props) {
    super(props)

    const key = getKey()

    this.state = key
      ? { key, loadScript: true }
      : { key: "", loadScript: false }
  }

  onInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    this.setState({ key: e.target.value })
  onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setKey(this.state.key)
    this.setState({ loadScript: true })
  }
}

export default DocsApiKeyInput
