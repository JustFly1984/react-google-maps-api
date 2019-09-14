/* globals window */
import '@babel/polyfill'
import 'whatwg-fetch'

import React from 'react'
import uniqid from 'uniqid'
import { Provider } from 'react-redux'
import { Map as IMap } from 'immutable'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { storage } from './src/utils/storage'
import { isBrowser } from './src/utils/isbrowser'

import reducers from './src/reducers'

const composeEnhancers =
  (process.env.NODE_ENV === 'development' &&
    isBrowser &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

const configureStore = (initialState = IMap()) => {
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  )

  return store
}

const store = configureStore()

export const wrapRootElement = ({ element }) => {
  const ConnectedRootElement = <Provider store={store}>{element}</Provider>

  return ConnectedRootElement
}

export const onClientEntry = () => {
  if (isBrowser) {
    if (!window.Intl) {
      require.ensure([], () => {
        require('intl')
      })
    }

    let userId = storage.getItem('userId')

    if (!userId) {
      userId = uniqid('clientId-')
      storage.setItem('userId', userId)
    }
  }
}
