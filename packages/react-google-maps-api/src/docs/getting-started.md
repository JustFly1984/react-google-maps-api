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

The simplest way to get a functional map is:

```js static
import React, { Component } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

class MyComponents extends Component {
  render() {
     return (
      <LoadScript
        googleMapsApiKey="YOUR_API_KEY"
      >
        <GoogleMap
          mapContainerStyle={{ width: '400px', height: '400px' }}
          zoom={10}
          center={{ lat: -3.745, lng: -38.523 }}
        >
          { /* Child components, such as markers, info windows, etc. */ }
        </GoogleMap>
      </LoadScript>
     )
  }
}
```
