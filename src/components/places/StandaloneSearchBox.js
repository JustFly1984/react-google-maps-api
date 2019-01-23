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

  constructor (props, context) {
    super(props, context)

    invariant(
      google.maps.places,
      'Did you include "libraries=places" in the URL?'
    )

    this.state = {
      standaloneSearchBox: new google.maps.places.SearchBox(
        props.containerElement.querySelector('input'),
        Object.assign(
          {
            map: context
          },
          props.options
        )
      )
    }

    this.registeredEvents = []
  }

  componentDidMount () {
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: this.state.searchBox
    })
  }

  componentDidUpdate (prevProps) {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.searchBox
    })
  }

  componentWillUnmount () {
    unregisterEvents(this.registeredEvents)
  }

  render () {
    return Children.only(this.props.children)
  }

  getBounds () {
    return this.state.searchBox.getBounds()
  }

  getPlaces () {
    return this.state.searchBox.getPlaces()
  }
}

export default StandaloneSearchBox
