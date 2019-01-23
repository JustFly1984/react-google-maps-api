/* global google */
import { PureComponent, Children } from 'react'
import { createPortal } from 'react-dom'
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

export class SearchBox extends PureComponent {
  static propTypes = SearchBoxPropTypes

  static contextType = MapContext

  constructor (props, context) {
    super(props, context)

    invariant(
      google.maps.places,
      'Did you include "libraries=places" in the URL?'
    )

    this.state = {
      mountControlIndex: -1 + context.controls[props.controlPosition].push(
        props.containerElement.firstChild
      ),
      searchBox: new google.maps.places.SearchBox(
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

    if (this.props.controlPosition !== prevProps.controlPosition) {
      if (typeof this.props.controlPosition === 'number') {
        this.setState(
          (_state, props) => ({
            mountControlIndex: -1 + this.context.controls[props.controlPosition].push(
              props.containerElement.firstChild
            )
          })
        )
      }
    }

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

    if (typeof this.props.controlPosition === 'number') {
      const child = this.context.controls[this.props.controlPosition].removeAt(
        this.state.mountControlIndex
      )

      if (child !== undefined) {
        this.props.containerElement.appendChild(child)
      }
    }
  }

  render () {
    return createPortal(
      Children.only(this.props.children),
      this.props.containerElement
    )
  }

  getBounds () {
    return this.state.searchBox.getBounds()
  }

  getPlaces () {
    return this.state.searchBox.getPlaces()
  }
}

export default SearchBox
