import * as React from 'react'

import Card from '../components/card'

function NoMaps() {
  return (
    <Card>
      <p className='text-secondary my-0'>
        Please enter your Google API key to load map examples.
      </p>
    </Card>
  )
}

export default React.memo(NoMaps)
