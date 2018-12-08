/* global google */
import { PureComponent, Children } from 'react'
import invariant from 'invariant'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/helper'

import MapContext from '../../map-context'

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

  static contextType = MapContext

  registeredEvents = []

  state = {
    standaloneSearchBox: null
  }

  constructor (props, context) {
    super(props, context)

    invariant(
      google.maps.places,
      'Did you include "libraries=places" in the URL?'
    )
  }

  componentDidMount = () => {
    const searchBox = new google.maps.places.SearchBox(
      this.props.containerElement.querySelector('input'),
      Object.assign({
        map: this.context
      },
      this.props.options
      )
    )

    this.setState(
      () => ({
        searchBox
      }),
      () => {
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap,
          eventMap,
          prevProps: {},
          nextProps: this.props,
          instance: this.state.searchBox
        })
      }
    )
  }

  componentDidUpdate = prevProps => {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.searchBox
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)
  }

  render = () => Children.only(this.props.children)

  getBounds = () =>
    this.state.searchBox.getBounds()

  getPlaces = () =>
    this.state.searchBox.getPlaces()
}

export default StandaloneSearchBox
