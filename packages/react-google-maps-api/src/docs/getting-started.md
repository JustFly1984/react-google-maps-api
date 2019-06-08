## Install @react-google-maps/api

```bash
npm install --save @react-google-maps/api
# or
yarn add @react-google-maps/api
```

## LoadScript and GoogleMap

The two basic components required to use this library are:

* LoadScript - Loads the Google Maps API script
* GoogleMap - The map component inside which all other components render

```js static
import React, { Component } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

class MyComponents extends Component {
  render() {
     return (
      <LoadScript
        id="script-loader"
        googleMapsApiKey="YOUR_API_KEY"
        {...other props}
      >
        <GoogleMap
          id='example-map'
          {...other props }
        >
          ...Your map components
        </GoogleMap>
      </LoadScript>
     )
  }
}
```
