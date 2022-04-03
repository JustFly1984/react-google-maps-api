# Access google map instance

```js static
import { useEffect } from 'react'
import { GoogleMap, useGoogleMap } from '@react-google-maps/api'

function PanningComponent() {
  const map = useGoogleMap()

  useEffect(() => {
    map.panTo(...)
  }, [map])

  return null
}
```
