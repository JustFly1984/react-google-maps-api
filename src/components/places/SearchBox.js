/* global google */
import { PureComponent, version, Children } from 'react'
import {
  // eslint-disable-next-line camelcase
  unstable_renderSubtreeIntoContainer,
  unmountComponentAtNode,
  createPortal
} from 'react-dom'
import PropTypes from 'prop-types'
import invariant from 'invariant'
import canUseDOM from 'can-use-dom'

import {
  construct,
  componentDidMount,
  componentDidUpdate,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { MAP, SEARCH_BOX } from '../../constants'
import { SearchBoxPropTypes } from '../../proptypes'

const isValidControlPosition = value => typeof value === 'number'

const eventMap = {
  onPlacesChanged: 'places_changed',
}

const updaterMap = {
  bounds (instance, bounds) {
    instance.setBounds(bounds)
  },
}

export class SearchBox extends PureComponent {
  static propTypes = SearchBoxPropTypes

  static contextTypes = {
    [MAP]: PropTypes.object,
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      [SEARCH_BOX]: null,
    }

    this.handleInitializeSearchBox = this.handleInitializeSearchBox.bind(this)
    this.handleRenderChildToContainerElement = this.handleRenderChildToContainerElement.bind(this)
    this.handleMountAtControlPosition = this.handleMountAtControlPosition.bind(this)
    this.handleUnmountAtControlPosition = this.handleUnmountAtControlPosition.bind(this)
    this.getBounds = this.getBounds.bind(this)
    this.getPlaces = this.getPlaces.bind(this)
  }

  componentWillMount () {
    if (!canUseDOM || this.containerElement) {
      return
    }

    invariant(google.maps.places, `Did you include "libraries=places" in the URL?`)

    this.containerElement = document.createElement(`div`)

    this.handleRenderChildToContainerElement()

    if (version.match(/^16/)) {
      return
    }

    this.handleInitializeSearchBox()
  }

  componentDidMount () {
    let searchBox = this.state[SEARCH_BOX]

    if (version.match(/^16/)) {
      searchBox = this.handleInitializeSearchBox()
    }

    componentDidMount(this, searchBox, eventMap)

    this.handleMountAtControlPosition()
  }

  componentWillUpdate (nextProp) {
    if (this.props.controlPosition !== nextProp.controlPosition) {
      this.handleUnmountAtControlPosition()
    }
  }

  componentDidUpdate (prevProps) {
    componentDidUpdate(this, this.state[SEARCH_BOX], eventMap, updaterMap, prevProps)

    if (this.props.children !== prevProps.children) {
      this.handleRenderChildToContainerElement()
    }

    if (this.props.controlPosition !== prevProps.controlPosition) {
      this.handleMountAtControlPosition()
    }
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    this.handleUnmountAtControlPosition()

    if (version.match(/^16/)) {
      return
    }

    if (this.containerElement) {
      unmountComponentAtNode(this.containerElement)

      this.containerElement = null
    }
  }

  render () {
    if (version.match(/^16/)) {
      return createPortal(
        Children.only(this.props.children),
        this.containerElement
      )
    }

    return false
  }

  handleInitializeSearchBox () {
    const searchBox = new google.maps.places.SearchBox(
      this.containerElement.querySelector('input'),
      this.props.options
    )

    construct(
      SearchBoxPropTypes,
      updaterMap,
      this.pprops,
      searchBox
    )

    this.setState(() => ({ [SEARCH_BOX]: searchBox }))

    return searchBox
  }

  handleRenderChildToContainerElement () {
    if (version.match(/^16/)) {
      return
    }

    unstable_renderSubtreeIntoContainer(
      this,
      Children.only(this.props.children),
      this.containerElement
    )
  }

  handleMountAtControlPosition () {
    if (isValidControlPosition(this.props.controlPosition)) {
      this.mountControlIndex = -1 + this.context[MAP].controls[this.props.controlPosition].push(
        this.containerElement.firstChild
      )
    }
  }

  handleUnmountAtControlPosition () {
    if (isValidControlPosition(this.props.controlPosition)) {
      const child = this.context[MAP].controls[this.props.controlPosition].removeAt(
        this.mountControlIndex
      )

      if (child !== undefined) {
        this.containerElement.appendChild(child)
      }
    }
  }

  getBounds () {
    return this.state[SEARCH_BOX].getBounds()
  }

  getPlaces () {
    return this.state[SEARCH_BOX].getPlaces()
  }
}

export default SearchBox
