# Requires React 16.8+

React hook based on new official way to load googlemaps script.

It's the alternative variant of LoadScript and useLoadScript hook that tries to solve the problem of "google is not defined" error by removing the cleanup routines ([read more](https://github.com/JustFly1984/react-google-maps-api/pull/143)).

```js static
import { useCallback, memo, type JSX, type ComponentType } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

const options = {
  zoomControlOptions: {
    position: google.maps.ControlPosition.RIGHT_CENTER
  }
}

function MyComponentF(): JSX.Element {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "YOUR_API_KEY"
  })

  const onLoad = useCallback(
      (mapInstance) => {
        // do something with map Instance
      }, []
  )

  const renderMap = useCallback(() => {
    return <GoogleMap
      options={options}
      onLoad={onLoad}
    >
      {
        // ...Your map components
      }
    </GoogleMap>
  }, [onLoad])

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : <Spinner />
}

export const MyComponent: ComponentType = memo(MyComponentF)
```
