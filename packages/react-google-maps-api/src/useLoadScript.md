# Requires React 16.8+

Underlying React hook that can be used for a fine-grained approach instead of opinionated [LoadScriptNext](#loadscriptnext).

It's the alternative variant of LoadScript that tries to solve the problem of "google is not defined" error by removing the cleanup routines ([read more](https://github.com/JustFly1984/react-google-maps-api/pull/143)).

```js static
import React from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'

const options = {
  zoomControlOptions: {
    position: google.maps.ControlPosition.RIGHT_CENTER // ,
    // ...otherOptions
  }
}

function MyComponent() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "YOUR_API_KEY" // ,
    // ...otherOptions
  })

  const renderMap = () => {
    // wrapping to a function is useful in case you want to access `window.google`
    // to eg. setup options or create latLng object, it won't be available otherwise
    // feel free to render directly if you don't need that
    const onLoad = React.useCallback(
      function onLoad (mapInstance) {
        // do something with map Instance
      }
    )
    return <GoogleMap
      options={options}
      onLoad={onLoad}
    >
      {
        // ...Your map components
      }
    </GoogleMap>
  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : <Spinner />
}
```
