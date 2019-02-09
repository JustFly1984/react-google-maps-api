# Install @react-google-maps/api

```bash
npm install --save @react-google-maps/api 
# or
yarn add @react-google-maps/api
```

# Load the google-maps api and add a map

```js static 
import React, { Component } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

class MyComponents extends Component { 
  render() {
     return (
      <LoadScript 
        id="script-loader"
        googleMapsApiKey="YOUR_API_KEY" 
        {...other props}>

        <GoogleMap 
            id='example-map'
            {...other props }>

          ...Your map components
        </GoogleMap>

      </LoadScript>

```
<GoogleMap 
      id='example-map'
      {...OtherGoogleMapProps }>

      ...Your map components
    </GoogleMap>
  </LoadScript>
)
```

} }

```
