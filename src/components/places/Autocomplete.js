/* global google */
import { PureComponent } from 'react'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/helper'

import MapContext from '../../map-context'

import { AutocompletePropTypes } from '../../proptypes'

const eventMap = {
  onPlaceChanged: 'place_changed',
}

const updaterMap = {
  bounds (instance, bounds) {
    instance.setBounds(bounds)
  },
  restrictions (instance, restrictions) {
    instance.setComponentRestrictions(restrictions)
  },
  fields (instance, fields) {
    instance.setFields(fields)
  },
  options (instance, options) {
    instance.setOptions(options)
  },
  types (instance, types) {
    instance.setTypes(types)
  }
}

export class Autocomplete extends PureComponent {
  static propTypes = AutocompletePropTypes

  static contextType = MapContext

  registeredEvents = []

  state = {
    autocomplete: null
  }

  componentDidMount = () => {
    const autocomplete = new google.maps.places.Autocomplete(
      this.props.inputField,
      Object.assign({
        map: this.context
      },
      this.props.options
      )
    )

    this.setState(
      () => ({
        autocomplete
      })
    )
  }

  componentDidUpdate = prevProps => {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.autocomplete
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)
  }

  render = () => null

  getBounds = () =>
    this.state.autocomplete.getBounds()

  getFields = () =>
    this.state.autocomplete.getFields()

  getPlace = () =>
    this.state.autocomplete.getPlace()
}

export default Autocomplete
