// eslint-disable-next-line node/no-extraneous-import
import { memo } from 'react'

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

export default memo(NoMaps)
