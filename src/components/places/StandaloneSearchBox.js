/* global google */
import { PureComponent, Children } from 'react'
import { findDOMNode } from 'react-dom'
import invariant from 'invariant'

import {
  construct,
  registerEvents,
  getDerivedStateFromProps,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { STANDALONE_SEARCH_BOX } from '../../constants'

import { SearchBoxPropTypes } from '../../proptypes'

const eventMap = {
  onPlacesChanged: 'places_changed',
}

const updaterMap = {
  bounds (instance, bounds) {
    instance.setBounds(bounds)
  },
}

class StandaloneSearchBox extends PureComponent {
  static propTypes = SearchBoxPropTypes

  constructor (props) {
    super(props)

    this.state = {
      [STANDALONE_SEARCH_BOX]: null,
      prevProps: {}
    }
  }

  static getDerivedStateFromProps (props, state) {
    return getDerivedStateFromProps(
      props,
      state,
      this.state[STANDALONE_SEARCH_BOX],
      eventMap,
      updaterMap
    )
  }

  componentDidMount () {
    invariant(
      google.maps.places,
      'Did you include "libraries=places" in the URL?'
    )

    // TODO: get rid of findDOMNode
    // eslint-disable-next-line react/no-find-dom-node
    const element = findDOMNode(this)

    const searchBox = new google.maps.places.SearchBox(
      element.querySelector('input') || element,
      this.props.options
    )

    this.setState((state, props) => ({
      [STANDALONE_SEARCH_BOX]: searchBox,
      prevProps: construct(
        SearchBoxPropTypes,
        updaterMap,
        props,
        searchBox
      ),
      registeredList: registerEvents(props, searchBox, eventMap)
    }))
  }

  componentWillUnmount () {
    componentWillUnmount(this)
  }

  render () {
    return Children.only(this.props.children)
  }

  getBounds = () =>
    this.state[STANDALONE_SEARCH_BOX].getBounds()

  getPlaces = () =>
    this.state[STANDALONE_SEARCH_BOX].getPlaces()
}

export default StandaloneSearchBox
