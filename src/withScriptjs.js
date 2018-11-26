import { createFactory, PureComponent } from 'react'
import PropTypes from 'prop-types'
import canUseDOM from 'can-use-dom'
import invariant from 'invariant'
import { getDisplayName } from 'recompose'

const LOADING_STATE_NONE = `NONE`
const LOADING_STATE_BEGIN = `BEGIN`
const LOADING_STATE_LOADED = `LOADED`

let isInstalled = false

export function withScriptjs (BaseComponent) {
  const factory = createFactory(BaseComponent)

  class Container extends PureComponent {
    static displayName = `withScriptjs(${getDisplayName(BaseComponent)})`

    static propTypes = {
      loadingElement: PropTypes.node.isRequired,
      googleMapURL: PropTypes.string.isRequired,
    }

    constructor (props) {
      super(props)

      this.handleLoaded = this.handleLoaded.bind(this)

      this.state = {
        loadingState: LOADING_STATE_NONE,
      }

      this.isUnmounted = false
    }

    handleLoaded () {
      if (this.isUnmounted) {
        return
      }

      this.setState(() => ({ loadingState: LOADING_STATE_LOADED }))
    }

    componentWillMount () {
      invariant(
        !!this.props.loadingElement && !!this.props.googleMapURL,
        `Required props loadingElement or googleMapURL is missing. You need to provide both of them.`
      )
    }

    componentDidMount () {
      if (this.state.loadingState !== LOADING_STATE_NONE || !canUseDOM) {
        return
      }

      this.setState(() => ({ loadingState: LOADING_STATE_BEGIN }))

      // Don't load scriptjs as a dependency since we do not want this module be used on server side.
      // eslint-disable-next-line global-require
      const scriptjs = require(`scriptjs`)

      if (!isInstalled) {
        scriptjs(this.props.googleMapURL, this.handleLoaded)

        scriptjs.ready(() => {
          isInstalled = true
        })
      }
    }

    componentWillUnmount () {
      this.isUnmounted = true
    }

    render () {
      const {
        loadingElement,
        googleMapURL,
        ...restProps
      } = this.props

      if (this.state.loadingState === LOADING_STATE_LOADED) {
        return factory(restProps)
      } else {
        return loadingElement
      }
    }
  }

  return Container
}

export default withScriptjs
