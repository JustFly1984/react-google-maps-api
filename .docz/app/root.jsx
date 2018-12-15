import React from 'react'
import { setConfig, hot } from 'react-hot-loader'
import Theme from 'docz-theme-default'

const Root = () => <Theme hashRouter={undefined} />

// TODO: this is temporary until react-hot-loader fix hooks issues
setConfig({
  pureSFC: true,
})

export default hot(module)(Root)
