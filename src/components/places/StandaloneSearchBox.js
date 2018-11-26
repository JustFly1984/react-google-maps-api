/* global google */
import { PureComponent, Children } from 'react'
import { findDOMNode } from 'react-dom'
import invariant from 'invariant'

import {
  construct,
  componentDidMount,
  componentDidUpdate,
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

  state = {
    [STANDALONE_SEARCH_BOX]: null,
  }

  constructor (props) {
    super(props)

    this.getBounds = this.getBounds.bind(this)
    this.getPlaces = this.getPlaces.bind(this)
  }

  componentDidMount () {
    invariant(
      google.maps.places,
      `Did you include "libraries=places" in the URL?`
    )

    // TODO: get rid of findDOMNode
    // eslint-disable-next-line react/no-find-dom-node
    const element = findDOMNode(this)

    const searchBox = new google.maps.places.SearchBox(
      element.querySelector('input') || element,
      this.props.options
    )

    construct(
      SearchBoxPropTypes,
      updaterMap,
      this.props,
      searchBox
    )

    componentDidMount(this, searchBox, eventMap)

    this.setState(() => ({ [STANDALONE_SEARCH_BOX]: searchBox }))
  }

  componentDidUpdate (prevProps) {
    componentDidUpdate(this, this.state[STANDALONE_SEARCH_BOX], eventMap, updaterMap, prevProps)
  }

  componentWillUnmount () {
    componentWillUnmount(this)
  }

  render () {
    return Children.only(this.props.children)
  }

  getBounds () {
    return this.state[STANDALONE_SEARCH_BOX].getBounds()
  }

  getPlaces () {
    return this.state[STANDALONE_SEARCH_BOX].getPlaces()
  }
}

export default StandaloneSearchBox
