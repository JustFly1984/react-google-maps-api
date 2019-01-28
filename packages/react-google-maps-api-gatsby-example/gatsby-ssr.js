const React = require('react')
const PropTypes = require('prop-types')
const { Provider } = require('react-redux')
const { Map: IMap } = require('immutable')

const {
  createStore,
  compose,
  applyMiddleware
} = require('redux')

const thunk = require('redux-thunk').default
const reducers = require('./src/reducers').default

exports.wrapRootElement = ({ element }) => {
  const configureStore = (initialState = new IMap()) => {
    const store = createStore(
      reducers,
      initialState,
      compose(
        applyMiddleware(thunk)
      )
    )

    return store
  }

  const store = configureStore()

  const ConnectedRootElement = (
    <Provider
      store={store}
    >
      {element}
    </Provider>
  )

  ConnectedRootElement.propTypes = {
    element: PropTypes.node.isRequired
  }

  return ConnectedRootElement
}

exports.onPreRenderHTML = () => {
  // console.log('onPreRenderHTML') // eslint-disable-line no-console
}

exports.onRenderBody = (obj) => {
  // console.log('onRenderBody') // eslint-disable-line no-console
}
