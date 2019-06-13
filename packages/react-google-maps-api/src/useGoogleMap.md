# Access google map instance

```js static
import React from 'react'
import { GoogleMap, useGoogleMap } from '@react-google-maps/api'

function PanningComponent() {
  const map = useGoogleMap()

  React.useEffect(() => {
    map.panTo(...)
  }, [map])

  return null
}
```
