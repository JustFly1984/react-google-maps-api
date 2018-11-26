/* global google */
import { PureComponent, Children } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import invariant from 'invariant'
import canUseDOM from 'can-use-dom'

import {
  construct,
  getDerivedStateFromProps,
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

    invariant(google.maps.places, 'Did you include "libraries=places" in the URL?')

    this.state = {
      context,
      [SEARCH_BOX]: null,
      prevProps: {},
      mountControlIndex: -1,
      containerElement: canUseDOM
        ? document.createElement('div')
        : {}
    }
  }

  static getDerivedStateFromProps (props, state) {
    let obj = null

    if (props.controlPosition !== state.prevProps.controlPosition) {
      SearchBox.handleUnmountAtControlPosition(props, state)

      obj = Object.assing({
        mountControlIndex: SearchBox.handleMountAtControlPosition(props, state)
      }, obj)
    }

    return Object.assing(
      getDerivedStateFromProps(
        props,
        state,
        this.state[SEARCH_BOX],
        eventMap,
        updaterMap
      ), obj
    )
  }

  componentDidMount () {
    this.handleInitializeSearchBox()

    this.setState(
      (state, props) => {
        SearchBox.handleUnmountAtControlPosition(props, state)

        return {
          mountControlIndex: SearchBox.handleMountAtControlPosition(props, state)
        }
      }
    )
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    SearchBox.handleUnmountAtControlPosition(this.props, this.state)
  }

  render () {
    return createPortal(
      Children.only(this.props.children),
      this.state.containerElement
    )
  }

  handleInitializeSearchBox = () => {
    if (!canUseDOM) {
      return
    }

    const searchBox = new google.maps.places.SearchBox(
      this.state.containerElement.querySelector('input'),
      this.props.options
    )

    this.setState((state, props) => ({
      [SEARCH_BOX]: searchBox,
      prevProps: construct(
        SearchBoxPropTypes,
        updaterMap,
        props,
        searchBox
      )
    }))
  }

  static handleMountAtControlPosition (props, state) {
    if (isValidControlPosition(props.controlPosition)) {
      return -1 + state.context[MAP].controls[props.controlPosition].push(
        this.state.containerElement.firstChild
      )
    }
  }

  static handleUnmountAtControlPosition (props, state) {
    if (isValidControlPosition(props.controlPosition)) {
      const child = state.context[MAP].controls[props.controlPosition].removeAt(
        state.mountControlIndex
      )

      if (child !== undefined) {
        state.containerElement.appendChild(child)
      }
    }
  }

  getBounds = () =>
    this.state[SEARCH_BOX].getBounds()

  getPlaces = () =>
    this.state[SEARCH_BOX].getPlaces()
}

export default SearchBox
