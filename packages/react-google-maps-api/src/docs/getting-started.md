# Install @react-google-maps/api

```bash
npm install --save @react-google-maps/api
# or
yarn add @react-google-maps/api
```

## LoadScript and GoogleMap

The two basic components required to load a simple map are:

* LoadScript - Loads the Google Maps API script
* GoogleMap - The map component inside which all other components render

The simplest way to get a functional map is:

> ⚠️ Make sure you cache the props passed to `GoogleMap` to avoid re-renders that may harm the performance.

```jsx
import React, { Component } from 'react';
const { GoogleMap, LoadScript } = require('../');

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

class MyComponents extends Component {
  render() {
    return (
      <LoadScript
        googleMapsApiKey="YOUR_API_KEY"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
      </LoadScript>
    )
  }
}
```

Or you can also adopt a functional component style:

```jsx
import React from 'react'

function MyComponent(props) {
  const { containerStyle, center } = props;

  return (
    <LoadScript
      googleMapsApiKey="YOUR_API_KEY"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MyComponent)
```
