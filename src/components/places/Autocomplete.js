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

  constructor (props, context) {
    super(props, context)

    this.state = {
      autocomplete: new google.maps.places.Autocomplete(
        props.inputField,
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

  componentDidUpdate (prevProps) {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.autocomplete
    })
  }

  componentWillUnmount () {
    unregisterEvents(this.registeredEvents)
  }

  render () {
    return <></>
  }

  getBounds () {
    return this.state.autocomplete.getBounds()
  }

  getFields () {
    return this.state.autocomplete.getFields()
  }

  getPlace () {
    return this.state.autocomplete.getPlace()
  }
}

export default Autocomplete
