/* global google */
// TODO:
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
  bounds (
    instance,
    bounds
  ) {
    instance.setBounds(bounds)
  },
}

export class SearchBox extends PureComponent {
  static propTypes = SearchBoxPropTypes

  static contextType = MapContext

  registeredEvents = []

  state = {
    searchBox: null,
    mountControlIndex: 0
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
      (_, props) => ({
        searchBox,
        mountControlIndex: -1 + this.context.controls[props.controlPosition].push(
          props.containerElement.firstChild
        )
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

    if (this.props.controlPosition !== prevProps.controlPosition) {
      if (typeof this.props.controlPosition === 'number') {
        this.setState(
          (_, props) => ({
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

  componentWillUnmount = () => {
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

  render = () =>
    createPortal(
      Children.only(this.props.children),
      this.state.containerElement
    )

  getBounds = () =>
    this.state.searchBox.getBounds()

  getPlaces = () =>
    this.state.searchBox.getPlaces()
}

export default SearchBox
